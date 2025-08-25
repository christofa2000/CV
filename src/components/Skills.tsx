
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

const hardSkills = ["React", "TypeScript", "Next.js", "Vite", "Zustand", "React Query", "Node.js", "Tailwind", "Ant Design", "ShadCN", "Material UI", "Bootstrap"];
const softSkills = ["Comunicación Clara", "Trabajo en Equipo", "Adaptabilidad", "Organización", "Resolución de Problemas"];

const Skills = () => {
    return (
        <Card id="skills" sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                    🛠️ Habilidades
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Hard Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {hardSkills.map(skill => (
                        <Chip label={skill} key={skill} color="primary" variant="outlined" />
                    ))}
                </Box>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Soft Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {softSkills.map(skill => (
                        <Chip label={skill} key={skill} color="secondary" variant="outlined" />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default Skills;
