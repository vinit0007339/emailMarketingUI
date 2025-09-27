import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Switch,
  FormControlLabel,
  Link,
  Chip,
  Autocomplete,
  InputAdornment,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Checkbox,
  Divider,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  Star as StarIcon,
  Help as HelpIcon,
  Close as CloseIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

const mockLists = [
  { id: 1, name: "Email List", count: 1, type: "email", starred: true },
  { id: 2, name: "Preview List", count: 1, type: "preview", starred: true },
  { id: 3, name: "SMS List", count: 0, type: "sms", starred: true },
  { id: 4, name: "Testing List", count: 0, type: "testing", starred: false },
];

const mockSegments = [
  { id: 5, name: "High Value Customers", count: 150, type: "segment" },
  { id: 6, name: "New Subscribers", count: 75, type: "segment" },
  { id: 7, name: "Inactive Users", count: 200, type: "segment" },
];

const RecipientScreen = ({onBack}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaignData = location.state?.campaignData || {};
  
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [excludeAudience, setExcludeAudience] = useState(null);
  const [smartSending, setSmartSending] = useState(true);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [showExcludeDropdown, setShowExcludeDropdown] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [showNotification, setShowNotification] = useState(true);

  const allAudienceOptions = [...mockLists, ...mockSegments];

  const filteredOptions = allAudienceOptions.filter((option) =>
    option.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const estimatedRecipients = selectedAudience ? selectedAudience.count : 0;

  const handleAudienceSelect = (option) => {
    setSelectedAudience(option);
    setShowAudienceDropdown(false);
    setFilterText("");
  };

  const handleExcludeSelect = (option) => {
    setExcludeAudience(option);
    setShowExcludeDropdown(false);
  };

  const handleBack = () => {
    navigate("/campaigns");
  };

  const handleNext = () => {
    const recipientData = {
      selectedAudience,
      excludeAudience,
      smartSending,
      trackingEnabled,
    };
    // Navigate to message screen with campaign and recipient data
    console.log("Recipient data:", { ...campaignData, ...recipientData });
    navigate("/message", { 
      state: { 
        campaignData,
        recipientData 
      } 
    });
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ minWidth: "auto", px: 2 }}
            >
              ← Back to Campaigns
            </Button>
            {campaignData.name && (
              <Typography variant="body2" color="text.secondary">
                Campaign: {campaignData.name}
              </Typography>
            )}
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Audience
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your campaign audience and tracking settings
          </Typography>
        </Box>

        <Stack spacing={3}>
          {/* Audience Selection Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Audience
            </Typography>

            <Stack spacing={3}>
              {/* Send to Field */}
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Send to
                </Typography>
                <Box sx={{ position: "relative" }}>
                  <TextField
                    fullWidth
                    placeholder="Select a list or segment"
                    value={selectedAudience?.name || ""}
                    onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          {showAudienceDropdown ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: showAudienceDropdown ? "#1976d2" : "#e0e0e0",
                        },
                      },
                    }}
                  />

                  {/* Dropdown */}
                  {showAudienceDropdown && (
                    <Paper
                      elevation={3}
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        mt: 1,
                        maxHeight: 300,
                        overflow: "auto",
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Filter"
                          value={filterText}
                          onChange={(e) => setFilterText(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ mb: 2 }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1, fontWeight: 500 }}
                        >
                          List
                        </Typography>
                        <List dense>
                          {filteredOptions
                            .filter((option) => option.type !== "segment")
                            .map((option) => (
                              <ListItem key={option.id} disablePadding>
                                <ListItemButton
                                  onClick={() => handleAudienceSelect(option)}
                                  sx={{ py: 0.5 }}
                                >
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Checkbox
                                      checked={selectedAudience?.id === option.id}
                                      size="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography variant="body2">
                                          {option.name} ({option.count})
                                        </Typography>
                                        {option.starred && (
                                          <StarIcon sx={{ fontSize: 16, color: "#ffc107" }} />
                                        )}
                                      </Box>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ my: 1 }} />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1, fontWeight: 500 }}
                        >
                          Segment
                        </Typography>
                        <List dense>
                          {filteredOptions
                            .filter((option) => option.type === "segment")
                            .map((option) => (
                              <ListItem key={option.id} disablePadding>
                                <ListItemButton
                                  onClick={() => handleAudienceSelect(option)}
                                  sx={{ py: 0.5 }}
                                >
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Checkbox
                                      checked={selectedAudience?.id === option.id}
                                      size="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body2">
                                        {option.name} ({option.count})
                                      </Typography>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                        </List>
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Box>

              {/* Don't send to Field */}
              <Box>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setShowExcludeDropdown(!showExcludeDropdown)}
                  sx={{ textDecoration: "none" }}
                >
                  + Don't send to
                </Link>
              </Box>

              {/* Smart Sending Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={smartSending}
                    onChange={(e) => setSmartSending(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Turn on Smart Sending
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This campaign will not be sent to profiles who received a message from you in
                      the past{" "}
                      <Typography component="span" sx={{ fontWeight: 600 }}>
                        16 hours
                      </Typography>
                      . Smart Sending timeframes can be updated in{" "}
                      <Link href="#" sx={{ textDecoration: "none" }}>
                        account settings
                      </Link>
                      .
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
              />
            </Stack>
          </Paper>

          {/* Tracking Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Tracking
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={trackingEnabled}
                  onChange={(e) => setTrackingEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Include tracking parameters
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Links in this campaign will include additional tracking information, called UTM
                    parameters. This allows source tracking within third-party reporting tools such
                    as Google Analytics.{" "}
                    <Link href="#" sx={{ textDecoration: "none" }}>
                      Learn more about UTM Tracking
                    </Link>
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start" }}
            />
          </Paper>

          {/* Estimated Recipients */}
          <Box
            sx={{
              position: "fixed",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              p: 2,
              borderRadius: 2,
              boxShadow: 2,
              minWidth: 200,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {estimatedRecipients}
              </Typography>
              <HelpIcon sx={{ color: "text.secondary", fontSize: 16 }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Estimated recipients
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!selectedAudience}
            >
              Next
            </Button>
          </Box>
        </Stack>

        {/* Notification Banner */}
        {showNotification && (
          <Alert
            severity="info"
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              "& .MuiAlert-message": {
                display: "flex",
                alignItems: "center",
                gap: 1,
              },
            }}
            action={
              <IconButton
                size="small"
                onClick={() => setShowNotification(false)}
                sx={{ color: "inherit" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            You can now configure tags and campaign name through selecting the gear icon at the top
            of the page.
          </Alert>
        )}

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

export default RecipientScreen;
