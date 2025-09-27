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
  InputLabel,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import {
  Search as SearchIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Help as HelpIcon,
} from "@mui/icons-material";

const TemplatesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("recent");

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

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ fontWeight: 600 }}
          >
            Create
          </Button>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content Area */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {activeTab === 0 ? (
          // Email library tab
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
              You haven't created any templates yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Once created, your saved templates will appear here.
            </Typography>
          </Box>
        ) : (
          // Email: saved tab
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
              You haven't created any templates yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Once created, your saved templates will appear here.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TemplatesSection;
