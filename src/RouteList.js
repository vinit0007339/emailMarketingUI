import React, { Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

// Public screens
import ContactUs from "./screens/ContactUs";
import AboutUs from "./screens/AboutUs";
import Faq from "./screens/Faq";
import TermCondition from "./screens/TermCondition";
import Home from "./screens/LandingPage"; // marketing/landing page (public)
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ResetPassword from "./screens/ResetPassword";

// Auth and utilities
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "./component/ScrollToTop";

// New layout + dynamic routing sources
import AppLayout from "./layouts/AppLayout";
import routeMap from "./routes/routeMap";
import { componentsByKey } from "./screens";
import { useSelector } from "react-redux";
import LandingPage from "./screens/LandingPage";

/**
 * RouteList
 * - Uses AppLayout which holds Header/Footer/Sidebar and an <Outlet/>
 * - Public routes render without Sidebar (Sidebar hides when not logged in)
 * - Protected app routes are generated from routeMap and wrapped by PrivateRoute
 */
function RouteList() {
  const theme = useTheme();
  // Build protected children from routeMap using the components registry
  const protectedChildren = Object.entries(routeMap).map(([key, path]) => {
    const Comp = componentsByKey[key] || (() => <div>TODO: {key}</div>);
    return <Route key={key} path={path} element={<Comp />} />;
  });
  const authState = useSelector((state) => state.auth);
  const { IsLoginData, isAuthenticated } = authState;
  console.log("isLoginData in RouteList:", isAuthenticated);

  return (
    <BrowserRouter>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
        }}
      >
        {!isAuthenticated && <Header />}
        <ScrollToTop />
        <Routes>
          {/* App shell with Header/Footer/Sidebar and a content <Outlet /> */}
          <Route
            element={
              <AppLayout
                isLoggedIn={isAuthenticated}
                /* isLoggedIn comes from layout/store */ routeMap={routeMap}
              />
            }
          >
            {/* Public routes (no auth required) */}
            {/* <Route index element={<Home />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Footer links (public) */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/term-conditions" element={<TermCondition />} />

            {/* Protected app area: wrap dynamic routes in PrivateRoute */}
            <Route
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              {protectedChildren}
            </Route>

            {/* Catch-all -> dashboard home */}
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Route>
        </Routes>

          {!isAuthenticated && <Footer />}
      </Box>
    </BrowserRouter>
  );
}

export default RouteList;
