import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

const navItems = [
  { text: "Sobre Mí", href: "#about-me" },
  { text: "Habilidades", href: "#skills" },
  { text: "Proyectos", href: "#projects" },
  { text: "Contacto", href: "#contact" },
];

const Header = () => {
  return (
    <Box
      component="header"
      sx={{ position: "relative", textAlign: "center", my: { xs: 4, md: 6 } }}
    >
      {/* Avatar grande y sin recorte arriba */}
      <Avatar
        alt="Christian Oscar Papa"
        src="/Fotocv.png"
        sx={{
          width: { xs: 180, sm: 220, md: 280 },
          height: { xs: 180, sm: 220, md: 280 },
          margin: "auto",
          mb: 2.5,
          border: "4px solid",
          borderColor: "primary.main",
          boxShadow: 3,
          "& img": {
            objectFit: "cover",
            objectPosition: "center 15%",
          },
        }}
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

