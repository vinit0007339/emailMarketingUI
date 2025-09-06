import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, updateAddData } from "../../Utility/API";
import DCButton from "../../component/DCButton";
import DCHeading from "../../component/DCHeading";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    company: "",
  });

  // keep a pristine copy for reset
  const [initialData, setInitialData] = useState(profileData);

  useEffect(() => {
    const { email, first_name, last_name, title, company } =
      IsLoginData?.user || {};
    const next = {
      firstName: first_name || "",
      lastName: last_name || "",
      email: email || "",
      jobTitle: title || "",
      company: company || "",
    };
    setProfileData(next);
    setInitialData(next);
  }, [IsLoginData]);

  const initials = useMemo(() => {
    const a = profileData.firstName?.[0] || "";
    const b = profileData.lastName?.[0] || "";
    return (a + b).toUpperCase() || "U";
  }, [profileData.firstName, profileData.lastName]);

  const fullName = useMemo(() => {
    return [profileData.firstName, profileData.lastName]
      .filter(Boolean)
      .join(" ");
  }, [profileData.firstName, profileData.lastName]);

  const handleSaveProfile = async () => {
    try {
      dispatch(setLoading(true));
      const data = {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        title: profileData.jobTitle,
        company: profileData.company,
      };
      const response = await updateAddData(
        `${endPoints.api.UPDATE_USER_INFO}/${IsLoginData?.user?.id}`,
        data
      );
      if (response?.data?.success) {
        showSuccessSnackbar("Profile updated successfully");
        await getByUserId();
        setInitialData(profileData);
      } else {
        showErrorSnackbar(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      showErrorSnackbar("Unable to update profile");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getByUserId = async () => {
    try {
      const response = await getAllData(
        `${endPoints.api.UPDATE_USER_INFO}/${IsLoginData?.user?.id}`
      );
      if (response.status === "success") {
        dispatch(
          setLoginData({
            user: response.data,
            isAuthenticated: true,
          })
        );
        localStorage.setItem("token", response.data.access_token);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3 } }}>
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(#fff,#fff) padding-box, linear-gradient(45deg, rgba(10,132,255,.15), rgba(138,43,226,.15)) border-box",
        }}
      >
        {/* Header: Avatar + Name + Email */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Avatar sx={{ width: 64, height: 64, fontSize: 24 }}>
            {initials}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ fontSize: { xs: 18, sm: 20 } }}
              noWrap
            >
              {fullName || "Your name"}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {profileData.email}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Unified form */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveProfile();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <PersonIcon
                      sx={{ mr: 1, color: theme.palette.text.secondary }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <PersonIcon
                      sx={{ mr: 1, color: theme.palette.text.secondary }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                variant="outlined"
                value={profileData.jobTitle}
                onChange={(e) =>
                  setProfileData({ ...profileData, jobTitle: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <WorkIcon
                      sx={{ mr: 1, color: theme.palette.text.secondary }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                variant="outlined"
                value={profileData.company}
                onChange={(e) =>
                  setProfileData({ ...profileData, company: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <BusinessIcon
                      sx={{ mr: 1, color: theme.palette.text.secondary }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                disabled
                value={profileData.email}
                InputProps={{
                  startAdornment: (
                    <EmailIcon
                      sx={{ mr: 1, color: theme.palette.text.secondary }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <DCButton type="submit" fullWidth>
                  Save changes
                </DCButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
