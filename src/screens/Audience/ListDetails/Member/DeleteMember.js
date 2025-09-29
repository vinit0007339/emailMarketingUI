import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DCButton from "../../../../component/DCButton";
import Loader from "../../../../component/Loader";
import { useSnackbarContext } from "../../../../component/SnackbarContext";
import { endPoints } from "../../../../constant/Environment";
import { deleteData } from "../../../../Utility/API";
export default function DeleteMember({ deleteMember, onClose, selectedRow, }) {
  const [loading, setLoading] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const handleClose = (flag = false) => {
    onClose(flag);
  };


  // console.log('selec',selected)
  const handleDelete = async () => {
    console.log('selectedRow._id,listId',selectedRow.contact_id,selectedRow.list_id)
    try {
      setLoading(true);
      let response = await deleteData(
         endPoints.api.DELETE_IN_CONTACT_FROM_LIST(selectedRow.contact_id,selectedRow.list_id),
      );


      setLoading(false);
      if (response.data.success) {
        showSuccessSnackbar("Member deleted successfully!");
        handleClose(true);
      } else {
        showErrorSnackbar("Failed to deleted the List.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Box p={3}>
      <Dialog
        open={deleteMember}
        onClose={() => {
          handleClose();
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ pr: 7 }}>
          <Typography variant="h5" fontWeight={800} fontSize={20}>
            Delete list
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              handleClose();
            }}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Loader loading={loading} />
          <Typography variant="body1" mt={1.5} fontSize={16} lineHeight={1.6}>
            You are about to delete{" "}
            <Typography component="span" fontWeight={800} fontSize={16}>
              {selectedRow?.name || "this list"}
            </Typography>
            . Deleting this list may affect existing campaigns associated with
            it.This action cannot be undone.
            {/* , forms, or flows
            associated with it. This action cannot be undone. */}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <DCButton
            variant="outlined"
            onClick={() => {
              handleClose();
            }}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </DCButton>
          <DCButton
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Delete
          </DCButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
