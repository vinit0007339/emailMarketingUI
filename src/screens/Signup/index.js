import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import "../Signup/sign.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { addData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import * as Yup from "yup";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { useNavigate } from "react-router-dom";
import DCButton from "../../component/DCButton";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment } from "@mui/material";
import { useTheme } from "@emotion/react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    try {
      dispatch(setLoading(true));
      let data = {
        email: values.email,
        password: values.password,
        username: values.username,
        first_name: values.firstName,
        last_name: values.lastName,
      };
      let url = endPoints.api.SIGNUP;
      let response = await addData(url, data);

      dispatch(setLoading(false));
      if (response.data.status == "success") {
        localStorage.setItem("token", response.data.data.access_token);
        dispatch(
          setLoginData({
            user: response.data.data,
            isAuthenticated: true,
          })
        );
        navigate("/home");
      } else {
        showErrorSnackbar(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("signup Error:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="sec-padd form_sec">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 500,
            width: "100%",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Please fill in the form to continue
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              label="First Name"
              placeholder="Enter first name"
              variant="outlined"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              placeholder="Enter last name"
              variant="outlined"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter email"
              variant="outlined"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
            {/* <TextField
              fullWidth
              label="Username"
              placeholder="Enter username"
              variant="outlined"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon
                      sx={{ color: theme.palette.text.secondary }}
                    />
                  </InputAdornment>
                ),
              }}
            /> */}
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <DCButton fullWidth type="submit" sx={{ mt: 1 }}>
              Register
            </DCButton>
          </form>
        </Paper>
      </Box>
    </section>
  );
};

export default Signup;
