import { Card, CardContent, Typography } from "@mui/material";
import { useLanguage } from "../LanguageContext";

const AboutMe = () => {
  const { lang } = useLanguage();
  const t = {
    es: {
      title: "Sobre Mí",
      p1: "Me encanta crear interfaces modernas, rápidas y bien pensadas con React, Vite y TypeScript.",
      p2: "Escribir código limpio, organizado y fácil de mantener permite escalar proyectos sin dolores de cabeza.",
      p3: "Uso Zustand, React Query y diseño con Tailwind, Ant Design o ShadCN, según lo que necesite el proyecto. También escribo tests con Jest para asegurar la calidad.",
    },
    en: {
      title: "About Me",
      p1: "I love building modern, fast and thoughtful interfaces with React, Vite and TypeScript.",
      p2: "Writing clean, organized and maintainable code helps projects scale without headaches.",
      p3: "I use Zustand, React Query and design systems like Tailwind, Ant Design or ShadCN, depending on the project needs. I also write tests with Jest to ensure quality.",
    },
  }[lang];

  return (
    <Card
      id="about-me"
      sx={{ mb: 3, backgroundColor: "transparent", boxShadow: "none" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {t.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t.p1} {t.p2}
          <br />
          <br />
          {t.p3}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AboutMe;
