import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import TemplatesSection from "./TemplatesSection";
import { getAllTemplates } from "../../Utility/API";

export default function TemplateBuilder() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllTemplates();
      if (response && response.data && response.data.data) {
        console.log("Templates loaded from API:", response.data);
        setTemplates(response.data.data);
      } else {
        // If API fails or returns no data, use default templates
        console.log("Using default templates as fallback");
        setTemplates([]); // This will trigger TemplatesSection to use DEFAULT_TEMPLATES
      }
    } catch (error) {
      console.error("Error loading templates:", error);
      console.log("Using default templates as fallback due to API error");
      setTemplates([]); // This will trigger TemplatesSection to use DEFAULT_TEMPLATES
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load templates on component mount
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Template selection logic can be added here if needed
    console.log("Template selected:", template);
    console.log("Template schema:", template.template_schema);
    console.log("Compiled HTML:", template.compiled_html);
  };

  const handleTemplateUpdated = (updatedTemplate) => {
    // Update the template in the local state
    setTemplates(prevTemplates => 
      prevTemplates.map(template => 
        template._id === updatedTemplate._id ? updatedTemplate : template
      )
    );
    console.log("Template updated:", updatedTemplate);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Content - Only show templates list */}
      <Box sx={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Templates Panel - Full width */}
        <Box sx={{ flex: 1, p: 2, minHeight: 0, overflow: "hidden" }}>
          <TemplatesSection 
            templates={templates}
            onTemplateSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
            isLoading={isLoading}
            onTemplateUpdated={handleTemplateUpdated}
          />
        </Box>
      </Box>
    </Box>
  );
}
