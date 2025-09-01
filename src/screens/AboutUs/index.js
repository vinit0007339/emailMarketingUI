import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DCButton from "../../component/DCButton";
import { useNavigate } from "react-router-dom";

const ValueCard = ({ icon, title, body }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: 1,
        borderColor: theme.palette.divider,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={1.5}>
          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>{icon}</Avatar>
          <Typography variant="h5" fontWeight={700}>
            {title}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AboutUs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          bgcolor: theme.palette.background.secondary,
          color: theme.palette.text.default,
          py: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="overline" sx={{ letterSpacing: 1.6 }}>
                ABOUT US
              </Typography>
              <Typography variant="h3" fontWeight={800} mt={1} mb={2}>
                We help organizations agree and move forward faster
              </Typography>
              <Typography variant="h4" sx={{ opacity: 0.9 }}>
                Build trusted, secure, and efficient agreement workflows—from
                eSignature to contract lifecycle—powered by a platform used
                worldwide.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={4}>
                <DCButton>Learn more</DCButton>
                <DCButton variant="outlined" color="inherit" onClick={()=>navigate('/contact-us')}>
                  Contact sales
                </DCButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="260"
                  image="https://picsum.photos/seed/hero-agreement/1200/800"
                  alt="Platform preview"
                />
                <IconButton
                  aria-label="play video"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: theme.palette.common.white,
                  }}
                >
                  <PlayCircleOutlineRoundedIcon />
                </IconButton>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{}}>
              OUR MISSION
            </Typography>
            <Typography variant="h4" fontWeight={800} mt={1} mb={2}>
              Make agreement workflows smarter, safer, and simpler
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We reduce friction from the world’s agreements so people and
              businesses can keep going. From secure identity verification to
              compliant eSignatures and powerful CLM, we deliver end‑to‑end
              solutions.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3}>
              <DCButton fullWidth>Read our story</DCButton>
              <DCButton fullWidth>See products</DCButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="320"
                image="https://picsum.photos/seed/mission/1200/800"
                alt="Teams collaborating"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Values */}
      <Box sx={{ bgcolor: theme.palette.background.default }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          {/* <Typography
            variant="overline"
            sx={{ color: theme.palette.primary.main }}
          >
            OUR VALUES
          </Typography> */}
          <Typography variant="h6">OUR VALUES</Typography>
          <Typography variant="h4" fontWeight={800} mt={1} mb={4}>
            What we stand for
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  transition: "transform .2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ValueCard
                  icon={<VerifiedRoundedIcon />}
                  title="Trust & Compliance"
                  body="Security, privacy, and compliance are at the core of everything we build so you can send and sign with confidence."
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  transition: "transform .2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ValueCard
                  icon={<SecurityRoundedIcon />}
                  title="Security First"
                  body="Enterprise‑grade protections, certifications, and continuous monitoring safeguard your agreements."
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  transition: "transform .2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ValueCard
                  icon={<BoltRoundedIcon />}
                  title="Innovation"
                  body="We continuously improve the agreement experience with modern, intuitive products and AI‑powered workflows."
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  transition: "transform .2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ValueCard
                  icon={<PublicRoundedIcon />}
                  title="Global Scale"
                  body="Solutions that work wherever you do, localized for users around the world."
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  transition: "transform .2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ValueCard
                  icon={<VolunteerActivismRoundedIcon />}
                  title="Impact"
                  body="Reducing paper waste and enabling remote work helps organizations operate sustainably."
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  transition: "transform .2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ValueCard
                  icon={<BusinessCenterRoundedIcon />}
                  title="Customer Success"
                  body="We partner with customers to realize value fast and scale confidently."
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider />

      {/* Gallery */}

      {/* CTA */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" fontWeight={800}>
                Ready to modernize your agreements?
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                Try it free or talk to our team to see how our platform fits
                your workflows.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ md: "flex-end" }}
              >
                <DCButton variant="contained" color="secondary" onClick={()=>navigate('/signup')}>
                  Start free trial
                </DCButton>
                <DCButton variant="outlined" color="inherit" onClick={()=>navigate('/contact-us')}>
                  Talk to sales
                </DCButton>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;
