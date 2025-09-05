import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 240;
const drawerWidthCollapsed = 76;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const nav = useMemo(
    () => [
      { key: "home", label: "Home", emoji: "🏠" },
      { key: "campaigns", label: "Campaigns", emoji: "🎯" },
      { key: "flows", label: "Flows", emoji: "🔁" },
      { key: "forms", label: "Sign‑up forms", emoji: "📝" },
      { key: "reviews", label: "Reviews", emoji: "⭐" },
      { key: "inbox", label: "Inbox", emoji: "📥" },
      { key: "audience", label: "Audience", emoji: "👥" },
      { key: "content", label: "Content", emoji: "🧩" },
      { key: "analytics", label: "Analytics", emoji: "📊" },
    ],
    []
  );

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fafafa" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant={isSmUp ? "permanent" : "temporary"}
        open={!collapsed}
        onClose={() => setCollapsed(true)}
        sx={{
          width: collapsed ? drawerWidthCollapsed : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? drawerWidthCollapsed : drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#fff",
            borderRight: "1px solid #e9e9ee",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pt: 2,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
          },
        }}
        PaperProps={{ elevation: 1 }}
        aria-label="Primary"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            mb: 1,
            fontWeight: 700,
            fontSize: 18,
            userSelect: "none",
          }}
          aria-label="App brand"
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 2,
              background: "linear-gradient(135deg, #0a84ff, #8a2be2)",
            }}
          />
          {!collapsed && <Typography noWrap>emailMarketingUI</Typography>}
        </Box>
        <IconButton
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          sx={{
            mx: 1,
            mb: 1,
            borderRadius: 2,
            border: "1px solid #e9e9ee",
            height: 40,
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(0,0,0,.06)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 18px 60px rgba(0,0,0,.12)",
              bgcolor: "#fff",
            },
            transition: "transform 0.15s ease",
          }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <List
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: 1,
          }}
        >
          {nav.map((n, i) => (
            <ListItem key={n.key} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={i === 0}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.25,
                  color: "text.primary",
                  "&.Mui-selected": {
                    background:
                      "linear-gradient(#fff,#fff) padding-box, linear-gradient(45deg, rgba(10,132,255,.25), rgba(138,43,226,.25)) border-box",
                    border: "1px solid transparent",
                  },
                  "&:hover": {
                    backgroundColor: "#f5f7fb",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? "auto" : 1.5,
                    justifyContent: "center",
                    fontSize: 18,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ lineHeight: 1 }}
                  >
                    {n.emoji}
                  </Typography>
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={n.label}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <AppBar
          position="sticky"
          elevation={1}
          sx={{
            bgcolor: "#fff",
            borderBottom: "1px solid #e9e9ee",
            height: 60,
            justifyContent: "center",
          }}
        >
          <Toolbar
            sx={{ px: 2, display: "flex", justifyContent: "space-between" }}
          >
            <Box
              component="form"
              role="search"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#f3f4f6",
                borderRadius: 2,
                border: "1px solid #eef0f3",
                px: 1.5,
                minWidth: 220,
              }}
              noValidate
              autoComplete="off"
            >
              <SearchIcon color="action" />
              <TextField
                variant="standard"
                placeholder="Search"
                aria-label="Search"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 14, bgcolor: "transparent", px: 0, py: 0.5 },
                }}
                sx={{ width: "100%" }}
                size="small"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Chip
                label={collapsed ? "➡️ Sidebar" : "⬅️ Sidebar"}
                onClick={() => setCollapsed((v) => !v)}
                clickable
                sx={{ fontWeight: 600 }}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                icon={collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              />
              <Chip
                label="Account"
                icon={<AccountCircleIcon />}
                sx={{ fontWeight: 600 }}
                title="Account"
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Container */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2, sm: 2, md: 2 },
            py: 4,
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            letterSpacing={-0.5}
            gutterBottom
          >
            Get started with emailMarketingUI
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Use this personalized guide to set up your account and start
            sending.
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            <Chip
              label={
                <>
                  <b>Contacts:</b> I don’t have contacts yet
                </>
              }
              variant="outlined"
            />
            <Chip
              label={
                <>
                  <b>Channels:</b> Email, SMS, and Push
                </>
              }
              variant="outlined"
            />
            <Chip label="✅ Recommended" color="success" />
          </Box>

          <Typography variant="h6" mb={2} sx={{ mt: 2 }}>
            First, connect your data and start collecting subscribers
          </Typography>

          <Grid container spacing={2}>
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 10px 40px rgba(0,0,0,.06)",
                  border: "1px solid transparent",
                  background:
                    "linear-gradient(#fff,#fff) padding-box, linear-gradient(45deg, rgba(10,132,255,.25), rgba(138,43,226,.25)) border-box",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 60px rgba(0,0,0,.12)",
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
                aria-label="Connect your business platform"
              >
                <Box
                  sx={{
                    height: 210,
                    background:
                      "radial-gradient(120px 120px at 20% 30%, #eef6ff, transparent), radial-gradient(140px 140px at 80% 70%, #f1e9ff, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  🧩
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Connect your business platform
                  </Typography>
                  <Typography color="text.secondary">
                    Connect your website platform to access your data and enable
                    publishing sign‑up forms and flows.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      height: 42,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #0a84ff, #8a2be2)",
                      boxShadow: "0 10px 40px rgba(0,0,0,.06)",
                      fontWeight: 600,
                      "&:active": {
                        transform: "translateY(1px)",
                      },
                    }}
                  >
                    Connect platform
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Card 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 10px 40px rgba(0,0,0,.06)",
                  border: "1px solid transparent",
                  background:
                    "linear-gradient(#fff,#fff) padding-box, linear-gradient(45deg, rgba(10,132,255,.25), rgba(138,43,226,.25)) border-box",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 60px rgba(0,0,0,.12)",
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
                aria-label="Create a sign‑up form"
              >
                <Box
                  sx={{
                    height: 210,
                    background:
                      "radial-gradient(120px 120px at 20% 30%, #eef6ff, transparent), radial-gradient(140px 140px at 80% 70%, #f1e9ff, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  🧾
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Create a sign‑up form
                  </Typography>
                  <Typography color="text.secondary">
                    Create a form on your website to grow your audience and
                    start building customer relationships.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      height: 42,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #0a84ff, #8a2be2)",
                      boxShadow: "0 10px 40px rgba(0,0,0,.06)",
                      fontWeight: 600,
                      "&:active": {
                        transform: "translateY(1px)",
                      },
                    }}
                  >
                    Create form
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Card 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 10px 40px rgba(0,0,0,.06)",
                  border: "1px solid transparent",
                  background:
                    "linear-gradient(#fff,#fff) padding-box, linear-gradient(45deg, rgba(10,132,255,.25), rgba(138,43,226,.25)) border-box",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 60px rgba(0,0,0,.12)",
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
                aria-label="Create an email welcome flow"
              >
                <Box
                  sx={{
                    height: 210,
                    background:
                      "radial-gradient(120px 120px at 20% 30%, #eef6ff, transparent), radial-gradient(140px 140px at 80% 70%, #f1e9ff, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  ✉️
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Create an email welcome flow
                  </Typography>
                  <Typography color="text.secondary">
                    Build a flow that automatically sends a welcome message to
                    new subscribers of your brand.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      height: 42,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #0a84ff, #8a2be2)",
                      boxShadow: "0 10px 40px rgba(0,0,0,.06)",
                      fontWeight: 600,
                      "&:active": {
                        transform: "translateY(1px)",
                      },
                    }}
                  >
                    Create flow
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
