import { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Login/login.css";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DCButton from "../../component/DCButton";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { addData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";

const ResetPassword = () => {
  const theme = useTheme();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  const validationSchema = Yup.object({
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      handlePasswordReset(values);
    },
  });

  const handlePasswordReset = async (values) => {
    try {
      dispatch(setLoading(true));
      let data = {
        token: token,
        new_password: values.newPassword,
      };

      let response = await addData(`${endPoints.api.RESET_PASSWORD}`, data);
      dispatch(setLoading(false));
      console.log('response',response)
      if (response.data.status == "success") {
        console.log("Password reset successful");
        showSuccessSnackbar(response.data.message);
        navigate("/login");
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
              Reset Your Password
            </Typography>

            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                label="New Password"
                placeholder="Enter new password"
                variant="outlined"
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                placeholder="Re-enter new password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <DCButton type="submit" fullWidth>
                Reset Password
              </DCButton>
            </form>
          </Paper>
        </Box>
      </Container>
    </section>
  );
};

export default ResetPassword;
