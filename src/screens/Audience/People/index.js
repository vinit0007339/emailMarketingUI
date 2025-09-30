import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DCButton from "../../../component/DCButton";

/**
 * ProfilesScreen
 * - Replicates the reference UI: header actions, profile counts, and explore table
 * - Font sizing mirrors the screenshot using MUI typography scales
 * - DCButton is used for the top right actions as requested
 */
export default function People() {
  // Mock data (replace with API once available)
  const [query, setQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const data = useMemo(
    () => [
      {
        id: "1",
        profile: "nitin@crescenthomes.ca",
        email: "nitin@crescenthomes.ca",
        phone: "",
        createdAt: "August 30, 2025 at 6:24 PM",
        updatedAt: "August 30, 2025 at 6:24 PM",
        location: "",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(
      (r) =>
        r.profile.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q)
    );
  }, [data, query]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header with actions */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Profiles</Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <DCButton variant="contained" color="inherit" size="medium">
            View suppressed profiles
          </DCButton>
          <DCButton variant="outlined" size="medium">
            View subscriber growth
          </DCButton>
        </Box>
      </Box>

      {/* Profile counts card */}
      <Paper elevation={0} sx={{ border: "1px solid #e5e7eb", borderRadius: 2, p: { xs: 2, md: 3 }, mb: 3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>Profile counts</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>Total profiles</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>1</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>All profiles</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>Email profile counts</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>1</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>Active profiles</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>&nbsp;</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>0</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>Suppressed profiles</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Explore profiles card */}
      <Paper elevation={0} sx={{ border: "1px solid #e5e7eb", borderRadius: 2, p: { xs: 2, md: 3 } }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>Explore profiles</Typography>

        {/* Search row */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="medium"
              placeholder="Search for someone"
              helperText="by name, email, or exact phone number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Typography component="span" sx={{ fontSize: 14, color: "text.secondary" }}>
              To filter profiles, <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>create a segment</Typography>.
            </Typography>
          </Grid>
        </Grid>

        {/* Table */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Profile</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Profile created</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Profile updated</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ color: "primary.main", fontWeight: 600 }}>{row.profile}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone || "\u2014"}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
                <TableCell>{row.location || "\u2014"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer controls */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: 14 }}>Show</Typography>
            <Select size="small" value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size="small"><ChevronLeftIcon /></IconButton>
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Prev</Typography>
            <Typography sx={{ mx: 1, color: "text.disabled" }}>|</Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Next</Typography>
            <IconButton size="small"><ChevronRightIcon /></IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
