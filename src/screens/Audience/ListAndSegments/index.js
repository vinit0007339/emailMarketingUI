import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

// Sample Data Array
const initialData = [
  {
    name: "Engaged (60 Days)",
    type: "Segment",
    members: 1,
    created: "Aug 30, 2025, 6:24 PM",
    starred: false,
  },
  {
    name: "Engaged (90 Days)",
    type: "Segment",
    members: 1,
    created: "Aug 30, 2025, 6:24 PM",
    starred: false,
  },
  {
    name: "Engaged (30 Days)",
    type: "Segment",
    members: 0,
    created: "Aug 30, 2025, 6:24 PM",
    starred: false,
  },
  {
    name: "Preview List",
    type: "List",
    members: 1,
    created: "Aug 30, 2025, 6:24 PM",
    starred: true,
  },
  {
    name: "New Subscribers",
    type: "Segment",
    members: 0,
    created: "Aug 30, 2025, 6:24 PM",
    starred: false,
  },
  {
    name: "Email List",
    type: "List",
    members: 1,
    created: "Aug 30, 2025, 6:24 PM",
    starred: true,
  },
  {
    name: "SMS List",
    type: "List",
    members: 0,
    created: "Aug 30, 2025, 6:24 PM",
    starred: true,
  },
];

export default function ListsAndSegments() {
  const [data, setData] = useState(initialData);

  const toggleStar = (index) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, starred: !item.starred } : item
      )
    );
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Lists & Segments</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Inactive Segments</Button>
          <Button variant="contained">Create New</Button>
        </Stack>
      </Stack>

      {/* Filters */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField size="small" placeholder="Search" />
        <Select size="small" displayEmpty defaultValue="">
          <MenuItem value="">Tags</MenuItem>
          <MenuItem value="tag1">Tag 1</MenuItem>
        </Select>
        <Select size="small" displayEmpty defaultValue="">
          <MenuItem value="">All types</MenuItem>
          <MenuItem value="Segment">Segment</MenuItem>
          <MenuItem value="List">List</MenuItem>
        </Select>
        <Button size="small">Clear</Button>
      </Stack>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Members</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={() => toggleStar(index)}
                    size="small"
                    color={item.starred ? "warning" : "default"}
                  >
                    {item.starred ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                  <Typography color="primary" sx={{ cursor: "pointer" }}>
                    {item.name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.members}</TableCell>
              <TableCell>{item.created}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
