
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Mail, Phone, GitHub } from "@mui/icons-material";

const Contact = () => {
    return (
        <Card id="contact" sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    📨 Contacto
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Si mi perfil te parece interesante, no dudes en contactarme.
                </Typography>
                <Box>
                    <IconButton href="mailto:Christofa2000@gmail.com" color="primary" aria-label="email">
                        <Mail sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton href="tel:+1133461179" color="primary" aria-label="phone">
                        <Phone sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton href="https://github.com" target="_blank" color="primary" aria-label="github">
                        <GitHub sx={{ fontSize: 40 }} />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Contact;
