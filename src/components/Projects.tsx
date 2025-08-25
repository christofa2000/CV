
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

const Projects = () => {
    return (
        <Card id="projects" sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    🚀 Proyecto Destacado
                </Typography>
                <Typography variant="h6" gutterBottom>
                    PokemonApp
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Una aplicación escalable construida con React, que demuestra un manejo de estado complejo, interacciones con APIs y una arquitectura de componentes robusta.
                </Typography>
            </CardContent>
            <CardActions>
                 {/* Puedes poner un link real al proyecto aquí */}
                <Button size="small" endIcon={<OpenInNew />}>
                    Ver Proyecto
                </Button>
            </CardActions>
        </Card>
    );
};

export default Projects;
