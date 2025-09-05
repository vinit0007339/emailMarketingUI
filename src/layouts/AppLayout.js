// src/layouts/AppLayout.jsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../screens/Sidebar";
import { Suspense } from "react";

const HEADER_H = 64; // match your AppBar
const FOOTER_H = 56; // match your Footer

export default function AppLayout({ isLoggedIn, routeMap }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Your <AppBar /> goes here */}
      <Box sx={{ flex: 1, display: "flex", position: "relative" }}>
        <Sidebar
          isLoggedIn={isLoggedIn}
          headerHeight={HEADER_H}
          footerHeight={FOOTER_H}
          routeMap={routeMap}
        />
        <Box
          component="main"
          sx={{
            flex: 1,
            pl: { sm: "var(--sidebar-width)" },
            pt: `${HEADER_H}px`,
            pb: `${FOOTER_H}px`,
            minWidth: 0,
          }}
        >
          <Suspense fallback={<div>Loading…</div>}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
      {/* Your <Footer /> goes here */}
    </Box>
  );
}