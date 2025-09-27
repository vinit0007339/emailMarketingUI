import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import {
  EmojiEmotions as EmojiIcon,
  Person as PersonIcon,
  Mail as MailIcon,
} from "@mui/icons-material";

const EmailMessageSection = () => {
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [senderName, setSenderName] = useState("Crescent Homes");
  const [senderEmail, setSenderEmail] = useState("nitin@crescenthomes.ca");
  const [useAsReplyTo, setUseAsReplyTo] = useState(true);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handlePreviewTextChange = (event) => {
    setPreviewText(event.target.value);
  };

  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
  };

  const handleSenderEmailChange = (event) => {
    setSenderEmail(event.target.value);
  };

  const handleReplyToChange = (event) => {
    setUseAsReplyTo(event.target.checked);
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <MailIcon sx={{ color: "primary.main" }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Email message
          </Typography>
        </Box>
      </Box>

      {/* Form Fields */}
      <Box sx={{ flex: 1 }}>
        <Stack spacing={3}>
          {/* Subject Line */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Subject line *
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter subject line"
              value={subject}
              onChange={handleSubjectChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end">
                      <EmojiIcon />
                    </IconButton>
                    <IconButton size="small" edge="end">
                      <PersonIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Preview Text */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Preview text
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter preview text"
              value={previewText}
              onChange={handlePreviewTextChange}
              multiline
              rows={2}
            />
          </Box>

          {/* Sender Name */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Sender name *
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter sender name"
              value={senderName}
              onChange={handleSenderNameChange}
            />
          </Box>

          {/* Sender Email */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Sender email *
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter sender email"
              value={senderEmail}
              onChange={handleSenderEmailChange}
              type="email"
            />
          </Box>

          {/* Use as Reply-to Checkbox */}
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useAsReplyTo}
                  onChange={handleReplyToChange}
                  color="primary"
                />
              }
              label="Use as reply-to"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default EmailMessageSection;
