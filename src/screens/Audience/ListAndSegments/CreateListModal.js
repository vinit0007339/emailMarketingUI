import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DCButton from "../../../component/DCButton";
import Loader from "../../../component/Loader";
import { useSnackbarContext } from "../../../component/SnackbarContext";
import { endPoints } from "../../../constant/Environment";
import { addData } from "../../../Utility/API";

export default function CreateListModal({ openCreateList, onClose }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [newListName, setNewListName] = useState("");
  const [newListTags, setNewListTags] = useState([]);
  const [nameError, setNameError] = useState("");
  const tagOptions = ["VIP", "Leads", "Customers", "Trial", "Newsletter"];
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const handleCloseCreateList = (flag = false) => {
    onClose(flag);
    setNameError("");
    setNewListName("");
    setNewListTags([]);
  };
  const handleSubmitCreateList = async () => {
    if (!newListName.trim()) {
      setNameError("List name is required");
      return;
    }
    const payload = {
      name: newListName,
    };
    try {
      setLoading(true);
      let response = await addData(endPoints.api.CREATE_LIST, payload);
      setLoading(false);
      if (response.data.status == "success") {
        showSuccessSnackbar("List created successfully!");
        handleCloseCreateList(true);
         navigate(`/list-details?id=${response.data.data._id}`)
      } else {
        showErrorSnackbar("Failed to create List.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Box p={3}>
      <Dialog
        open={openCreateList}
        onClose={() => {
          handleCloseCreateList();
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ pr: 7 }}>
          <Typography variant="h5" fontWeight={700}>
            Create list
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            Give your list a name and then we&apos;ll add people to it.
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              handleCloseCreateList();
            }}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Loader loading={loading} />
          <Box>
            <Typography fontWeight={600} mb={0.75}>
              Name<span style={{ color: "#d32f2f" }}>*</span>
            </Typography>
            <TextField
              placeholder="List name"
              fullWidth
              value={newListName}
              onChange={(e) => {
                setNewListName(e.target.value);
                if (nameError) setNameError("");
              }}
              error={Boolean(nameError)}
              helperText={nameError || " "}
            />
          </Box>
          {/* Tags input is hidden right now later we can enabled */}
          {/* <Box mt={1.5}>
            <Typography fontWeight={600} mb={0.75}>
              Tags
            </Typography>
            <Select
              multiple
              displayEmpty
              value={newListTags}
              onChange={(e) => setNewListTags(e.target.value)}
              fullWidth
              input={
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <LocalOfferOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  }
                />
              }
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography color="text.secondary">Select tags</Typography>
                  );
                }
                return (
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {selected.map((val) => (
                      <Chip key={val} size="small" label={val} />
                    ))}
                  </Box>
                );
              }}
            >
              <MenuItem disabled>
                <ListItemText primary="Select tags" />
              </MenuItem>
              {tagOptions.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={newListTags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText> </FormHelperText>
          </Box> */}
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <DCButton
            variant="contained"
            onClick={handleSubmitCreateList}
            sx={{
              px: 2.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Create list
          </DCButton>
          <DCButton
            variant="outlined"
            onClick={() => {
              handleCloseCreateList();
            }}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </DCButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
