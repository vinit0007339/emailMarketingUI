import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip,
  Autocomplete,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import CampaignIcon from "@mui/icons-material/Campaign";
import { addData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSnackbarContext } from "../../component/SnackbarContext";
import DCButton from "../../component/DCButton";
import Loader from "../../component/Loader";

const campaignTags = [
  "Newsletter",
  "Promotion",
  "Product Launch",
  "Seasonal",
  "Event",
];

const CreateCampaignDrawer = ({ open, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [tags, setTags] = useState([]);
  const [campaignType, setCampaignType] = useState("email");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDraftDate(initialData.draftDate || "");
      setTags(initialData.tags || []);
      setCampaignType(initialData.campaignType || "email");
    } else {
      setName("");
      setDraftDate("");
      setTags([]);
      setCampaignType("email");
    }
  }, [initialData]);

  const handleClose = (flag = false) => {
    onClose(flag);
    setNameError("");
    setName("");
    setDraftDate("");
    setTags([]);
    setCampaignType("email");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setNameError("Campaign name is required");
      return;
    }
    
    const payload = {
      name,
      channel: 1,
      type: 1,
      date: draftDate ? new Date(draftDate).toISOString() : null,
    };
    
    // If editing, just pass back without calling create API
    if (initialData) {
      onSubmit({ name, draftDate, tags, campaignType, id: initialData.id });
      showSuccessSnackbar("Campaign updated");
      handleClose(true);
      return;
    }

    try {
      setLoading(true);
      let response = await addData(endPoints.api.CREATE_CAMPAIGN, payload);
      setLoading(false);
      console.log("Campaign:", response);
      if (response.data.status === "success") {
        showSuccessSnackbar("Campaign created successfully!");
        onSubmit({ name, draftDate, tags, campaignType });
        handleClose(true);
      } else {
        showErrorSnackbar("Failed to create campaign. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      showErrorSnackbar("Failed to create campaign. Please try again.");
    }
  };

  return (
    <Box p={3}>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ pr: 7 }}>
          <Typography variant="h5" fontWeight={700}>
            {initialData ? "Edit campaign" : "Create campaign"}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            Set up your campaign and start reaching your audience.
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
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
              placeholder="Campaign name"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              error={Boolean(nameError)}
              helperText={nameError || " "}
            />
          </Box>

          <Box mt={1.5}>
            <Typography fontWeight={600} mb={0.75}>
              Draft Date
            </Typography>
            <TextField
              type="date"
              fullWidth
              value={draftDate}
              onChange={(e) => setDraftDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Box mt={1.5}>
            <Typography fontWeight={600} mb={0.75}>
              Campaign Type
            </Typography>
            <RadioGroup
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label={
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        Email
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Send email campaigns to your audience.
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
              />

              <FormControlLabel
                value="sms"
                control={<Radio />}
                label={
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MessageIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        Setup Text Messaging
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Engage users with instant SMS messages.
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
              />

              <FormControlLabel
                value="announcement"
                control={<Radio />}
                label={
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CampaignIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        Announcement
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Share important updates or news.
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
              />
            </RadioGroup>
          </Box>

          <Box mt={1.5}>
            <Typography fontWeight={600} mb={0.75}>
              Campaign Tags
            </Typography>
            <Autocomplete
              multiple
              options={campaignTags}
              value={tags}
              onChange={(_, value) => setTags(value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} key={option} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Select tags" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <DCButton
            variant="contained"
            onClick={handleSubmit}
            sx={{
              px: 2.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {initialData ? "Save changes" : "Create campaign"}
          </DCButton>
          <DCButton
            variant="outlined"
            onClick={() => handleClose()}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </DCButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateCampaignDrawer;
