import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllData } from "../../../../Utility/API";
import { endPoints } from "../../../../constant/Environment";
import { setLoading } from "../../../../redux/Reducers/GlobalReducer/globalSlice";
import MemberEmptyScreen from "../MemberEmptyScreen";
import CreateMember from "./CreateMember";
import DeleteMember from "./DeleteMember";
const Member = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addMember, setAddMember] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [deleteMember, setDeleteMember] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const actionMenuOpen = Boolean(actionAnchorEl);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [membersData, setMemberData] = useState([]);

  const handleActionClose = () => {
    setActionAnchorEl(null);
  };

  const handleDeleteAction = () => {
    setActionAnchorEl(null);
    setDeleteMember(true);
  };

  const handleActionClick = (event, row) => {
    event.stopPropagation(); // prevent row navigation
    setActionAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  useEffect(() => {
    if (id) {
      getMemberInfoById(id);
    }
  }, [id]);

  const getMemberInfoById = async (id) => {
    try {
      dispatch(setLoading(true));
      let response = await getAllData(endPoints.api.LIST_IN_CONTACT(id));
      dispatch(setLoading(false));
      if (response.status === "success") {
        setMemberData(response.data);
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.log("Error while fetching campaigns", err);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ m: 2 }}
      >
        <Button
          variant="outlined"
          sx={{ textTransform: "none", fontWeight: 600 }}
          onClick={() => {
            setAddMember(true);
          }}
        >
          Quick Add
        </Button>
      </Stack>
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
                    <IconButton onClick={(e) => handleActionClick(e, m)}>
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

      {addMember && (
        <CreateMember
          addMember={addMember}
          onClose={(flag) => {
            setAddMember(false);
            if (flag) {
              getMemberInfoById(id);
            }
          }}
        />
      )}
      <Menu
        anchorEl={actionAnchorEl}
        open={actionMenuOpen}
        onClose={handleActionClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow:
              "0px 4px 24px rgba(0,0,0,0.15), 0px 2px 8px rgba(0,0,0,0.08)",
            minWidth: 240,
          },
        }}
      >
        <Divider />
        <MenuItem
          onClick={handleDeleteAction}
          sx={{ color: "error.main", fontWeight: 600 }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <DeleteIcon />
          </ListItemIcon>
          Delete List
        </MenuItem>
      </Menu>

      <DeleteMember
        deleteMember={deleteMember}
        selectedRow={selectedRow}
        onClose={async (flag) => {
          setDeleteMember(false);
          if (flag) {
            getMemberInfoById(id);
          }
        }}
      />
    </Box>
  );
};

export default Member;
