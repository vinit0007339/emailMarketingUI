import React, { useRef, useState, useEffect } from "react";
import { Box, Stack, Button, Typography, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EmailEditor from "react-email-editor";
import { createTemplate, updateTemplate } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";

const TemplateEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const campaignData = location.state?.campaignData || {};
  const recipientData = location.state?.recipientData || {};
  const editingTemplate = location.state?.editingTemplate || null;
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize edit mode when component mounts or editingTemplate changes
  useEffect(() => {
    if (editingTemplate) {
      setIsEditMode(true);
      console.log("Edit mode enabled with template:", editingTemplate);
      console.log("Template schema:", editingTemplate.template_schema);
    } else {
      setIsEditMode(false);
      console.log("Create mode enabled");
    }
  }, [editingTemplate]);

  // Load template design when in edit mode
  useEffect(() => {
    if (isEditMode && editingTemplate && editingTemplate.template_schema) {
      // Check if template_schema is valid
      if (typeof editingTemplate.template_schema === 'object' && editingTemplate.template_schema !== null) {
        // Wait for editor to be ready, then load the design
        const loadDesignWhenReady = () => {
          const editor = editorRef.current?.editor;
          if (editor && typeof editor.loadDesign === "function") {
            console.log("Loading template design:", editingTemplate.template_schema);
            console.log("Template schema structure:", JSON.stringify(editingTemplate.template_schema, null, 2));
            try {
              const normalizedSchema = normalizeTemplateSchema(editingTemplate.template_schema);
              editor.loadDesign(normalizedSchema);
              console.log("Template design loaded successfully");
            } catch (error) {
              console.error("Error loading template design:", error);
            }
          } else {
            // If editor not ready, try again after a short delay
            setTimeout(loadDesignWhenReady, 100);
          }
        };
        
        loadDesignWhenReady();
      } else {
        console.log("Template schema is empty or invalid:", editingTemplate.template_schema);
      }
    }
  }, [isEditMode, editingTemplate]);

  // Handle editor ready event
  const handleEditorReady = () => {
    console.log("Email editor is ready");
    
    // If we're in edit mode and have a template to load, load it now
    if (isEditMode && editingTemplate && editingTemplate.template_schema) {
      if (typeof editingTemplate.template_schema === 'object' && editingTemplate.template_schema !== null) {
        const editor = editorRef.current?.editor;
        if (editor && typeof editor.loadDesign === "function") {
          console.log("Loading template design on editor ready:", editingTemplate.template_schema);
          try {
            const normalizedSchema = normalizeTemplateSchema(editingTemplate.template_schema);
            editor.loadDesign(normalizedSchema);
            console.log("Template design loaded successfully on editor ready");
          } catch (error) {
            console.error("Error loading template design on editor ready:", error);
          }
        }
      } else {
        console.log("Template schema is empty or invalid on editor ready:", editingTemplate.template_schema);
      }
    }
  };

  const handleBack = () => {
    navigate("/message", { state: { campaignData, recipientData } });
  };

  // Helper function to normalize template schema for loading
  const normalizeTemplateSchema = (schema) => {
    if (!schema || typeof schema !== 'object') {
      return schema;
    }

    // Deep clone the schema to avoid mutations
    const normalizedSchema = JSON.parse(JSON.stringify(schema));
    
    // Ensure the schema has the expected structure
    if (!normalizedSchema.body) {
      normalizedSchema.body = { rows: [] };
    }
    
    if (!normalizedSchema.body.rows) {
      normalizedSchema.body.rows = [];
    }

    // Ensure counters exist
    if (!normalizedSchema.counters) {
      normalizedSchema.counters = { u_column: 1, u_row: 1 };
    }

    console.log("Normalized template schema:", JSON.stringify(normalizedSchema, null, 2));
    return normalizedSchema;
  };

  const handleSaveTemplate = async () => {
    const editor = editorRef.current?.editor;
    if (editor && typeof editor.saveDesign === "function") {
      setIsSaving(true);
      setError("");
      
      editor.saveDesign(async (design) => {
        try {
          // Export HTML for compiled_html
          editor.exportHtml(({ html }) => {
            let templateData;
            
            if (isEditMode && editingTemplate) {
              // For edit mode, use existing template data with updated design
              templateData = {
                name: editingTemplate.name,
                description: editingTemplate.description,
                subject: editingTemplate.subject,
                template_schema: design, // Updated JSON format design
                force_recompile: false
              };
            } else {
              // For create mode, generate default data
              templateData = {
                name: `Template ${Date.now()}`,
                description: `Template created on ${new Date().toLocaleDateString()}`,
                subject: "New Template",
                template_schema: design, // JSON format design
                force_recompile: false
              };
            }

            console.log(`${isEditMode ? 'Updating' : 'Saving'} template with API structure:`, templateData);
            console.log("Template schema being saved:", JSON.stringify(design, null, 2));
            console.log("Compiled HTML:", html);
            
            const apiCall = isEditMode 
              ? updateTemplate(editingTemplate._id, templateData)
              : createTemplate(templateData);
            
            apiCall.then(response => {
              if (response && response.data && response.data.status === "success") {
                showSuccessSnackbar(`Template ${isEditMode ? 'updated' : 'saved'} successfully!`);
                navigate("/message", { state: { campaignData, recipientData } });
              } else {
                showErrorSnackbar(`Failed to ${isEditMode ? 'update' : 'save'} template. Please try again.`);
              }
            }).catch(error => {
              console.error(`Error ${isEditMode ? 'updating' : 'saving'} template:`, error);
              showErrorSnackbar(`Failed to ${isEditMode ? 'update' : 'save'} template. Please try again.`);
            }).finally(() => {
              setIsSaving(false);
            });
          });
        } catch (error) {
          console.error(`Error ${isEditMode ? 'updating' : 'saving'} template:`, error);
          showErrorSnackbar(`Failed to ${isEditMode ? 'update' : 'save'} template. Please try again.`);
          setIsSaving(false);
        }
      });
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {isEditMode ? "Edit Template" : "Create Template"}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleBack} disabled={isSaving}>
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveTemplate}
            disabled={isSaving}
          >
            {isSaving ? (isEditMode ? "Updating..." : "Saving...") : (isEditMode ? "Update Template" : "Save Template")}
          </Button>
        </Stack>
      </Stack>


      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ height: "calc(100vh - 160px)", bgcolor: "#fff", borderRadius: 2, overflow: "hidden" }}>
        <EmailEditor 
          ref={editorRef} 
          minHeight="100%" 
          onReady={handleEditorReady}
        />
      </Box>
    </Box>
  );
};

export default TemplateEditor;


