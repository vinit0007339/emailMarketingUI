import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const membersData = [
  {
    profile: "nitin@crescenthomes.ca",
    email: "nitin@crescenthomes.ca",
    phone: "-",
    location: "-",
    dateAdded: "Aug 30, 2025, 6:24 PM",
  },
];

export default function ListDetails() {
  const { name } = useParams();
  const [tab, setTab] = useState(0);

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h6">{name}</Typography>
      <Typography
        variant="caption"
        sx={{ bgcolor: "grey.200", p: 0.5, borderRadius: 1, ml: 1 }}
      >
        List
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}
      >
        <Tab label={`Members (${membersData.length})`} />
        <Tab label="Sign-up forms" />
        <Tab label="Subscribe & preferences pages" />
        <Tab label="Imports" />
        <Tab label="List growth" />
        <Tab label="Engagement" />
        <Tab label="Settings" />
      </Tabs>

      {/* Tab Content */}
      {tab === 0 && (
        <Box mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersData.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Typography color="primary" sx={{ cursor: "pointer" }}>
                      {m.profile}
                    </Typography>
                  </TableCell>
                  <TableCell>{m.email}</TableCell>
                  <TableCell>{m.phone}</TableCell>
                  <TableCell>{m.location}</TableCell>
                  <TableCell>{m.dateAdded}</TableCell>
                  <TableCell align="right">
                    <IconButton><MoreVertIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
