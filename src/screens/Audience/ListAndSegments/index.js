import dayjs from "dayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData, updateAddData } from "../../../Utility/API";
import DCButton from "../../../component/DCButton";
import { endPoints } from "../../../constant/Environment";
import CreateListModal from "./CreateListModal";
import { setLoading } from "../../../redux/Reducers/GlobalReducer/globalSlice";
import { useDispatch } from "react-redux";
import EditListModal from "./EditListModal";
import DeleteListModal from "./DeleteListModal";
import { useSnackbarContext } from "../../../component/SnackbarContext";
export default function ListsAndSegments() {
  const [ListData, setListData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [createAnchorEl, setCreateAnchorEl] = useState(null);
  const createOpen = Boolean(createAnchorEl);
  const [openCreateList, setOpenCreateList] = useState(false);
  const [openEditList, setOpenEditList] = useState(false);
  const [deleteList, setDeleteList] = useState(false);

  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const actionMenuOpen = Boolean(actionAnchorEl);

  const handleActionClick = (event, row) => {
    event.stopPropagation(); // prevent row navigation
    setActionAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
    // setSelectedRow(null);
  };

  const handleEditAction = () => {
    setActionAnchorEl(null);
    setOpenEditList(true);
  };

  const handleDeleteAction = () => {
    setActionAnchorEl(null);
    setDeleteList(true);
  };

  const handleCreateClick = (event) => {
    setCreateAnchorEl(event.currentTarget);
  };
  const handleCreateClose = () => setCreateAnchorEl(null);
  const goToCreateList = () => {
    setCreateAnchorEl(null);
    setOpenCreateList(true);
  };
  const goToCreateSegment = () => {
    handleCreateClose();
    // navigate("/create-segment");
  };

  const toggleStar = async (e, item) => {
    e.stopPropagation(); // prevent TableCell navigation

    const nextFavorite = !Boolean(item?.is_favorite);
    const payload = { is_favorite: nextFavorite };

    // Optimistic UI update
    setListData((prev) =>
      prev.map((it) =>
        it._id === item._id ? { ...it, is_favorite: nextFavorite } : it
      )
    );

    try {
      dispatch(setLoading(true));
      const response = await updateAddData(
        endPoints.api.LIST_IN_FAVORITE(item._id),
        payload
      );
      dispatch(setLoading(false));

      if (response?.data?.status === "success") {
        showSuccessSnackbar(
          nextFavorite ? "Added to favorites" : "Removed from favorites"
        );
        getAllList();
      } else {
        // Revert optimistic update on failure
        setListData((prev) =>
          prev.map((it) =>
            it._id === item._id ? { ...it, is_favorite: !nextFavorite } : it
          )
        );
        showErrorSnackbar("Failed to update favorite. Please try again.");
      }
    } catch (error) {
      dispatch(setLoading(false));
      // Revert optimistic update on error
      setListData((prev) =>
        prev.map((it) =>
          it._id === item._id ? { ...it, is_favorite: !nextFavorite } : it
        )
      );
      console.error(error);
      showErrorSnackbar("Something went wrong while updating favorite.");
    }
  };

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    try {
      dispatch(setLoading(true));
      let response = await getAllData(endPoints.api.GET_ALL_LIST);
      dispatch(setLoading(false));

      if (response.status == "success") {
        //  console.log("(response.data", response.lists);
        setListData(response.lists);
      } else {
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.log("Error while fetching campaigns", err);
    }
  };

  // console.log("ListData", ListData);
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
          <DCButton variant="outlined">Inactive Segments</DCButton>
          <DCButton
            variant="contained"
            onClick={handleCreateClick}
            endIcon={
              createOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1.5,
              px: 2.5,
            }}
            aria-controls={createOpen ? "create-new-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={createOpen ? "true" : undefined}
          >
            Create New
          </DCButton>
          <Menu
            id="create-new-menu"
            anchorEl={createAnchorEl}
            open={createOpen}
            onClose={handleCreateClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                boxShadow:
                  "0px 4px 24px rgba(0,0,0,0.15), 0px 2px 8px rgba(0,0,0,0.08)",
                minWidth: 360,
                p: 0.5,
              },
            }}
            MenuListProps={{ sx: { p: 0 } }}
          >
            <MenuItem
              onClick={goToCreateList}
              sx={{
                alignItems: "flex-start",
                py: 1.5,
                px: 2,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemText
                primary="Create list"
                secondary="Static list of profiles"
                primaryTypographyProps={{ fontWeight: 700, fontSize: 16 }}
                secondaryTypographyProps={{
                  color: "text.secondary",
                  mt: 0.5,
                  fontSize: 12,
                }}
              />
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={goToCreateSegment}
              sx={{
                alignItems: "flex-start",
                py: 1.5,
                px: 2,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemText
                primary="Create segment"
                secondary="Dynamic group based on defined properties"
                primaryTypographyProps={{ fontWeight: 700, fontSize: 16 }}
                secondaryTypographyProps={{
                  color: "text.secondary",
                  mt: 0.5,
                  fontSize: 12,
                }}
              />
            </MenuItem>
          </Menu>
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
          {ListData.map((item, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell
                onClick={() => navigate(`/list-details?id=${item._id}`)}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={(e) => toggleStar(e, item)}
                    size="small"
                    color={item?.is_favorite ? "warning" : "default"}
                  >
                    {item?.is_favorite ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                  <Typography color="primary" sx={{ cursor: "pointer" }}>
                    {item.name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{"List"}</TableCell>
              <TableCell>{item?.contacts_count || 0}</TableCell>
              <TableCell>
                {item.created_at
                  ? dayjs(item.created_at).format("MMM DD, YYYY, h:mm A")
                  : ""}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleActionClick(e, item)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Row Actions Menu */}
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
        <MenuItem onClick={handleEditAction}>Edit List Name</MenuItem>
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

      <CreateListModal
        openCreateList={openCreateList}
        onClose={async (flag) => {
          if (flag) {
            await getAllList();
            setOpenCreateList(false);
          } else {
            setOpenCreateList(false);
          }
        }}
      />

      <EditListModal
        openEditList={openEditList}
        selectedRow={selectedRow}
        onClose={async (flag) => {
          if (flag) {
            await getAllList();
            setOpenEditList(false);
          } else {
            setOpenEditList(false);
          }
        }}
      />

      <DeleteListModal
        deleteList={deleteList}
        selectedRow={selectedRow}
        onClose={async (flag) => {
          if (flag) {
            await getAllList();
            setDeleteList(false);
          } else {
            setDeleteList(false);
          }
        }}
      />
    </Box>
  );
}
