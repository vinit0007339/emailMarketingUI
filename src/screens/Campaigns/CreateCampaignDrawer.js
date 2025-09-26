import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import CampaignIcon from "@mui/icons-material/Campaign"; // Example for 3rd option
import { addData } from "../../Utility/API"; // Adjust the path if needed
import dayjs from "dayjs";
import { endPoints } from "../../constant/Environment";
import { useSnackbarContext } from "../../component/SnackbarContext";

const campaignTags = [
  "Newsletter",
  "Promotion",
  "Product Launch",
  "Seasonal",
  "Event",
];

const CreateCampaignDrawer = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [tags, setTags] = useState([]);
  const [campaignType, setCampaignType] = useState("email");
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      channel: 1,
      type: 1,
      date: draftDate ? new Date(draftDate).toISOString() : null,
    };
    try {
      let response = await addData(endPoints.api.CREATE_CAMPAIGN, payload);
        console.log("Campaign:", response);
      if (response.data.status == "success") {
        onSubmit({ name, draftDate, tags });
        setName("");
        setDraftDate(null);
        setTags([]);
        onClose();
        showSuccessSnackbar("Campaign created successfully!");
      }else{
        showErrorSnackbar("Failed to create campaign. Please try again.");
      }
    
    } catch (error) {
      // handle error if needed
      console.error(error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: "30vw", maxWidth: 420 } },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Create Campaign
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          {/* Date Picker */}
          <TextField
            label="Draft Date"
            type="date"
            value={draftDate}
            onChange={(e) => setDraftDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* Type Selector */}
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
            Campaign Type
          </Typography>
          <RadioGroup
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
          >
            {/* Email Option */}
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

            {/* Text Messaging Option */}
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

            {/* Third Option */}
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

          {/* Dropdown Title */}
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
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

          <Box sx={{ flexGrow: 1 }} />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CreateCampaignDrawer;
