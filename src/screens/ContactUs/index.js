import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import { addData } from "../../Utility/API";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import DCButton from "../../component/DCButton";

// Validation schema
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed.")
    .min(10, "Mobile number should be of minimum 10 digits.")
    .max(10, "Mobile number should be of maximum 10 digits.")
    .required("Mobile is required."),
  budget: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

const ContactUs = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      budget: "",
      userType: "agent",
      beds: "",
      baths: "",
      propertyType: "condo",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // const url = `${endPoints.api.EMAIL_SUPPORT}`;
      // const data = {
      //   fullName: `${values.firstName} ${values.lastName}`,
      //   email: values.email,
      //   subject: values.budget,
      //   description: values.message,
      //   propertyType: values.propertyType,
      //   userType: values.userType,
      //   budget: values.budget,
      //   beds: values.beds,
      //   baths: values.baths,
      //   phone: values.mobile,
      // };
      // dispatch(setLoading(true));
      // await addData(url, data)
      //   .then((response) => {
      //     dispatch(setLoading(false));
      //     if (response.data.status === "success") {
      //       showSuccessSnackbar("Thanks! We’ll be in touch within 1 business day.");
      //       resetForm();
      //     } else {
      //       showErrorSnackbar(response.data.message);
      //     }
      //   })
      //   .catch((error) => {
      //     dispatch(setLoading(false));
      //     console.error(error);
      //   });
    },
  });

  return (
    <>
      <Helmet>
        <title>Contact Us — Modern eSignature & Document Workflows</title>
      </Helmet>

      {/* Hero Intro */}
      <Box sx={{ bgcolor: theme.palette.background.secondary,color: theme.palette.text.default,  py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" sx={{ letterSpacing: 1.4,  }}>
                CONTACT US
              </Typography>
              <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 1 }}>
                Talk to our team about secure digital signatures
              </Typography>
              <Typography variant="subtitle1" sx={{  }}>
                We build agreement experiences that feel effortless: send, sign, and track documents securely with
                audit trails, identity checks, and real‑time status. Tell us a bit about your needs—we’ll tailor the
                right workflow for you.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ borderRadius: 2, border: 1, borderColor: theme.palette.divider }}>
                <CardContent>
                  <Stack spacing={1.25}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <PlaceRoundedIcon />
                      <Typography variant="body2">455 N Cityfront Plaza Dr, Suite 3100, Chicago, IL 60611</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <PlaceRoundedIcon />
                      <Typography variant="body2">20 N Clark St, Suite 3400, Chicago, IL 60602</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <EmailRoundedIcon />
                      <Link to="mailto:info@cylontechnology.com">
                        <Typography variant="body2">info@cylontechnology.com</Typography>
                      </Link>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <PhoneRoundedIcon />
                      <Typography variant="body2">+1 585‑705‑8498</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <ScheduleRoundedIcon />
                      <Typography variant="body2">Mon–Fri · 9:00–18:00 CT</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Left: Pitch + Trust */}
          <Grid item xs={12} md={5}>
            <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.divider, borderRadius: 2 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <DescriptionRoundedIcon />
                    <Typography variant="h6" fontWeight={700}>Why reach out?</Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    • Set up eSignatures, templates, and signer flows.<br/>
                    • Automate reminders and approvals.<br/>
                    • Ensure security, compliance, and auditability.<br/>
                    • Get pricing and implementation guidance.
                  </Typography>
                  <Alert icon={<LockRoundedIcon />} severity="info" variant="outlined" sx={{fontSize:'1rem'}}>
                    We never sell your data. Submissions are protected with encryption and governed by our privacy policy.
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right: Form */}
          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.divider, borderRadius: 2 }}>
              <CardContent>
                <form onSubmit={formik.handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First name"
                        placeholder="John"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        placeholder="Doe"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Work email"
                        placeholder="you@company.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailRoundedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        placeholder="10‑digit number"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneRoundedIcon />
                            </InputAdornment>
                          ),
                          inputMode: 'numeric',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="budget"
                        name="budget"
                        label="Subject"
                        placeholder="Tell us how we can help"
                        value={formik.values.budget}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.budget && Boolean(formik.errors.budget)}
                        helperText={formik.touched.budget && formik.errors.budget}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        id="message"
                        name="message"
                        label="Your message"
                        placeholder="Share details about your agreement workflow, number of signers, integrations, or compliance needs."
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}>
                        <DCButton type="submit" variant="contained" endIcon={<SendRoundedIcon />}>Submit</DCButton>
                        {/* <Tooltip title="We typically respond within one business day.">
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            By submitting, you agree to be contacted about our products and services.
                          </Typography>
                        </Tooltip> */}
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bottom note */}
        {/* <Divider sx={{ my: 4 }} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Prefer email? Reach us at
          </Typography>
          <Link to="mailto:info@cylontechnology.com">
            <Typography variant="body2">info@cylontechnology.com</Typography>
          </Link>
        </Stack> */}
      </Container>
    </>
  );
};

export default ContactUs;
