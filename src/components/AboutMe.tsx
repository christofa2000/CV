
import { Card, CardContent, Typography } from "@mui/material";

const AboutMe = () => {
    return (
        <Card id="about-me" sx={{ mb: 3 }}>
            <CardContent>
                 <Typography variant="h5" component="h2" gutterBottom>
                    👨‍💻 Sobre Mí
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Me encanta crear interfaces modernas, rápidas y bien pensadas con React, Vite y TypeScript. Escribir código limpio, organizado y fácil de mantener siempre es lo mejor para que el proyecto pueda escalar sin dolores de cabeza.
                    <br /><br />
                    Uso Zustand, React Query y diseño con Tailwind, Ant Design o ShadCN, según lo que necesite el proyecto. Busco que la experiencia sea fluida y el código, claro para todo el equipo.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AboutMe;
