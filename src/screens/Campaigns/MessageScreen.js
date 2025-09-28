import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Help as HelpIcon,
} from "@mui/icons-material";
import TemplatesSection from "./TemplatesSection";
import EmailMessageSection from "./EmailMessageSection";
import TemplateBuilder from "./TemplateBuilder";

const MessageScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaignData = location.state?.campaignData || {};
  const recipientData = location.state?.recipientData || {};

  const handleBack = () => {
    navigate("/recipient", { 
      state: { 
        campaignData,
        recipientData 
      } 
    });
  };

  const handleNext = () => {
    // In a real app, you might want to save this data and navigate to the next step
    console.log("Message data:", { 
      ...campaignData, 
      ...recipientData,
      messageData: {
        // Add message-specific data here
      }
    });
    // For now, just navigate back to campaigns
    navigate("/campaigns");
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ minWidth: "auto", px: 2 }}
            >
              ← Back to Recipients
            </Button>
            {campaignData.name && (
              <Typography variant="body2" color="text.secondary">
                Campaign: {campaignData.name}
              </Typography>
            )}
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Message
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Choose a template and configure your email message
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: "flex", gap: 3, minHeight: "600px" }}>
          {/* Left Section - Templates */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
              minHeight: "600px",
            }}
          >
            {/* <TemplatesSection /> */}
            <TemplateBuilder/>
          </Paper>

          {/* Right Section - Email Message */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
              minHeight: "600px",
            }}
          >
            <EmailMessageSection />
          </Paper>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>

        {/* Help Button */}
        <IconButton
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "grey.800",
            },
          }}
        >
          <HelpIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageScreen;
