import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/material";

const EmptyCampaign = () => {
  return (
    <Box sx={{ bgcolor: "#fbfaf8", minHeight: "100vh" }}>
      <Box
        sx={{
          maxWidth: 1180,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, sm: 6 },
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left column: Headline, copy, CTAs */}
          <Grid item xs={12} md={12}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 28, sm: 36, md: 44 },
                fontWeight: 800,
                letterSpacing: -0.5,
                mb: 2,
              }}
            >
              Send your first email campaign
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 28, sm: 36, md: 44 },
                fontWeight: 800,
                letterSpacing: -0.5,
                mb: 2,
              }}
            >
              using data‑driven best practices
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: 13, sm: 14 }, maxWidth: 520, mb: 3 }}
            >
              Spend less time creating and more time connecting with your
              customers. We’ll guide you through making an impactful campaign
              that converts.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: "#111",
                  "&:hover": { bgcolor: "#000" },
                }}
              >
                Guide me through my first campaign
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Build your own
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmptyCampaign;
