import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const TermCondition = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        py: { xs: 4, md: 6 },
      }}
      className="content_only"
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h3">Terms & Conditions</Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Last updated: August 10, 2025
          </Typography>
          <Typography variant="body1">
            These Terms govern your access to and use of our website, products,
            and services for digital signatures, document upload, and agreement
            workflows (the “Services”). By using the Services, you agree to
            these Terms.
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3} component="section">
          <Box>
            <Typography variant="h5" fontWeight={700}>
              1. Scope & Acceptance
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              By accessing the Services, you accept these Terms on behalf of
              yourself or the organization you represent. If a separate written
              agreement exists between you and us, that agreement will govern to
              the extent of any conflict.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              2. Eligibility & Accounts
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              You must be legally able to form a contract and you are
              responsible for maintaining the confidentiality of your
              credentials and for all activity that occurs under your account.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              3. Acceptable Use
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Do not misuse the Services (including uploading illegal content,
              distributing malware, attempting to bypass security, or infringing
              others’ rights). We may suspend or terminate access for
              violations.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              4. Electronic Signatures & Records
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Our Services enable electronic signatures and electronic records.
              You are responsible for the content, accuracy, retention, and
              legality of documents you send or sign, and for complying with
              applicable e‑signature and record‑keeping laws.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              5. Uploads & Ownership
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              You retain ownership of documents and data you upload ("Customer
              Data"). You grant us a limited right to process Customer Data
              solely to provide and support the Services, consistent with our
              privacy and security commitments.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              6. Privacy & Data Protection
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              We handle personal data in accordance with our Privacy Policy and
              applicable law. Where required, data‑processing terms may apply.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              7. Security
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              We implement administrative, technical, and physical safeguards
              designed to protect the Services and Customer Data. No security is
              absolute; secure your devices and access.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              8. Third‑Party Services
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Integrations you enable may exchange data with third parties.
              Their terms and privacy policies govern those services and we are
              not responsible for third‑party actions.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              9. Fees & Taxes
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              If you purchase paid plans, you agree to pay applicable fees and
              taxes. Plans may auto‑renew unless you cancel as described at
              checkout.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              10. Intellectual Property
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              We and our licensors own the Services and related IP. Except for
              the rights expressly granted to you, no license or ownership is
              transferred.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              11. Beta & Pre‑Release Features
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Beta features are for evaluation, may change or end at any time,
              and are provided “as is.” Use is at your discretion.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              12. Warranties & Disclaimers
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Except as expressly stated, the Services are provided “as is” and
              “as available,” without warranties of any kind, to the fullest
              extent permitted by law.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              13. Your Indemnification
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              You will defend and indemnify us from claims arising out of your
              documents, your use of the Services, or your breach of these
              Terms.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              14. Limitation of Liability
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              To the maximum extent allowed by law, neither party will be liable
              for indirect, incidental, special, consequential, or punitive
              damages. Our total liability will not exceed the amounts paid by
              you for the Services during the 12 months before the event giving
              rise to liability.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              15. Suspension & Termination
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              We may suspend or terminate the Services for non‑payment, security
              risk, or breach. You may stop using the Services at any time.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              16. Governing Law & Disputes
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              These Terms are governed by the laws of your principal place of
              business, without regard to conflict‑of‑laws rules. Courts located
              there have exclusive jurisdiction, unless applicable law requires
              otherwise.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              17. Service Availability
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              We aim to provide continuous availability of the Services but do
              not guarantee uninterrupted or error-free operation. Scheduled
              maintenance or unforeseen outages may occur.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              18. Communication & Notices
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              We may send you important updates, notices, and communications
              electronically, including through email or via the Services
              interface. You are responsible for keeping your contact
              information current.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              19. Compliance with Laws
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              You agree to comply with all applicable local, state, national,
              and international laws and regulations in connection with your use
              of the Services.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              20. Force Majeure
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Neither party will be liable for failure or delay in performance
              caused by events beyond reasonable control, including natural
              disasters, acts of government, labor disputes, internet or
              telecommunications failures, or cyberattacks.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              21. Severability
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions will remain in full force
              and effect.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              22. Entire Agreement
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              These Terms constitute the entire agreement between you and us
              regarding the Services and supersede all prior or contemporaneous
              agreements, understandings, and representations.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default TermCondition;
