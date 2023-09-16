import { yellow } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#000",
            outline: "#5A5A5A",
            shade1: yellow[400],
            shade2: yellow[300],
            shade3: yellow[200],
            shade4: yellow[100],
            shade5: yellow[50],
            navbar: "rgba(255,255,255, 0.2)",
          },
          secondary: {
            main: "#FFF",
          },
          text: {
            primary: "#000",
            secondary: "#5A5A5A",
            navbarIconWithoutHover: "hsla(0,0%,0%,.6)",
          },
          shadow: {
            main: "rgba(0,0,0, 0.1)",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#FFF",
            outline: "#F2F2F2",
            shade1: yellow[500],
            shade2: yellow[600],
            shade3: yellow[700],
            shade4: yellow[800],
            shade5: yellow[900],
            navbar: "rgba(0,0,0, 0.2)",
          },
          secondary: { main: "#000" },
          text: {
            primary: "#FFF",
            secondary: "#F2F2F2",
            navbarIconWithoutHover: "hsla(0,0%,100%,.6)",
          },
          shadow: {
            main: "rgba(255,255,255, 0.1)",
          },
        }),
  },
});

export default getDesignTokens;
