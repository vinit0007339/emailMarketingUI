import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useState } from "react";
import DCButton from "../../../../component/DCButton";
import Loader from "../../../../component/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addData } from "../../../../Utility/API";
import { endPoints } from "../../../../constant/Environment";
import { useSnackbarContext } from "../../../../component/SnackbarContext";
import { useLocation } from "react-router-dom";

export default function CreateMember({ addMember, onClose }) {
  const [loading, setLoading] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const dispatch = useDispatch();
  const location = useLocation();
  const list_id = new URLSearchParams(location.search).get("id");
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    consent: Yup.boolean(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    title: Yup.string(),
    organization: Yup.string(),
    phone: Yup.string().matches(
      /^[0-9]{10}$/,
      "Enter a valid 10-digit phone number"
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      consent: false,
      firstName: "",
      lastName: "",
      title: "",
      organization: "",
      phone: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        handleMember(values);
      } catch (e) {
        setLoading(false);
      }
    },
  });

  const handleMember = async (values) => {
    try {
      setLoading(true);
      let data = {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        // title: values.title,
        // organization: values.organization,
      };

      let response = await addData(
        endPoints.api.LIST_IN_CONTACT(list_id),
        data
      );
      setLoading(false);
      if (response.data.status == "success") {
        showSuccessSnackbar("Contact Added Successfully");
         formik.resetForm()
        onClose(true);
      } else {
        showErrorSnackbar(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={addMember}
      onClose={() => {
        onClose();
      }}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pr: 7 }}>
        <Typography
          variant="h5"
          component="span"
          sx={{ fontWeight: 800, display: "block", fontSize: 20 }}
        >
          Quick add
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
          }}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <DialogContent
          dividers
          sx={{
            pt: 2,
            maxHeight: { xs: "60vh", md: "70vh" },
            overflowY: "auto",
          }}
        >
          <Loader loading={loading || formik.isSubmitting} />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            placeholder=""
            margin="dense"
            type="email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={(formik.touched.email && formik.errors.email) || " "}
          />

          {/* Consent */}
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.consent}
                  onChange={(e) =>
                    formik.setFieldValue("consent", e.target.checked)
                  }
                />
              }
              sx={{ alignItems: "flex-start" }}
              label={
                <Typography variant="body1" fontSize={16} sx={{ mt: 1 }}>
                  Profile has granted explicit consent to receive email
                  marketing.
                </Typography>
              }
            />
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize={14}
              sx={{ ml: 4.5 }}
            >
              This will subscribe the profile to email marketing without sending
              a confirmation email. Profiles that have unsubscribed will be
              resubscribed.{" "}
              {/* <Link href="#" underline="hover">
                Learn more about explicit consent.
              </Link> */}
            </Typography>
          </Box>

          {/* First / Last Name */}
          <Box mt={2}>
            <TextField
              fullWidth
              label="First Name"
              margin="dense"
              {...formik.getFieldProps("firstName")}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={
                (formik.touched.firstName && formik.errors.firstName) || " "
              }
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="dense"
              {...formik.getFieldProps("lastName")}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={
                (formik.touched.lastName && formik.errors.lastName) || " "
              }
            />
          </Box>

          {/* Title */}
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            {...formik.getFieldProps("title")}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={(formik.touched.title && formik.errors.title) || " "}
          />

          {/* Organization */}
          <TextField
            fullWidth
            label="Organization"
            margin="dense"
            {...formik.getFieldProps("organization")}
            error={
              formik.touched.organization && Boolean(formik.errors.organization)
            }
            helperText={
              (formik.touched.organization && formik.errors.organization) || " "
            }
          />

          {/* Phone */}
          <TextField
            fullWidth
            label="Phone Number"
            margin="dense"
            {...formik.getFieldProps("phone")}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={(formik.touched.phone && formik.errors.phone) || " "}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <DCButton
            variant="contained"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting || loading}
            sx={{
              bgcolor: "#111",
              "&:hover": { bgcolor: "#000" },
              px: 2.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add profile
          </DCButton>
          <DCButton
            variant="outlined"
            onClick={() => {
              onClose();
            }}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </DCButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
