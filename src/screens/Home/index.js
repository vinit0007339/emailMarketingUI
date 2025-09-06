import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DCButton from "../../component/DCButton";

export default function Dashboard() {
  const theme = useTheme();

  const Pill = ({ label }) => (
    <Chip
      label={label}
      variant="outlined"
      sx={{
        borderRadius: 2,
        px: { xs: 0.75, sm: 1 },
        height: { xs: 26, sm: 32 },
        fontSize: { xs: 12, sm: 14 },
        borderColor: "divider",
      }}
    />
  );

  const GradientCard = ({ children, ariaLabel }) => (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid transparent",
        background:
          "linear-gradient(#fff,#fff) padding-box, linear-gradient(45deg, rgba(10,132,255,.25), rgba(138,43,226,.25)) border-box",
        boxShadow: "0 10px 40px rgba(0,0,0,.06)",
        transition: "transform .2s ease, box-shadow .2s ease",
        display: "flex",
        flexDirection: "column",
        minHeight: 420,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 60px rgba(0,0,0,.12)",
        },
      }}
      aria-label={ariaLabel}
    >
      {children}
    </Card>
  );

  const ImagePane = ({ emoji }) => (
    <Box
      sx={{
        height: 210,
        bgcolor: "#f2f3f5",
        borderBottom: "1px solid",
        borderColor: "#ebedf0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      {emoji}
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#fbfaf8" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <Box sx={{ mx: "auto", px: { xs: 2, sm: 3 }, py: 4, flexGrow: 1 }}>
            {/* // maxWidth: 1180, */}
            {/* Title */}
            <Typography
              variant="h3"
              fontWeight={800}
              letterSpacing={-0.5}
              gutterBottom
              sx={{ fontSize: { xs: 22, sm: 28, md: 32 }, lineHeight: { xs: 1.25, sm: 1.3 } }}
            >
              Get started with Cyclon Email
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={2} sx={{ fontSize: { xs: 12.5, sm: 14 } }}>
              Use this personalized guide to set up your account and start
              sending.
            </Typography>

            {/* Top pills */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mb={3}>
              <Pill
                label={
                  <>
                    <b>Contacts:</b>&nbsp;I don't have contacts yet
                  </>
                }
              />
              <Pill
                label={
                  <>
                    <b>Channels:</b>&nbsp;Email
                  </>
                }
              />
            </Stack>

            {/* Section title with Recommended chip */}
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Typography variant="h6">
                First, connect your data and start collecting subscribers
              </Typography>
              <Chip
                icon={<StarRoundedIcon sx={{ fontSize: 18 }} />}
                label="Recommended"
                color="primary"
                size="small"
                sx={{
                  fontWeight: 700,
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  "& .MuiChip-icon": {
                    color: theme.palette.primary.contrastText,
                  },
                }}
              />
            </Stack>

            {/* Cards */}
            <Grid container spacing={2}>
              {/* Card 3 */}
              <Grid item xs={12} sm={6} md={4}>
                <GradientCard ariaLabel="Create an email welcome flow">
                  <ImagePane emoji="✉️" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: 16, sm: 18 } }}>
                      Create a campaign
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      About 15 minutes
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: { xs: 12, sm: 13.5 } }}>
                      Send a one-time targeted message to a select group of
                      customers. Use campaigns for sales, promotions, and
                      exclusive deals. Then, track your data here.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <DCButton fullWidth>Create campaign</DCButton>
                  </CardActions>
                </GradientCard>
              </Grid>

              {/* Card 2 */}
              <Grid item xs={12} sm={6} md={4}>
                <GradientCard ariaLabel="Create a sign‑up form">
                  <ImagePane emoji="🧾" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: 16, sm: 18 } }}>
                      Create a sign‑up form
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      About 10 minutes
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: { xs: 12, sm: 13.5 } }}>
                      Create a form on your website to grow your audience and
                      start building customer relationships. Customize it to
                      match your brand and capture essential information.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <DCButton fullWidth>Create Form</DCButton>
                  </CardActions>
                </GradientCard>
              </Grid>

              {/* Card 1 */}
              <Grid item xs={12} sm={6} md={4}>
                <GradientCard ariaLabel="Connect your business platform">
                  <ImagePane emoji="🧩" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: 16, sm: 18 } }}>
                      Create a flow
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      About 15 minutes
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: { xs: 12, sm: 13.5 } }}>
                      Boost sales and increase customer engagement with targeted
                      messages. Select a pre-built template or make your own
                      flow. Then, track your data here.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <DCButton fullWidth>Create Flow</DCButton>
                  </CardActions>
                </GradientCard>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* Business performance summary */}
      <Box sx={{ mx: "auto", px: { xs: 2, sm: 3 }, pb: 4 }}>
        <Card
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: 16, sm: 18 } }}>
                Business performance summary
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, sm: 13 } }}>
                Aug 6, 2025 – Sep 5, 2025
              </Typography>
            </Box>
            {/* <Button
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: 1.5 }}
            >
              View dashboard
            </Button> */}
          </Box>

          {/* Conversion summary */}
          <Grid
            container
            spacing={2}
            sx={{
              borderTop: "1px solid",
              borderBottom: "1px solid",
              borderColor: "divider",
              p: 2,
            }}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: 28, sm: 34 } }}>
                0
              </Typography>
              <Typography variant="body2">Total conversions</Typography>
              <Chip
                label="0% vs. previous period"
                size="small"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: 28, sm: 34 } }}>
                0
              </Typography>
              <Typography variant="body2">
                Attributed conversions (0.00% of total)
              </Typography>
              <Chip
                label="0% vs. previous period"
                size="small"
                sx={{ mt: 1 }}
              />
            </Grid>
          </Grid>

          {/* Attributed conversions breakdown */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Attributed conversions
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: "Conversion rate", value: "0.00%" },
                { label: "Campaigns", value: "0", sub: "0.00%" },
                { label: "Flows", value: "0", sub: "0.00%" },
                { label: "Email", value: "0", sub: "0.00%" },
              ].map((item, idx) => (
                <Grid key={idx} item xs>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: 12, sm: 13 } }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: 13, sm: 14 } }}>{item.value}</Typography>
                    {item.sub && (
                      <Typography variant="caption" color="text.secondary">
                        {item.sub}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Box>
    </>
  );
}
