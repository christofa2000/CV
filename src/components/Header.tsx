
import { Avatar, Box, Button, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import { useThemeSwitcher } from "../ThemeContext";

const navItems = [
    { text: 'Sobre Mí', href: '#about-me' },
    { text: 'Habilidades', href: '#skills' },
    { text: 'Proyectos', href: '#projects' },
    { text: 'Contacto', href: '#contact' },
];

const themeOptions = [
    { key: 'D', label: 'Developer' },
    { key: 'M', label: 'Matrix' },
    { key: 'O', label: 'Ocean' },
    { key: 'F', label: 'Fire' },
];

const Header = () => {
    const { setTheme } = useThemeSwitcher();

    return (
        <Box component="header" sx={{ position: 'relative', textAlign: 'center', my: 4 }}>
            {/* Theme Switcher */}
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                <Stack direction="row" spacing={1}>
                    {themeOptions.map(opt => (
                        <Tooltip title={opt.label} key={opt.key}>
                            <IconButton onClick={() => setTheme(opt.key)} size="small">
                                <Typography sx={{ width: 24, height: 24, border: '1px solid', borderColor: 'primary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {opt.key}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    ))}
                </Stack>
            </Box>

            <Avatar
                alt="Christian Oscar Papa"
                src="/Fotocv.png"
                sx={{ width: 120, height: 120, margin: 'auto', mb: 2, border: '3px solid', borderColor: 'primary.main' }}
            />
            <Typography variant="h4" component="h1">
                Christian Oscar Papa
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Desarrollador Frontend especializado en React + TypeScript
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
                {navItems.map((item) => (
                    <Button key={item.text} href={item.href} color="primary">
                        {item.text}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
};

export default Header;
