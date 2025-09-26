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
import dayjs from "dayjs";

const Member = ({ membersData, updateList }) => {
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
                {/* <TableCell>Location</TableCell> */}
                <TableCell>Date added</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersData.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Typography color="primary" sx={{ cursor: "pointer" }}>
                      {m.contact.first_name} {m.contact.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>{m.contact.email}</TableCell>
                  <TableCell>{m?.phone}</TableCell>
                  {/* <TableCell>{m?.location}</TableCell> */}
                  <TableCell>
                    {m.created_at
                      ? dayjs(m.created_at).format("MMM DD, YYYY, h:mm A")
                      : ""}
                  </TableCell>
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
        onClose={(flag) => {
          setAddMember(false);
          if (flag) {
            updateList();
          }
        }}
      />
    </Box>
  );
};

export default Member;
