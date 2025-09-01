import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Container,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import CylonLogoNew from "./../../images/NewLogo.png";
import {
  Facebook,
  Work,
  GitHub,
  Send,
  Info,
  KeyboardArrowUp,
} from "@mui/icons-material";
import DCButton from "../DCButton";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.secondary,
        // color: theme.palette.text.primary,
        pt: 6,
        pb: 4,
      }}
      className="footer_Web"
    >
      <Container maxWidth="lg">
        {/* <Grid container spacing={4} alignItems="flex-start">
          
          <Grid item xs={12} md={12}>
            <Grid container spacing={4} justifyContent="space-between">
              <Grid item xs={12} sm={6} md={5}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: "1.50rem",
                    color: theme.palette.text.default,
                  }}
                >
                  Use Cases
                </Typography>
                {[
                  "Web-designers",
                  "Marketers",
                  "Small Business",
                  "Website Builder",
                ].map((text) => (
                  <Typography
                    variant="body2"
                    key={text}
                    sx={{ my: 0.5, fontSize: "1rem", mb: 1 }}
                  >
                    <Link
                      href="#"
                      underline="hover"
                      sx={{
                        color: theme.palette.text.default,
                        display: "inline-block",
                        transition: "transform .15s ease, color .15s ease",
                        "&:hover": {
                          transform: "translateX(2px)",
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {text}
                    </Link>
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={12} sm={6} md={5}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: "1.50rem",
                    color: theme.palette.text.default,
                  }}
                >
                  Company
                </Typography>
                {[
                  { label: "About Us", path: "/about-us" },
                  { label: "FAQs", path: "/faq" },
                  { label: "Privacy Policy", path: "/term-conditions" },
                  { label: "Contact Us", path: "/contact-us" },
                ].map(({ label, path }) => (
                  <Typography
                    variant="body2"
                    key={label}
                    onClick={() => navigate(path)}
                    sx={{ my: 0.5, fontSize: "1rem", mb: 1, cursor: "pointer" }}
                  >
                    <Link
                      underline="hover"
                      sx={{
                        color: theme.palette.text.default,
                        transition: "transform .15s ease, color .15s ease",
                        display: "inline-block",
                        "&:hover": {
                          transform: "translateX(2px)",
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {label}
                    </Link>
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
      
        </Grid> */}
        <Grid container spacing={4} sx={{ width: "100%" }}>
          {/* Brand + Tagline + Social */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src={CylonLogoNew}
                alt="Brand"
                sx={{ height: 36 }}
              />
              {/* <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.default }}>DocuSign UI</Typography> */}
            </Box>
            <Typography
              variant="body2"
              sx={{ mt: 1.25, color: theme.palette.text.default }}
            >
              Streamline agreements with fast e‑sign, smart fields, and a clean,
              responsive UI.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, mb: 1, color: theme.palette.text.default }}
            >
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "About Us", path: "/about-us" },
                { label: "FAQs", path: "/faq" },
                { label: "Privacy Policy", path: "/term-conditions" },
                { label: "Contact Us", path: "/contact-us" },
              ].map(({ label, path }) => (
                <Typography
                  variant="body2"
                  key={label}
                  onClick={() => navigate(path)}
                  sx={{ fontSize: "1rem", mb: 1, cursor: "pointer" }}
                >
                  <Link
                    underline="hover"
                    sx={{
                      color: theme.palette.text.default,
                      transition: "transform .15s ease, color .15s ease",
                      display: "inline-block",
                      "&:hover": {
                        transform: "translateX(2px)",
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {label}
                  </Link>
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, mb: 1, color: theme.palette.text.default }}
            >
              Use Cases
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "Web-designers", path: "/web-designers" },
                { label: "Marketers", path: "/marketers" },
                { label: "Small Business", path: "/small-business" },
                { label: "Website Builder", path: "/website-builder" },
              ].map(({ label, path }) => (
                <Typography
                  variant="body2"
                  key={label}
                  onClick={() => navigate(path)}
                  sx={{ fontSize: "1rem", mb: 1, cursor: "pointer" }}
                >
                  <Link
                    underline="hover"
                    sx={{
                      color: theme.palette.text.default,
                      transition: "transform .15s ease, color .15s ease",
                      display: "inline-block",
                      "&:hover": {
                        transform: "translateX(2px)",
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {label}
                  </Link>
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: theme.palette.divider, my: 3 }} />

        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          className="last_footer"
        >
          <Grid item xs={12} md="auto">
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.default }}
            >
              © {new Date().getFullYear()} All Rights Reserved
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            <Box display="flex" gap={2} flexWrap="wrap">
              {[
                "Privacy Policy",
                "Terms of Use",
                "Sales and Refunds",
                "Legal",
                "Site Map",
              ].map((text) => (
                <Link
                  href="#"
                  key={text}
                  sx={{ color: theme.palette.text.default }}
                  underline="hover"
                  variant="body2"
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md="auto">
            <Tooltip title="Back to top">
              <IconButton
                aria-label="back to top"
                onClick={scrollToTop}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff" ,
                  "&:hover": { bgcolor: "primary.main", color: "#fff" },
                }}
              >
                <KeyboardArrowUp />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
