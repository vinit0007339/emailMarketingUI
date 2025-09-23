import React, { useMemo, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ListIcon from "@mui/icons-material/List";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreateCampaignDrawer from "./CreateCampaignDrawer";

const mockRows = [
  {
    id: 1,
    name: "Email Campaign",
    subtitle: "Email List",
    typeIcon: <EmailIcon fontSize="small" />,
    status: "Draft",
    updated: "Today at 2:43 AM",
    openRate: "-",
    clickRate: "-",
    activeOnSite: "-",
  },
  {
    id: 2,
    name: "Spring Sale",
    subtitle: "Newsletter Subscribers",
    typeIcon: <EmailIcon fontSize="small" />,
    status: "Scheduled",
    updated: "Yesterday at 5:12 PM",
    openRate: "45%",
    clickRate: "12%",
    activeOnSite: "No",
  },
  {
    id: 3,
    name: "Product Launch",
    subtitle: "All Customers",
    typeIcon: <EmailIcon fontSize="small" />,
    status: "Sent",
    updated: "Mar 10, 2024 at 11:00 AM",
    openRate: "60%",
    clickRate: "20%",
    activeOnSite: "Yes",
  },
];

const Campaigns = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerSubmit = (data) => {
    // handle submit logic here
    // e.g., send data to API or update state
  };

  const rows = useMemo(() => {
    if (!query.trim()) return mockRows;
    const q = query.toLowerCase();
    return mockRows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)
    );
  }, [query]);

  const allChecked = selected.length === rows.length && rows.length > 0;
  const someChecked = selected.length > 0 && selected.length < rows.length;

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
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleDrawerSubmit}
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
                <TableRow key={r.id} hover selected={selected.includes(r.id)}>
                  <TableCell padding="checkbox">
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
                  <TableCell align="right">
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Campaigns;
