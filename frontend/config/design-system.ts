export const designSystem = {
  colors: {
    primary: "#84CC16",
    primaryHover: "#65A30D",

    secondary: "#0F172A",
    secondaryHover: "#1E293B",

    background: "#FFFFFF",
    surface: "#F8FAFC",

    border: "#E2E8F0",

    text: {
      primary: "#0F172A",
      secondary: "#475569",
      muted: "#94A3B8",
    },

    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",
  },

  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    section: "6rem",
  },

  container: {
    maxWidth: "1280px",
  },

  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
} as const;
