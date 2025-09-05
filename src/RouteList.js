import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  // BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ContactUs from "./screens/ContactUs";

import ScrollToTop from "./component/ScrollToTop";

import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

import PrivateRoute from "./PrivateRoute";

import AboutUs from "./screens/AboutUs";
import Faq from "./screens/Faq";
import TermCondition from "./screens/TermCondition";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ResetPassword from "./screens/ResetPassword";
import Dashboard from "./screens/Dashboard";
import Campaigns from "./screens/Campaigns";
import Flows from "./screens/Flows";

function RouteList() {
  const theme = useTheme();
  return (
    <BrowserRouter>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
        }}
      >
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route exact path="/campaigns" element={<Campaigns />} />
          <Route exact path="/flows" element={<Flows />} />

          {/*footer routes */}
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/faq" element={<Faq />} />
          <Route exact path="/term-conditions" element={<TermCondition />} />
        </Routes>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default RouteList;
