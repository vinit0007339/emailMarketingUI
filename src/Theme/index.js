import { createTheme } from "@mui/material/styles";

// Color palettes with full variants
const commonColors = {
  primary: {
    // light: "#66B2B2", // light teal
    // main: "#008080", // teal
    // dark: "#004D4D", // dark teal
    light: "#4DB6AC", // light teal (lighter version of #009689)
    main: "#009688", // teal for all the buttons // SIR COLOR 009688
    dark: "#00675B", // dark teal (darker version of #009689)
    contrastText: "#FFFFFF",
  },
  secondary: {
    light: "#FF8A80", // coral pink
    main: "#FF5252", // red coral  // for the secondary buttins
    dark: "#C50E29", // deep rose
    contrastText: "#FFFFFF",
  },
  success: {
    light: "#66E2C4",
    main: "#00C49A",
    dark: "#00987A",
    contrastText: "#fff",
  },
  warning: {
    light: "#FFD54F",
    main: "#FFC107",
    dark: "#FFA000",
    contrastText: "#000",
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      card: "#F3E5AB",
      default: "#ffffff", // bg for all pages
      paper: "#FFFFFF", // use for card , header , footer
      primary: "#009689", // this is for avavtr //009688
      secondary: "#45556c", // this is for all the section footer.  /// SIR COLOR 263238. // my color code 45556c
    },

    text: {
      default: "#ffffff", // optional
      primary: "#111827", // ✅ darker color ensures label is visible even when not focused
      secondary: "#000000", // optional
    },
    ...commonColors,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      primary: "#009689",
      secondary: "#45556c",
      card: "#2F4F4F", // use for aall the card
      default: "#ffffff", // bg for all pages
      paper: "#ffffff", // use for all the popups
    },
    text: {
      default: "#FFFFFF",
      primary: "#2F4F4F",

      secondary: "#FFFFFF",
    },

    ...commonColors,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});
