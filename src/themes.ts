// src/themes.ts
import { createTheme, type ThemeOptions } from "@mui/material/styles";

// Función auxiliar para no repetir código
const createBaseThemeOptions = (options: ThemeOptions): ThemeOptions => ({
  typography: {
    fontFamily:
      '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    // Dejamos solo lo global necesario (fuente + fondo neutro)
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #000;  /* fondo neutro para el warp */
          background-image: none;  /* quitamos estrellas CSS */
        }
      `,
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundColor: "rgba(30, 30, 30, 0.72)",
          backdropFilter: "blur(8px)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": { transform: "translateY(-5px)" },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
  },
  ...options,
});

// --- Definición de Tema ---
const developerTheme = createTheme(
  createBaseThemeOptions({
    palette: {
      mode: "dark",
      primary: { main: "#bb86fc" },
      background: { default: "transparent", paper: "rgba(30, 30, 30, 0.5)" },
    },
  })
);

// Export igual que antes
export const themes: Record<string, any> = { D: developerTheme };
// (opcional) export default si en algún lugar usás import por default
export default themes;
