import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;
const drawerWidthCollapsed = 76;

/**
 * Sidebar
 * - Visible only when `isLoggedIn` is true
 * - Stays persistent across pages after login
 * - Navigates using react-router-dom v6
 * - Can be constrained between a header/footer via `headerHeight`/`footerHeight`
 * - Notifies layout of current width via CSS var --sidebar-width so content can offset if desired
 */
export default function Sidebar({
  isLoggedIn = true,
  headerHeight = 0, // e.g., AppBar height in px
  footerHeight = 0, // e.g., Footer height in px
  routeMap: routeMapProp,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  // Default routes if none are provided
  const routeMap = useMemo(
    () =>
      routeMapProp || {
        home: "/home",
        campaigns: "/campaigns",
        flows: "/flows",
        forms: "/forms",
        reviews: "/reviews",
        inbox: "/inbox",
        audience: "/audience",
        content: "/content",
        analytics: "/analytics",
      },
    [routeMapProp]
  );

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

  // Determine selected item based on current pathname
  const selectedKey = useMemo(() => {
    const found = Object.entries(routeMap).find(([key, path]) =>
      location.pathname.startsWith(path)
    );
    return found?.[0] ?? "home";
  }, [location.pathname, routeMap]);

  // Expose current width to the layout via CSS variable so the content can offset itself
  useEffect(() => {
    const width = collapsed ? drawerWidthCollapsed : drawerWidth;
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
    return () => {
      // keep last value on unmount; no cleanup
    };
  }, [collapsed]);

  // Respect header/footer by constraining the Drawer paper
  const constrainedPaperSx =
    headerHeight > 0 || footerHeight > 0
      ? {
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight + footerHeight}px)`,
        }
      : {};

  if (!isLoggedIn) return null;

  return (
    <Box sx={{ display: "flex", height: "100%", bgcolor: "#fafafa" }}>
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
            ...constrainedPaperSx,
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
          {nav.map((n) => (
            <ListItem key={n.key} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={selectedKey === n.key}
                onClick={() => {
                  const path = routeMap[n.key] || "/";
                  navigate(path);
                }}
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
                  <Typography component="span" variant="body1" sx={{ lineHeight: 1 }}>
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

      {/* Main content placeholder (kept for layout flex context if needed) */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }} />
    </Box>
  );
}
