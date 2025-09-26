import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MemberEmptyScreen from "../MemberEmptyScreen";
import React, { useState } from "react";
import CreateMember from "./CreateMember";

const Member = ({ membersData }) => {
  const navigate = useNavigate();
  const [addMember, setAddMember] = useState(false);

  return (
    <Box>
      {membersData.length > 0 ? (
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
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ) : (
        <MemberEmptyScreen
          onCreateSignupForm={() => navigate("/forms/new")}
          onSetupSubscribePage={() => navigate("/subscribe-page")}
          onUploadContacts={() => navigate("/audience/import")}
          onQuickAdd={() => setAddMember(true)}
        />
      )}
      <CreateMember
        addMember={addMember}
        onClose={() => {
          setAddMember(false);
        }}
      />
    </Box>
  );
};

export default Member;
