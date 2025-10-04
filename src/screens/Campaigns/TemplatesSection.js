import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Search as SearchIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Help as HelpIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

// Default template test data with new API structure
const DEFAULT_TEMPLATES = [
  {
    _id: "template-1",
    created_by: "60f7c2b3c2a5f3e9a4d2a1c0",
    workspace_id: "60f7c2b3c2a5f3e9a4d2a1c0",
    name: "Welcome Email",
    description: "A warm welcome email for new users",
    subject: "Welcome to our platform!",
    template_schema: {
      body: {
        rows: [
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h1>Welcome to our platform!</h1><p>Thank you for joining us. We're excited to have you on board.</p>"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      counters: { u_column: 1, u_row: 1 }
    },
    compiled_html: "<h1>Welcome to our platform!</h1><p>Thank you for joining us. We're excited to have you on board.</p>",
    variables: ["name", "email"],
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z"
  },
  {
    _id: "template-2",
    created_by: "60f7c2b3c2a5f3e9a4d2a1c0",
    workspace_id: "60f7c2b3c2a5f3e9a4d2a1c0",
    name: "Newsletter Template",
    description: "Monthly newsletter template with features section",
    subject: "Monthly Newsletter",
    template_schema: {
      body: {
        rows: [
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h2>Monthly Newsletter</h2><p>Stay updated with our latest news and updates.</p>"
                    }
                  }
                ]
              }
            ]
          },
          {
            cells: [2],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h3>Feature 1</h3><p>Description of feature 1</p>"
                    }
                  }
                ]
              },
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h3>Feature 2</h3><p>Description of feature 2</p>"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      counters: { u_column: 2, u_row: 2 }
    },
    compiled_html: "<h2>Monthly Newsletter</h2><p>Stay updated with our latest news and updates.</p><h3>Feature 1</h3><p>Description of feature 1</p><h3>Feature 2</h3><p>Description of feature 2</p>",
    variables: ["name", "email", "company"],
    created_at: "2025-01-02T00:00:00.000Z",
    updated_at: "2025-01-02T00:00:00.000Z"
  },
  {
    _id: "template-3",
    created_by: "60f7c2b3c2a5f3e9a4d2a1c0",
    workspace_id: "60f7c2b3c2a5f3e9a4d2a1c0",
    name: "Product Launch",
    description: "Exciting product launch announcement template",
    subject: "🚀 New Product Launch!",
    template_schema: {
      body: {
        rows: [
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h1>🚀 New Product Launch!</h1><p>Introducing our revolutionary new product that will change everything.</p>"
                    }
                  }
                ]
              }
            ]
          },
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: "button",
                    values: {
                      text: "Learn More",
                      href: "#",
                      backgroundColor: "#1976d2",
                      color: "#ffffff"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      counters: { u_column: 1, u_row: 2 }
    },
    compiled_html: "<h1>🚀 New Product Launch!</h1><p>Introducing our revolutionary new product that will change everything.</p><button style='background-color: #1976d2; color: #ffffff;'>Learn More</button>",
    variables: ["name", "product_name"],
    created_at: "2025-01-03T00:00:00.000Z",
    updated_at: "2025-01-03T00:00:00.000Z"
  },
  {
    _id: "template-4",
    created_by: "60f7c2b3c2a5f3e9a4d2a1c0",
    workspace_id: "60f7c2b3c2a5f3e9a4d2a1c0",
    name: "Promotional Offer",
    description: "Special promotional offer template with discount code",
    subject: "🎉 Special Offer - 50% Off!",
    template_schema: {
      body: {
        rows: [
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h2>🎉 Special Offer!</h2><p>Get 50% off on all products for a limited time only.</p>"
                    }
                  }
                ]
              }
            ]
          },
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<div style='background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 8px;'><h3>Use Code: SAVE50</h3></div>"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      counters: { u_column: 1, u_row: 2 }
    },
    compiled_html: "<h2>🎉 Special Offer!</h2><p>Get 50% off on all products for a limited time only.</p><div style='background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 8px;'><h3>Use Code: SAVE50</h3></div>",
    variables: ["name", "discount_code"],
    created_at: "2025-01-04T00:00:00.000Z",
    updated_at: "2025-01-04T00:00:00.000Z"
  },
  {
    _id: "template-5",
    created_by: "60f7c2b3c2a5f3e9a4d2a1c0",
    workspace_id: "60f7c2b3c2a5f3e9a4d2a1c0",
    name: "Event Invitation",
    description: "Event invitation template with RSVP functionality",
    subject: "You're Invited!",
    template_schema: {
      body: {
        rows: [
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h1>You're Invited!</h1><p>Join us for an exclusive event on <strong>January 15th, 2025</strong></p>"
                    }
                  }
                ]
              }
            ]
          },
          {
            cells: [2],
            columns: [
              {
                contents: [
                  {
                    type: "text",
                    values: {
                      text: "<h3>Event Details</h3><p>Date: January 15th, 2025<br>Time: 7:00 PM<br>Location: Convention Center</p>"
                    }
                  }
                ]
              },
              {
                contents: [
                  {
                    type: "button",
                    values: {
                      text: "RSVP Now",
                      href: "#",
                      backgroundColor: "#4caf50",
                      color: "#ffffff"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      counters: { u_column: 2, u_row: 2 }
    },
    compiled_html: "<h1>You're Invited!</h1><p>Join us for an exclusive event on <strong>January 15th, 2025</strong></p><h3>Event Details</h3><p>Date: January 15th, 2025<br>Time: 7:00 PM<br>Location: Convention Center</p><button style='background-color: #4caf50; color: #ffffff;'>RSVP Now</button>",
    variables: ["name", "event_name", "event_date"],
    created_at: "2025-01-05T00:00:00.000Z",
    updated_at: "2025-01-05T00:00:00.000Z"
  }
];

const TemplatesSection = ({ 
  templates = [], 
  onTemplateSelect, 
  selectedTemplate, 
  isLoading = false,
  onTemplateUpdated
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("recent");
  const navigate = useNavigate();
  const location = useLocation();
  const campaignData = location.state?.campaignData;
  const recipientData = location.state?.recipientData;

  // Use default templates if no API data is available
  const displayTemplates = templates.length > 0 ? templates : DEFAULT_TEMPLATES;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleEditTemplate = (template) => {
    // Navigate to TemplateEditor with template data for editing
    navigate("/template-editor", {
      state: { 
        campaignData, 
        recipientData,
        editingTemplate: template
      }
    });
  };


  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <Box sx={{ mb: 3, flexShrink: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Templates
        </Typography>
        
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ mb: 2 }}
        >
          <Tab label="Email library" />
          <Tab label="Email: saved" />
        </Tabs>

        {/* Search and Controls */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          {/* View Mode Toggle */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => handleViewModeChange("grid")}
              color={viewMode === "grid" ? "primary" : "default"}
            >
              <GridIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleViewModeChange("list")}
              color={viewMode === "list" ? "primary" : "default"}
            >
              <ListIcon />
            </IconButton>
          </Box>

          {/* Sort Dropdown */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              displayEmpty
            >
              <MenuItem value="recent">Edited most recently</MenuItem>
              <MenuItem value="name">Name A-Z</MenuItem>
              <MenuItem value="created">Created date</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ fontWeight: 600 }}
              onClick={() =>
                navigate("/template-editor", {
                  state: { campaignData, recipientData },
                })
              }
            >
              Create
            </Button>
            <Typography variant="body2" color="text.secondary">
              {displayTemplates.length} template{displayTemplates.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content Area */}
      <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        {isLoading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Loading templates...
            </Typography>
          </Box>
        ) : displayTemplates.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
                borderRadius: 2,
              }}
            >
              <HelpIcon sx={{ fontSize: 40, color: "grey.400" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              No templates found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your first template to get started.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ p: 1 }}>
            <Grid container spacing={2}>
              {displayTemplates
                .filter(template => 
                  template.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((template) => (
                <Grid item xs={12} sm={6} md={4} key={template._id || template.id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      border: selectedTemplate?._id === template._id || selectedTemplate?.id === template.id 
                        ? "2px solid #1976d2" 
                        : "1px solid #e0e0e0",
                      "&:hover": {
                        boxShadow: 3,
                        transform: "translateY(-2px)",
                        transition: "all 0.2s ease-in-out",
                      },
                      transition: "all 0.2s ease-in-out",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => onTemplateSelect && onTemplateSelect(template)}
                  >
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Template Preview Area */}
                      <Box
                        sx={{
                          height: 120,
                          bgcolor: "#f8f9fa",
                          borderRadius: 1,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #e0e0e0",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                          {template.name}
                        </Typography>
                        {/* Status Badge */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: template.status === "published" ? "#4caf50" : "#ff9800",
                            color: "white",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          {template.status || "draft"}
                        </Box>
                      </Box>

                      {/* Template Info */}
                      <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: "1rem" }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {template.description || "Email template"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: "0.75rem" }}>
                        Subject: {template.subject}
                      </Typography>
                      {template.created_at && (
                        <Typography variant="caption" color="text.secondary">
                          {new Date(template.created_at).toLocaleDateString()}
                        </Typography>
                      )}
                      </Box>

                      {/* Action Icons */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTemplate(template);
                            }}
                            sx={{ 
                              bgcolor: "primary.main", 
                              color: "white",
                              "&:hover": { bgcolor: "primary.dark" }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Preview functionality can be added here
                            }}
                            sx={{ 
                              bgcolor: "grey.300", 
                              color: "text.primary",
                              "&:hover": { bgcolor: "grey.400" }
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TemplatesSection;
