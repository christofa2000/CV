
import { createTheme, type ThemeOptions } from '@mui/material/styles';

// Función auxiliar para no repetir código
const createBaseThemeOptions = (options: ThemeOptions): ThemeOptions => ({
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
    },
    components: {
        // INYECTA EL FONDO ANIMADO EN TODOS LOS TEMAS
        MuiCssBaseline: {
            styleOverrides: `
            @keyframes move-stars {
                from { background-position: 0 0; }
                to   { background-position: -10000px 5000px; }
            }

            body {
                background-color: #000;
                background-image: 
                    radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 160px 120px, #ddd, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 50px 200px, #fff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 100px 100px, #fff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 200px 50px, #eee, rgba(0,0,0,0));
                background-repeat: repeat;
                background-size: 250px 250px;
                animation: move-stars 200s linear infinite;
            }
          `,
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(30, 30, 30, 0.75)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: { fontWeight: 500, }
            }
        }
    },
    ...options,
});

// --- Definición de Temas ---

const developerTheme = createTheme(createBaseThemeOptions({
    palette: {
        mode: 'dark',
        primary: { main: '#bb86fc' }, // Morado
        background: { default: 'transparent', paper: 'rgba(30, 30, 30, 0.5)' },
    },
}));

const matrixTheme = createTheme(createBaseThemeOptions({
    palette: {
        mode: 'dark',
        primary: { main: '#00ff00' }, // Verde Matrix
        background: { default: 'transparent', paper: 'rgba(0, 20, 0, 0.5)' },
        text: { primary: '#00ff00' }
    },
    typography: { fontFamily: '"Courier New", Courier, monospace' }
}));

const oceanTheme = createTheme(createBaseThemeOptions({
    palette: {
        mode: 'dark',
        primary: { main: '#00bcd4' }, // Cyan
        background: { default: 'transparent', paper: 'rgba(0, 20, 30, 0.5)' },
    },
}));

const fireTheme = createTheme(createBaseThemeOptions({
    palette: {
        mode: 'dark',
        primary: { main: '#ff4500' }, // Naranja/Rojo Fuego
        background: { default: 'transparent', paper: 'rgba(30, 10, 0, 0.5)' },
    },
}));

export const themes: Record<string, any> = {
    D: developerTheme,
    M: matrixTheme,
    O: oceanTheme,
    F: fireTheme,
};
