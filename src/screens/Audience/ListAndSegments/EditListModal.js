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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DCButton from "../../../component/DCButton";
import Loader from "../../../component/Loader";
import { useSnackbarContext } from "../../../component/SnackbarContext";
import { endPoints } from "../../../constant/Environment";
import { updateAddData } from "../../../Utility/API";

export default function EditListModal({ openEditList, onClose, selectedRow }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [newListName, setNewListName] = useState("");
  const [nameError, setNameError] = useState("");
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const handleCloseCreateList = (flag = false) => {
    onClose(flag);
    setNameError("");
    setNewListName("");
  };
  useEffect(() => {
    if (selectedRow) {
      setNewListName(selectedRow.name);
    }
  }, [selectedRow]);

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
      let response = await updateAddData(
        `${endPoints.api.UPDATE_LIST}/${selectedRow?._id}`,
        payload
      );
      setLoading(false);
      if (response.data.status == "success") {
        showSuccessSnackbar("List updated successfully!");
        handleCloseCreateList(true);
      } else {
        showErrorSnackbar("Failed to update the  List.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Box p={3}>
      <Dialog
        open={openEditList}
        onClose={() => {
          handleCloseCreateList();
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ pr: 7 }}>
          <Typography variant="h5" fontWeight={700}>
            Edit list name
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            Update the name of this list:
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
            Save Name
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
