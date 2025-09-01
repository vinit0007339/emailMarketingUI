import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import DCButton from "../../component/DCButton";
import { useNavigate } from "react-router-dom";

const RAW_FAQS = [
  {
    id: "secure",
    q: "How secure is the platform?",
    a: "We apply enterprise‑grade encryption, strict access controls, and continuous monitoring to protect your data.",
    category: "Security",
  },
  {
    id: "compliance",
    q: "Do you support global compliance?",
    a: "Yes—features include eIDAS, SOC 2, ISO 27001, and more, along with region‑specific configurations.",
    category: "Compliance",
  },
  {
    id: "trial",
    q: "Can I try it before buying?",
    a: "You can start a free trial and explore templates, workflows, and admin settings in a sandbox environment.",
    category: "Getting Started",
  },
  {
    id: "formats",
    q: "What file formats are supported for uploading?",
    a: "We support common file formats including PDF, DOCX, PNG, and JPEG to ensure seamless document uploads.",
    category: "Uploads",
  },
  {
    id: "size",
    q: "Is there a limit on document size?",
    a: "Uploads are supported up to 25 MB per document. For larger files, compress them before uploading for smoother processing.",
    category: "Uploads",
  },
  {
    id: "multi",
    q: "Can I send documents to multiple recipients?",
    a: "Absolutely! Add multiple signers and set a signing order to manage the workflow efficiently.",
    category: "Workflow",
  },
  {
    id: "track",
    q: "How do I track the status of a document?",
    a: "Use the dashboard for real‑time tracking, email notifications, and detailed audit trails for each step.",
    category: "Workflow",
  },
];

const CATEGORIES = [
  "All",
  "Security",
  "Compliance",
  "Getting Started",
  "Uploads",
  "Workflow",
];

export default function Faq() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RAW_FAQS.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const handleExpand = (panel) => (_e, isExp) =>
    setExpanded(isExp ? panel : null);

  const expandAll = () => setExpanded("__all__");
  const collapseAll = () => setExpanded(null);
  const isOpen = (id) => expanded === "__all__" || expanded === id;

  const copyLink = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#faq-${id}`;
    navigator.clipboard?.writeText(url);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Stack spacing={1} alignItems="flex-start" sx={{ mb: 2 }}>
        <Typography sx={{ color: theme.palette.primary.main }}>FAQ</Typography>
        <Typography variant="h5" fontWeight={700}>
          Questions you might have
        </Typography>
        <div className="w-100 mt-4 mb-4">
          <TextField
            className="input_14"
            fullWidth
            size="medium"
            placeholder="Search questions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="custom_tab">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setCategory(cat)}
                color={category === cat ? "primary" : "default"}
                variant={category === cat ? "filled" : "outlined"}
                sx={{ borderRadius: 999 }}
              />
            ))}
            <Box sx={{ flexGrow: 1 }} />
            {/* <Button onClick={expandAll} variant="text">Expand all</Button>
            <Button onClick={collapseAll} variant="text">Collapse all</Button> */}
          </Stack>
        </div>
      </Stack>

      {/* Controls */}

      <Divider sx={{ mb: 3 }} />

      {/* FAQ List */}
      <Grid container spacing={2}>
        {filteredFaqs.map((item) => (
          <Grid item xs={12} md={6} key={item.id} id={`faq-${item.id}`}>
            <Accordion
              elevation={0}
              disableGutters
              expanded={isOpen(item.id)}
              onChange={handleExpand(item.id)}
              sx={{
                border: 1,
                borderColor: theme.palette.divider,
                borderRadius: 2,
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack spacing={0.5}>
                  <Typography variant="h5" fontWeight={700}>
                    {item.q}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {item.category}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.a}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Tooltip title="Copy link to this question">
                    <IconButton size="small" onClick={() => copyLink(item.id)}>
                      <ContentCopyRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="This was helpful">
                    <IconButton size="small">
                      <ThumbUpOffAltRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="This wasn’t helpful">
                    <IconButton size="small">
                      <ThumbDownOffAltRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}

        {filteredFaqs.length === 0 && (
          <Grid item xs={12}>
            <Box
              sx={{
                border: 1,
                borderColor: theme.palette.divider,
                borderRadius: 2,
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                No results found.
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Try a different keyword or category.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Footer CTA */}
      <Box
        sx={{
          mt: 4,
          p: { xs: 2, md: 3 },
          border: 1,
          borderColor: theme.palette.divider,
          borderRadius: 2,
          background: theme.palette.background.default,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Stack sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              Still need help?
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Reach out and we’ll get back within one business day.
            </Typography>
          </Stack>
          <DCButton
            startIcon={<MailOutlineRoundedIcon />}
            variant="contained"
            onClick={() => navigate("/contact-us")}
          >
            Contact support
          </DCButton>
        </Stack>
      </Box>
    </Container>
  );
}
