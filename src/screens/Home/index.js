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

export default function Dashboard() {
  const theme = useTheme();

  const Pill = ({ label }) => (
    <Chip
      label={label}
      variant="outlined"
      sx={{
        borderRadius: 2,
        px: 1,
        height: 32,
        fontSize: 14,
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
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 18px 60px rgba(0,0,0,.12)'
        }
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

  const ActionButton = ({ children }) => (
    <Button
      variant="contained"
      fullWidth
      sx={{
        height: 44,
        borderRadius: 1.5,
        fontWeight: 700,
        backgroundColor: "#111",
        textTransform: "none",
        '&:hover': { backgroundColor: "#000" },
      }}
    >
      {children}
    </Button>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fbfaf8" }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Box sx={{ mx: "auto", px: { xs: 2, sm: 3 }, py: 4, flexGrow: 1 }}> 
          {/* // maxWidth: 1180, */}
          {/* Title */}
          <Typography variant="h3" fontWeight={800} letterSpacing={-0.5} gutterBottom>
            Get started with Cyclon Email
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            Use this personalized guide to set up your account and start sending.
          </Typography>

          {/* Top pills */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mb={3}>
            <Pill label={<><b>Contacts:</b>&nbsp;I don't have contacts yet</>} />
            <Pill label={<><b>Channels:</b>&nbsp;Email</>} />
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
              sx={{ fontWeight: 700, bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText, '& .MuiChip-icon': { color: theme.palette.primary.contrastText } }}
            />
          </Stack>

          {/* Cards */}
          <Grid container spacing={2}>
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <GradientCard ariaLabel="Connect your business platform">
                <ImagePane emoji="🧩" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Connect your business platform
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    About 15 minutes
                  </Typography>
                  <Typography color="text.secondary">
                    Connect your website platform to access your data and enable publishing sign‑up forms and flows.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <ActionButton>Connect platform</ActionButton>
                </CardActions>
              </GradientCard>
            </Grid>

            {/* Card 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <GradientCard ariaLabel="Create a sign‑up form">
                <ImagePane emoji="🧾" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Create a sign‑up form
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    About 10 minutes
                  </Typography>
                  <Typography color="text.secondary">
                    Create a form on your website to grow your audience and start building customer relationships.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <ActionButton>Create form</ActionButton>
                </CardActions>
              </GradientCard>
            </Grid>

            {/* Card 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <GradientCard ariaLabel="Create an email welcome flow">
                <ImagePane emoji="✉️" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Create an email welcome flow
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    About 15 minutes
                  </Typography>
                  <Typography color="text.secondary">
                    Create a flow that automatically sends a welcome message to new subscribers of your brand.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <ActionButton>Create flow</ActionButton>
                </CardActions>
              </GradientCard>
            </Grid>
          </Grid>
        </Box>
        {/* add below  this  */}
      </Box>
    </Box>
  );
}
