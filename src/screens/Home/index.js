import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  Paper,
  Chip,
  Card,
  CardContent,
  Avatar,
  Divider,
  Link as MUILink,
  Tabs,
  Tab,
  Slider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import TimelineIcon from "@mui/icons-material/Timeline";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import BrushIcon from "@mui/icons-material/Brush";

const Pill = ({ children }) => (
  <Chip
    label={children}
    variant="outlined"
    sx={{
      px: 1.5,
      py: 0.5,
      borderRadius: 999,
      fontWeight: 600,
      bgcolor: (t) => t.palette.background.paper,
      borderColor: (t) =>
        t.palette.mode === "dark" ? t.palette.grey[800] : t.palette.grey[200],
    }}
  />
);

const Stat = ({ value, label }) => (
  <Stack spacing={0.5} alignItems="center">
    <Typography variant="h4" fontWeight={800}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Stack>
);

const FeatureCard = ({ title, desc, badge }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: "100%",
      borderRadius: 4,
      background: (theme) =>
        `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}) padding-box,
         linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light}) border-box`,
      border: "1px solid transparent",
      transition: "transform .2s ease, box-shadow .2s ease",
      boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Stack spacing={1.5}>
      {badge ? (
        <Chip
          size="small"
          color="primary"
          label={badge}
          sx={{ width: "fit-content" }}
        />
      ) : null}
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {desc}
      </Typography>
    </Stack>
  </Paper>
);

const Testimonial = ({ quote, name, role }) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      borderRadius: 4,
      p: 1,
      background: (t) =>
        `linear-gradient(${t.palette.background.paper}, ${t.palette.background.paper}) padding-box,
         linear-gradient(120deg, ${t.palette.success.light}, ${t.palette.info.light}) border-box`,
      border: "1px solid transparent",
    }}
  >
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="center" mb={1.5}>
        <Avatar sx={{ fontWeight: 700 }}>★</Avatar>
        <Typography variant="subtitle1" fontWeight={700}>
          {name}
        </Typography>
      </Stack>
      <Typography variant="body1" mb={1.5}>
        “{quote}”
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {role}
      </Typography>
    </CardContent>
  </Card>
);

const FeatureRow = ({ icon, title, desc }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.5, sm: 2 },
      borderRadius: 3,
      bgcolor: (t) =>
        t.palette.mode === "dark"
          ? t.palette.grey[900]
          : t.palette.background.paper,
      border: (t) => `1px solid ${t.palette.divider}`,
      transition: "transform .2s ease, box-shadow .2s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          width: { xs: 36, sm: 44 },

          height: { xs: 36, sm: 44 },
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          background: (t) =>
            `linear-gradient(${t.palette.background.paper}, ${t.palette.background.paper}) padding-box,` +
            `linear-gradient(135deg, ${t.palette.primary.light}, ${t.palette.success.light}) border-box`,
          border: "1px solid transparent",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Stack spacing={0.5}>
        <Typography
          variant="subtitle1"
          fontWeight={800}
          sx={{ letterSpacing: 0.3, fontSize: { xs: 14, sm: 16 } }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: 13, sm: 14 } }}
        >
          {desc}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

const AiAssistSection = () => {
  const Bullet = ({ icon, title, desc }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          bgcolor: (t) =>
            t.palette.mode === "dark"
              ? "rgba(46, 125, 50, 0.2)"
              : "rgba(76, 175, 80, 0.15)",
          border: (t) => `1px solid ${t.palette.success.light}`,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Stack spacing={0.5}>
        <Typography
          variant="subtitle1"
          fontWeight={800}
          sx={{ letterSpacing: 0.3 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {desc}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        height: "100%",
        p: 3,
        border: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Typography
            variant="h5"
            fontWeight={900}
            sx={{ letterSpacing: -0.5 }}
          >
            AI Assist is like having a co‑pilot for your marketing campaigns.
          </Typography>

          <Stack spacing={2.5}>
            <Bullet
              icon={<IntegrationInstructionsIcon fontSize="small" />}
              title={
                <>
                  Find new opportunities<span>: </span>
                </>
              }
              desc={
                "Discover untapped audiences, strategies, and automation paths to scale your marketing—faster."
              }
            />

            <Bullet
              icon={<SendIcon fontSize="small" />}
              title={
                <>
                  Strengthen every interaction<span>: </span>
                </>
              }
              desc={
                "Get AI‑driven recommendations that optimize messaging, enhance clarity, and ensure your brand voice stays authentic."
              }
            />

            <Bullet
              icon={<ChatBubbleOutlineIcon fontSize="small" />}
              title={
                <>
                  Prove your impact with confidence<span>: </span>
                </>
              }
              desc={
                "Use insights to fine‑tune campaigns and maximize engagement. Showcase your results with clear, data‑backed reports."
              }
            />
            {/* add more Bullet components as needed  please add two more  component */}
            <Bullet
              icon={<EmailIcon fontSize="small" />}
              title={
                <>
                  Craft compelling emails<span>: </span>
                </>
              }
              desc={
                "Generate engaging email content that resonates with your audience and drives conversions using AI."
              }
            />
            {/* <Bullet
              icon={<SmsIcon fontSize="small" />}
              title={ <>
                  Optimize SMS campaigns<span>: </span>   
                </>}
              desc={
                "Leverage AI to create personalized SMS messages that boost open rates and customer engagement."
              }
            /> */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          // pt: { xs: 10, md: 14 },
          // pb: { xs: 8, md: 12 },
          pt: { xs: 8, md: 14 },
          pb: { xs: 6, md: 12 },
          background: (t) =>
            t.palette.mode === "dark"
              ? `radial-gradient(1200px 600px at 20% -10%, ${t.palette.primary.dark}22, transparent 60%),
                 radial-gradient(1000px 500px at 90% 10%, ${t.palette.secondary.dark}22, transparent 60%)`
              : `radial-gradient(1200px 600px at 20% -10%, ${t.palette.primary.light}33, transparent 60%),
                 radial-gradient(1000px 500px at 90% 10%, ${t.palette.secondary.light}33, transparent 60%)`,
        }}
      >
        <Container>
          <Stack spacing={3} alignItems={{ xs: "stretch", md: "center" }}>
            <Stack spacing={1.5} alignItems={{ xs: "stretch", md: "center" }}>
              <Pill>AI‑powered marketing platform</Pill>
              <Typography
                variant="h2"
                fontWeight={900}
                textAlign={{ xs: "left", md: "center" }}
                sx={{
                  letterSpacing: -0.5,
                  fontSize: { xs: 30, sm: 36, md: 48 },
                  lineHeight: { xs: 1.2, sm: 1.25, md: 1.3 },
                }}
              >
                Turn customer data into growth
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign={{ xs: "left", md: "center" }}
                sx={{ fontSize: { xs: 14.5, sm: 16.5, md: 18 } }}
                maxWidth={800}
              >
                Build smarter email & SMS journeys, segment with precision, and
                activate campaigns that feel personal—at scale.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={{ md: "center" }}
              sx={{ width: "100%" }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Get started
              </Button>
              {/* <Button
                size="large"
                variant="outlined"
                onClick={() => navigate("/demo")}
              >
                Book a demo
              </Button> */}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* FEATURE GRID */}
      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={4}>
            <FeatureCard
              badge="Journeys"
              title="Automate lifecycle touchpoints"
              desc="Drag‑and‑drop flows for welcome, win‑back, and post‑purchase with branches, A/B tests, and AI text suggestions."
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <FeatureCard
              badge="Segmentation"
              title="Use real‑time customer data"
              desc="Build cohorts with events, attributes, and predictive scores. Sync audiences to ads with one click."
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <FeatureCard
              badge="Messaging"
              title="Email & SMS that convert"
              desc="Beautiful templates, smart send times, and deliverability tooling baked in."
            />
          </Grid>
        </Grid>
      </Container>

      {/* DATA + ACTIVATION SECTION */}
      <Box
        sx={{
          background: (t) =>
            t.palette.mode === "dark"
              ? `radial-gradient(900px 400px at 15% 0%, ${t.palette.primary.dark}22, transparent 60%), radial-gradient(900px 400px at 95% 20%, ${t.palette.secondary.dark}22, transparent 60%)`
              : `radial-gradient(900px 400px at 15% 0%, ${t.palette.primary.light}33, transparent 60%), radial-gradient(900px 400px at 95% 20%, ${t.palette.secondary.light}33, transparent 60%)`,
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={7} lg={7}>
              <Stack spacing={2} sx={{ height: "100%" }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{ letterSpacing: -0.5 }}
                >
                  Reinvent customer conversations
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Orchestrate, personalize, and measure every message from one
                  place. With the right data in motion, each interaction feels
                  timely, relevant, and human.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FeatureRow
                      icon={<IntegrationInstructionsIcon />}
                      title="Data & Connections"
                      desc="Ingest first‑party events and attributes from your stack and route them anywhere."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FeatureRow
                      icon={<TimelineIcon />}
                      title="Journeys"
                      desc="Automated paths with branches, tests, and smart timing."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FeatureRow
                      icon={<AutoGraphIcon />}
                      title="Insights & Analytics"
                      desc="AI‑assisted reporting to learn faster and optimize."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FeatureRow
                      icon={<BrushIcon />}
                      title="Creative tools"
                      desc="On‑brand templates and quick edits your team will love."
                    />
                  </Grid>
                </Grid>

                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="flex-start"
                  >
                    <BoltIcon />
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle2" fontWeight={800}>
                        Faster from idea to send
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Draft with AI, auto‑segment with scores, and ship with
                        confidence using built‑in checks.
                      </Typography>
                      <List dense sx={{ pt: 0 }}>
                        {[
                          "AI subject lines",
                          "Smart send times",
                          "Link validation",
                        ].map((t) => (
                          <ListItem key={t} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 26 }}>
                              <CheckCircleIcon
                                fontSize="small"
                                color="success"
                              />
                            </ListItemIcon>
                            <Typography variant="body2">{t}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5} lg={5}>
              <AiAssistSection />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIALS */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Testimonial
              quote="Our welcome flow revenue doubled in 30 days."
              name="Nova Beauty"
              role="DTC Lead"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Testimonial
              quote="Segmentation feels instant—even with millions of profiles."
              name="FreshCart"
              role="CRM Manager"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Testimonial
              quote="Designing emails is finally fun for the team."
              name="Acme Co."
              role="Marketing Director"
            />
          </Grid>
        </Grid>
      </Container>

      {/* FINAL CTA */}
      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            textAlign: "center",
            background: (t) =>
              `linear-gradient(${t.palette.background.paper}, ${t.palette.background.paper}) padding-box,
               linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main}) border-box`,
            border: "1px solid transparent",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4" fontWeight={900}>
              Build relationships your customers love
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={700}>
              Start free, then scale with transparent pricing. No credit card
              required.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/signup")}
              >
                Create account
              </Button>
              <Button
                size="large"
                variant="outlined"
                // onClick={() => navigate("/pricing")}
              >
                See pricing
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default Home;
