import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fafafa" }}>
      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
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
