import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    primary: { main: "#000000 ", contrastText: "#ffffff" },
    secondary: { main: "#ffffff", contrastText: "#000000 " },
  },
  typography: {
    fontFamily: "Open Sans",
    fontSize: 14,
    h1: { fontSize: 25 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `a { color: #ffffff; }`,
    },
    MuiButton: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          border: 0,
          "&:hover": {
            color: "#D2B356",
            border: "#fff",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          fieldset: {
            borderColor: "#D2B356",
            "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#D2B356",
        },
      },
    },

    MuiTouchRipple: {
      styleOverrides: {
        root: {
          color: "#D2B356",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.9em",
          fieldset: {
            borderColor: "#D2B356",
          },
          input: {
            height: "0.8em",
          },
        },
      },
    },

    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderWidth: "1px"
    //     }
    //   }
    // },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.8em",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});
