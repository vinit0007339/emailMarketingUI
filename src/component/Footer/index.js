import {
  KeyboardArrowUp
} from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CylonLogoNew from "./../../images/NewLogo.png";

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
            </Box>
            <Typography
              variant="body2"
              sx={{ mt: 1.25, color: theme.palette.text.default }}
            >
              Streamline agreements with fast e‑sign, smart fields, and a clean,
              responsive UI.
            </Typography>
            <Grid item xs={12} md="auto">
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.default }}
              >
                © {new Date().getFullYear()} All Rights Reserved
              </Typography>
            </Grid>
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

          <Grid item xs={12} md="auto">
            <Tooltip title="Back to top">
              <IconButton
                aria-label="back to top"
                onClick={scrollToTop}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
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
