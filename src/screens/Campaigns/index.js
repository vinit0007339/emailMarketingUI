import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmailIcon from "@mui/icons-material/Email";
import CreateCampaignDrawer from "./CreateCampaignDrawer";
import { getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";

const Campaigns = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editInitial, setEditInitial] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [campaigns, setCampaigns] = useState([]); // New state for campaigns
  const navigate = useNavigate();

  const handleDrawerSubmit = (data) => {
    // Navigate to recipient screen with campaign data
    navigate("/recipient", { state: { campaignData: data } });
  };

  const openRowMenu = (event, row) => {
    event.stopPropagation();
    setSelectedRow(row);
    setActionAnchorEl(event.currentTarget);
  };

  const closeRowMenu = () => {
    setActionAnchorEl(null);
  };

  const onEditDetails = () => {
    closeRowMenu();
    setEditInitial(selectedRow);
    setDrawerOpen(true);
  };

  const onEditMessage = () => {
    closeRowMenu();
    if (selectedRow) {
      navigate("/recipient", { state: { campaignData: createNavigationData(selectedRow) } });
    }
  };

  const onDelete = () => {
    // TODO: integrate delete campaign API
    closeRowMenu();
    console.log("Delete campaign requested", selectedRow);
  };

  // Format API data for table
  const formatCampaigns = (data) =>
    data.map((item) => ({
      id: item._id,
      name: item.name,
      subtitle: item.subject || "No Subject",
      typeIcon: <EmailIcon fontSize="small" />,
      status:
        item.status === 1 ? "Draft" : item.status === 2 ? "Scheduled" : "Sent",
      updated: item.created_at
        ? new Date(item.created_at).toLocaleString()
        : "-",
      openRate: "-", // Replace with actual data if available
      clickRate: "-", // Replace with actual data if available
      activeOnSite: "-", // Replace with actual data if available
    }));

  // Create navigation-safe campaign data (without JSX elements)
  const createNavigationData = (campaign) => ({
    id: campaign.id,
    name: campaign.name,
    subtitle: campaign.subtitle,
    status: campaign.status,
    updated: campaign.updated,
    openRate: campaign.openRate,
    clickRate: campaign.clickRate,
    activeOnSite: campaign.activeOnSite,
  });

  const rows = useMemo(() => {
    if (!query.trim()) return campaigns;
    const q = query.toLowerCase();
    return campaigns.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)
    );
  }, [query, campaigns]);

  const getAllCampaigns = useCallback(async () => {
    try {
      let response = await getAllData(endPoints.api.GET_ALL_CAMPAIGNS);
      // Assuming response.data is an array of campaigns
      setCampaigns(formatCampaigns(response.data));
      console.log("All campaigns", response);
    } catch (err) {
      console.log("Error while fetching campaigns", err);
    }
  }, []);

  const allChecked = selected.length === rows.length && rows.length > 0;
  const someChecked = selected.length > 0 && selected.length < rows.length;

  useEffect(() => {
    getAllCampaigns();
  }, [getAllCampaigns]);

  const toggleAll = (e) => {
    if (e.target.checked) setSelected(rows.map((r) => r.id));
    else setSelected([]);
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mx: "auto", px: { xs: 2, md: 3 }, py: 2.5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Campaigns
          </Typography>
          <Stack direction="row" spacing={1}>
            {/* <Button variant="outlined" startIcon={<CheckCircleOutlineIcon />}>View library</Button>
            <Button variant="outlined" startIcon={<ListIcon />}>List</Button>
            <Button variant="outlined" startIcon={<CalendarMonthIcon />}>Calendar</Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDrawerOpen(true)}
            >
              Create campaign
            </Button>
          </Stack>
        </Stack>
        <CreateCampaignDrawer
          open={drawerOpen}
          onClose={(flag) => {
            setDrawerOpen(false);
            setEditInitial(null);
          }}
          onSubmit={handleDrawerSubmit}
          initialData={editInitial}
        />
        {/* Toolbar */}
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 3,
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <TextField
              size="small"
              placeholder="Search campaigns"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ minWidth: { xs: "100%", md: 320 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
          </Stack>
        </Paper>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            mt: 2,
            borderRadius: 3,
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={someChecked}
                    checked={allChecked}
                    onChange={toggleAll}
                  />
                </TableCell>
                <TableCell>Campaign</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last updated</TableCell>
                <TableCell>Open rate</TableCell>
                <TableCell>Click rate</TableCell>
                <TableCell>Active on Site</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow 
                  key={r.id} 
                  hover 
                  selected={selected.includes(r.id)}
                  onClick={() => navigate("/recipient", { state: { campaignData: createNavigationData(r) } })}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selected.includes(r.id)}
                      onChange={() => toggleRow(r.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.25}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {r.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {r.subtitle}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {r.typeIcon}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={r.status}
                      color="default"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{r.updated}</TableCell>
                  <TableCell>{r.openRate}</TableCell>
                  <TableCell>{r.clickRate}</TableCell>
                  <TableCell>{r.activeOnSite}</TableCell>
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <IconButton onClick={(e) => openRowMenu(e, r)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu
          anchorEl={actionAnchorEl}
          open={Boolean(actionAnchorEl)}
          onClose={closeRowMenu}
          PaperProps={{ sx: { borderRadius: 2 } }}
        >
          <MenuItem onClick={onEditMessage}>Edit message</MenuItem>
          <MenuItem onClick={onEditDetails}>Edit details</MenuItem>
          <Divider />
          <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>Delete</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Campaigns;
