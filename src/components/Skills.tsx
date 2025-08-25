import { Card, CardContent, Typography, Box, Chip, Grid, Paper, useTheme } from "@mui/material";

// Estructura de datos mejorada para Hard Skills con sus slugs de Simple Icons
const hardSkills = [
    { name: 'React', slug: 'react' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'Vite', slug: 'vite' },
    { name: 'Zustand', slug: 'zustand' },
    { name: 'React Query', slug: 'reactquery' },
    { name: 'Node.js', slug: 'nodedotjs' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'Ant Design', slug: 'antdesign' },
    { name: 'ShadCN/UI', slug: 'shadcnui' },
    { name: 'Material-UI', slug: 'mui' },
    { name: 'Bootstrap', slug: 'bootstrap' },
];

const softSkills = ["Comunicación Clara", "Trabajo en Equipo", "Adaptabilidad", "Organización", "Resolución de Problemas"];

const Skills = () => {
    const theme = useTheme();
    // Extrae el color hexadecimal sin el '#' para la URL de Simple Icons
    const iconColor = theme.palette.primary.main.substring(1);

    return (
        <Card id="skills" sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                    🛠️ Habilidades
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Hard Skills
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {hardSkills.map(skill => (
                        <Grid item xs={4} sm={3} md={2} key={skill.name}>
                            <Paper 
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        borderColor: 'primary.main'
                                    }
                                }}
                            >
                                <img 
                                    src={`https://cdn.simpleicons.org/${skill.slug}/${iconColor}`}
                                    alt={`${skill.name} logo`}
                                    height="40"
                                    width="40"
                                />
                                <Typography variant="caption" sx={{ mt: 1, fontWeight: 'medium' }}>
                                    {skill.name}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Soft Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {softSkills.map(skill => (
                        <Chip label={skill} key={skill} color="secondary" variant="outlined" />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default Skills;