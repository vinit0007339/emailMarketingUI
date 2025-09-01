import {
  Box,
  Container,
  Typography,
  TextField,
  Paper,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Login/login.css";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { addData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { useTheme } from "@mui/material/styles";
import DCButton from "../../component/DCButton";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import ForgetPassword from "../ForgetPassword";

const Login = () => {
  const theme = useTheme();
  const [forgetModal, setForgetModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleContinue = (formData) => {
    console.log("User data:", formData);
    // formData = { agree: true, name: "...", email: "...", password: "..." }
    // You can send this to your API or handle it however you need
    setOpen(false); // close the modal
  };

  // console.log("them", theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const handleLogin = async (values) => {
    try {
      dispatch(setLoading(true));
      let data = {
        email: values.email,
        password: values.password,
      };

      let response = await addData(`${endPoints.api.LOGIN_ENDPOINT}`, data);
      dispatch(setLoading(false));
      if (response.data.status == "success") {
        dispatch(
          setLoginData({
            user: response.data.data,
            isAuthenticated: true,
          })
        );
        localStorage.setItem("token", response.data.data.access_token);
        navigate("/home");
      } else {
        showErrorSnackbar(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="sec-padd form_sec">
      <ForgetPassword
        open={forgetModal}
        onClose={() => setForgetModal(false)}
      />
      <Container>
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
              sx={{ mb: 2 }}
            >
              Log In
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Enter your credentials to continue
            </Typography>

            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Email"
                placeholder="Enter your email"
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
              <TextField
                fullWidth
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
              />

              <DCButton type="submit" fullWidth>
                Log in
              </DCButton>
            </form>
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 1 }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => setForgetModal(true)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Link>
            </Box>
            <DCButton
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{
                mt: 3,
              }}
              onClick={() => {
                navigate("/signup");
                // setOpen(true);
              }}
            >
              Sign Up for Free
            </DCButton>
          </Paper>
        </Box>
      </Container>
    </section>
  );
};

export default Login;
