import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { Box, Grid, Paper, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, updateAddData } from "../../Utility/API";
import DCButton from "../../component/DCButton";
import DCHeading from "../../component/DCHeading";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";


const Profile = () => {
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const globalState = useSelector((state) => state.global);
  const { loading } = globalState;
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();

  // State to hold profile data
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    company: "",
  });

  useEffect(() => {
    const { email, first_name, last_name } = IsLoginData.user;
    setProfileData((prev) => ({
      ...prev,
      firstName: first_name || "",
      lastName: last_name || "",
      email: email || "",
      jobTitle: IsLoginData.user.title || "",
      company: IsLoginData.user.company || "",
    }));
  }, [IsLoginData]);

  // Handlers for updating profile in two parts
  const handleUpdateName = async () => {
    try {
      dispatch(setLoading(true));
      const data = {
        first_name: profileData?.firstName,
        last_name: profileData?.lastName,
      };

      const response = await updateAddData(
        `${endPoints.api.UPDATE_USER_INFO}/${IsLoginData?.user?.id}`,
        data
      );
      dispatch(setLoading(false));
      if (response.data.success) {
        showSuccessSnackbar("Name updated successfully");
        getByUserId();
        setConfirmOpen(false);
      } else {
        showErrorSnackbar(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Update Name Error:", error);
      dispatch(setLoading(false));
    }
  };

  const handleUpdateJob = async () => {
    try {
      dispatch(setLoading(true));
      const data = {
        company: profileData.company,
        title: profileData.jobTitle,
      };

      const response = await updateAddData(
        `${endPoints.api.UPDATE_USER_INFO}/${IsLoginData?.user?.id}`,
        data
      );
      dispatch(setLoading(false));
      if (response.data.success) {
        showSuccessSnackbar("Job info updated successfully");
        getByUserId();
      } else {
        showErrorSnackbar(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Update Job Error:", error);
      dispatch(setLoading(false));
    }
  };

  const getByUserId = async () => {
    try {
      let response = await getAllData(
        `${endPoints.api.UPDATE_USER_INFO}/${IsLoginData?.user?.id}`
      );
      dispatch(setLoading(false));
      if (response.status == "success") {
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
      dispatch(setLoading(false));
    }
  };
  const theme = useTheme();

  return (
    <Box>
      <DCHeading title={"Profile"} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Left: Basic Info (First & Last Name) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmOpen(true);
                // handleUpdateName();
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    disabled
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
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
                    disabled
                    label="Last Name"
                    variant="outlined"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
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
                {/* comment this update name in the first phase */}
                {/* <Grid item xs={12}>
                  <DCButton type="submit" fullWidth>
                    Update Name
                  </DCButton>
                </Grid> */}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Right: Professional Info (Company & Title) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {/* <Typography variant="h6" gutterBottom>
              Professional Info
            </Typography> */}
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateJob();
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    variant="outlined"
                    value={profileData.jobTitle}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        jobTitle: e.target.value,
                      })
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    variant="outlined"
                    value={profileData.company}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: e.target.value,
                      })
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
                  <DCButton
                    type="submit"
                 
                    fullWidth
                  >
                    Update Job
                  </DCButton>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default Profile;
