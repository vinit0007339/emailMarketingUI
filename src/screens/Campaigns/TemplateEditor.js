import React, { useRef } from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EmailEditor from "react-email-editor";

const TemplateEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);

  const campaignData = location.state?.campaignData || {};
  const recipientData = location.state?.recipientData || {};

  const handleBack = () => {
    navigate("/message", { state: { campaignData, recipientData } });
  };

  const handleExportHtml = () => {
    const editor = editorRef.current?.editor;
    if (editor && typeof editor.exportHtml === "function") {
      editor.exportHtml((data) => {
        const { design, html } = data;
        // TODO: integrate API to save template
        // For now just log it and go back
        console.log("Template HTML:", html);
        console.log("Template Design JSON:", design);
      });
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Create template</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleBack}>Back</Button>
          <Button variant="contained" onClick={handleExportHtml}>Save</Button>
        </Stack>
      </Stack>

      <Box sx={{ height: "calc(100vh - 80px)", bgcolor: "#fff", borderRadius: 2, overflow: "hidden" }}>
        <EmailEditor ref={editorRef} minHeight="100%" onReady={() => console.log("Editor ready")}/>
      </Box>
    </Box>
  );
};

export default TemplateEditor;


