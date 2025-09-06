import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CylonLogoNew from "./../../images/NewLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import DCButton from "../DCButton";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, IsLoginData } = authState;

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 320 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2 }}>
        {!isAuthenticated ? (
          <Box sx={{ display: "grid", gap: 1.5 }}>
            <DCButton onClick={() => navigate("/login")} variant="outlined">
              Login
            </DCButton>
            <DCButton onClick={() => navigate("/signup")} variant="outlined">
              Sign Up
            </DCButton>
          </Box>
        ) : (
          <>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.background.primary,
                  fontWeight: 600,
                }}
              >
                {IsLoginData?.user?.first_name?.[0]?.toUpperCase() ?? ""}
                {IsLoginData?.user?.last_name?.[0]?.toUpperCase() ?? ""}
              </Avatar>
              <Box>
                <Typography fontWeight={700}>
                  {IsLoginData?.user?.first_name} {IsLoginData?.user?.last_name}
                </Typography>
                <Typography variant="body2">
                  {IsLoginData?.user?.email}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 1, mt: 2, textTransform: "none" }}
              onClick={() => {
                navigate("/profile");
              }}
            >
              Manage Profile
            </Button>

            <MenuItem
              className="menu_2"
              onClick={() => {
                navigate("/user-signature");
              }}
            >
              User Signature
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            <MenuItem className="menu_2">Feedback</MenuItem>

            <MenuItem
              className="menu_2"
              onClick={() => {
                dispatch(setLoginData({ user: {}, isAuthenticated: false }));
                localStorage.setItem("token", "");
                navigate("/home");
              }}
            >
              Log Out
            </MenuItem>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="default"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="img"
          src={CylonLogoNew}
          alt="logo"
          sx={{ height: 80, cursor: "pointer" }}
          onClick={() => (isAuthenticated ? navigate("/home") : navigate("/"))}
        />
        {isMobile ? (
          <>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  bgcolor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  "& .MuiSvgIcon-root": { color: "text.primary" },
                  "& .MuiListItemIcon-root": { color: "text.primary" },
                },
              }}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", gap: 2 }}>
              {!isAuthenticated ? (
                <>
                  <DCButton
                    onClick={() => navigate("/login")}
                    variant="outlined"
                  >
                    Login
                  </DCButton>
                  <DCButton
                    onClick={() => navigate("/signup")}
                    variant="outlined"
                  >
                    Sign Up
                  </DCButton>
                </>
              ) : (
                <>
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.background.primary,
                        fontWeight: 600,
                      }}
                    >
                      {IsLoginData?.user?.first_name?.[0]?.toUpperCase() ?? ""}
                      {IsLoginData?.user?.last_name?.[0]?.toUpperCase() ?? ""}
                    </Avatar>
                  </IconButton>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: { mt: 1, p: 2, minWidth: 240, borderRadius: 2 },
                    }}
                  >
                    <Typography fontWeight={700}>
                      {IsLoginData?.user?.first_name}{" "}
                      {IsLoginData?.user?.last_name}
                    </Typography>
                    <Typography variant="body2">
                      {IsLoginData.user?.email}
                    </Typography>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1, mt: 2, textTransform: "none" }}
                      onClick={() => {
                        handleMenuClose();
                        navigate("/profile");
                      }}
                    >
                      Manage Profile
                    </Button>

                    <Divider sx={{ my: 1 }} />

                    <MenuItem className="menu_2" onClick={handleMenuClose}>
                      Feedback
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        dispatch(
                          setLoginData({ user: {}, isAuthenticated: false })
                        );
                        localStorage.setItem("token", "");
                        navigate("/home");
                      }}
                      className="menu_2"
                    >
                      Log Out
                    </MenuItem>
                  </Popover>
                </>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
