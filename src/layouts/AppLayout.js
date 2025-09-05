// src/layouts/AppLayout.jsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Suspense, useEffect } from "react";
import Sidebar from "./Sidebar";

const HEADER_H = 82; // match your AppBar
const FOOTER_H = 56; // match your Footer

export default function AppLayout({ isLoggedIn, routeMap }) {
  useEffect(() => {
    if (!isLoggedIn) {
      // Ensure public pages do not reserve sidebar space
      document.documentElement.style.setProperty("--sidebar-width", "0px");
    }
  }, [isLoggedIn]);

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
            // pl: isLoggedIn ? { sm: "var(--sidebar-width)" } : 0,
            // pt: `${HEADER_H}px`,
            // pb: `${FOOTER_H}px`,
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