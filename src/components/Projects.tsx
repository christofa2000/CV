// src/components/Projects.tsx
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { useState } from "react";

type SkillItem = {
  name: string;
  logo: string; // slug de simpleicons (https://simpleicons.org/)
  logoColor: string; // hex sin # para el logo (p.ej: "FFFFFF")
  color: string; // hex sin # para el fondo hover (p.ej: "111111")
};

const projectStack: SkillItem[] = [
  {
    name: "Next.js 13 (App Router)",
    logo: "nextdotjs",
    logoColor: "FFFFFF",
    color: "111111",
  },
  { name: "React", logo: "react", logoColor: "61DAFB", color: "20232A" },
  {
    name: "TypeScript",
    logo: "typescript",
    logoColor: "3178C6",
    color: "0F172A",
  },
  {
    name: "Tailwind CSS",
    logo: "tailwindcss",
    logoColor: "06B6D4",
    color: "0B1220",
  },
  // Framer Motion usa el logo de Framer
  {
    name: "Framer Motion",
    logo: "framer",
    logoColor: "FFFFFF",
    color: "1F1B24",
  },
  {
    name: "Optimización de Imágenes",
    logo: "vite",
    logoColor: "FFD62E",
    color: "1A1A1A",
  },
  {
    name: "Google Maps Embed",
    logo: "googlemaps",
    logoColor: "4285F4",
    color: "0B1220",
  },
  // Si "lucide" no existe en Simple Icons, se verá el fallback (iniciales)
  {
    name: "Lucide React",
    logo: "lucide",
    logoColor: "FFFFFF",
    color: "0F172A",
  },
  { name: "Jest (tests)", logo: "jest", logoColor: "C21325", color: "1A1A1A" },
];

const SkillChip = ({ skill }: { skill: SkillItem }) => {
  const [imgError, setImgError] = useState(false);
  const iconUrl = `https://cdn.simpleicons.org/${skill.logo}/${skill.logoColor}`;

  const fallbackIcon = (
    <Avatar
      sx={{
        bgcolor: `#${skill.color}`,
        color: `#${skill.logoColor}`,
        fontSize: "0.9rem",
        width: 24,
        height: 24,
      }}
    >
      {skill.name.substring(0, 2)}
    </Avatar>
  );

  return (
    <Chip
      avatar={
        imgError ? (
          fallbackIcon
        ) : (
          <Avatar
            src={iconUrl}
            alt={skill.name}
            sx={{ p: 0.5 }}
            imgProps={{
              onError: () => setImgError(true),
              loading: "lazy",
            }}
          />
        )
      }
      label={skill.name}
      variant="outlined"
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 4px 12px rgba(0,0,0,0.12)`,
          backgroundColor: `#${skill.color}20`,
        },
      }}
    />
  );
};

const Projects = () => {
  const [imgOk, setImgOk] = useState(true);
  const IMG_SRC = "/images/chivilcoy.png"; // ✅ desde public/

  return (
    <Card
      id="projects"
      sx={{ mb: 3, backgroundColor: "transparent", boxShadow: "none" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          🚀 Proyectos
        </Typography>

        <Typography variant="h6" gutterBottom>
          Espacio Chivilcoy
        </Typography>

        {/* Imagen con fallback visual */}
        {imgOk ? (
          <Box
            component="img"
            src={IMG_SRC}
            alt="Espacio de Arte Chivilcoy"
            loading="lazy"
            onError={() => setImgOk(false)}
            sx={{
              width: "100%",
              maxWidth: 1000,
              aspectRatio: "16 / 9",
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: 1000,
              aspectRatio: "16 / 9",
              borderRadius: 2,
              mb: 2,
              display: "grid",
              placeItems: "center",
              background:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 12px, rgba(255,255,255,0.02) 12px 24px)",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Imagen no disponible
            </Typography>
          </Box>
        )}

        <Typography variant="body1" color="text.secondary" paragraph>
          Sitio oficial para el Espacio de Arte Chivilcoy. Desarrollado con
          tecnologías modernas para garantizar performance, accesibilidad y una
          experiencia visual atractiva. Totalmente responsivo.
        </Typography>

        {/* Tecnologías como chips con íconos */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, mb: 1 }}>
          {projectStack.map((s) => (
            <SkillChip key={s.name} skill={s} />
          ))}
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          endIcon={<OpenInNew />}
          href="https://chivilvoy.netlify.app/" // ¿Es “chivilcoy”? si sí, cambialo aquí
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver Proyecto
        </Button>
      </CardActions>
    </Card>
  );
};

export default Projects;
