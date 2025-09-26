import {
  Box,
  ButtonBase,
  Paper,
  Stack,
  Typography,
  Divider,
  IconButton
} from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

/**
 * Empty state for List Details
 * Props allow parent to wire actions:
 * - onCreateSignupForm
 * - onSetupSubscribePage
 * - onUploadContacts
 * - onQuickAdd
 */
const MemberEmptyScreen = ({
  onCreateSignupForm,
  onSetupSubscribePage,
  onUploadContacts,
  onQuickAdd,
}) => {
  const Card = ({ icon, label, onClick }) => (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <ButtonBase
        onClick={onClick}
        sx={{
          width: "100%",
          textAlign: "left",
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.100",
            }}
          >
            {icon}
          </Box>
          <Typography variant="body1" fontSize={16}>
            {label}
          </Typography>
        </Stack>
        <ChevronRightRoundedIcon />
      </ButtonBase>
    </Paper>
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 420,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: 4,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 640 }}>
        {/* Title & Subtitle (match screenshot sizes) */}
        <Typography
          variant="h5"
          fontWeight={700}
          align="center"
          fontSize={20}
        >
          There isn&apos;t anyone in this list
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          mt={1}
          fontSize={16}
        >
          How would you like to add contacts?
        </Typography>

        <Stack spacing={1.5} mt={3}>
          <Card
            icon={<TuneRoundedIcon />}
            label="Create a sign-up form"
            onClick={onCreateSignupForm}
          />
          <Card
            icon={<ArticleOutlinedIcon />}
            label="Set up subscribe page"
            onClick={onSetupSubscribePage}
          />
          <Card
            icon={<UploadRoundedIcon />}
            label="Upload contacts"
            onClick={onUploadContacts}
          />
          <Card
            icon={<AddCircleOutlineRoundedIcon />}
            label="Quick add"
            onClick={onQuickAdd}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default MemberEmptyScreen;
