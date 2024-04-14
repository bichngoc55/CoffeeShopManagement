export const colorTokens = {
    primary: {
    100: "#d4d4d4",
    200: "#aaaaaa",
    300: "#7f7f7f",
    400: "#555555",
    500: "#2a2a2a",
    600: "#222222",
    700: "#191919",
    800: "#111111",
    900: "#080808",
  },
  grey: {
    0:"#ffffff",
    10: "#F8F8F8",
    100: "#d7d7d7",
    200: "#aeaeae",
    300: "#868686",
    400: "#5d5d5d",
    500: "#353535",
    600: "#2a2a2a",
    700: "#202020",
    800: "#151515",
    900: "#0b0b0b",
  },
  orange: {
    100: "#f9e2d5",
    200: "#f3c5aa",
    300: "#eca980",
    400: "#e68c55",
    500: "#e06f2b",
    600: "#b35922",
    700: "#86431a",
    800: "#5a2c11",
    900: "#2d1609",
  },
};
// mui theme settings
export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
            }),
      },
      
    };
  };