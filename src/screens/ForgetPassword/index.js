import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DCButton from "../../component/DCButton";
import { useDispatch } from "react-redux";
import { endPoints } from "../../constant/Environment";
import { addData } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";
import Loader from "../../component/Loader";

const ForgetPassword = ({ open, onClose }) => {
  const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    handleResetPassword();
    // call the api here
    //   onClose();
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      let data = {
        email: email,
      };

      let response = await addData(`${endPoints.api.FORGET_PASSWORD}`, data);
      setLoading(false);
      console.log("Forget Password Response:", response);
      if (response.data.status == "success") {
        showSuccessSnackbar(response.data.message);
        onClose();
      } else {
        showErrorSnackbar(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                Reset your password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your email and we’ll send you a reset link.
              </Typography>
            </Box>
          </Stack>
          <IconButton aria-label="Close" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Loader loading={loading} />
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={Boolean(error)}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon fontSize="medium" />
                </InputAdornment>
              ),
            }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="flex-end"
          >
            <DCButton onClick={onClose} variant="text" color="inherit">
              Cancel
            </DCButton>
            <DCButton onClick={handleSubmit}>Send reset link</DCButton>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ForgetPassword;
