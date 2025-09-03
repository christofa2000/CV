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
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { memo, useState } from "react";

// Ajustá la ruta si ElectricBorder está en otra carpeta
import ElectricBorder from "./ElectricBorder";

/* =======================
   Tipos
======================= */
type SkillItem = {
  name: string; // nombre visible
  logo: string; // slug de simpleicons (https://simpleicons.org/). Si no existe o vacío -> fallback
  logoColor: string; // hex sin # ("FFFFFF" | "fff" | "white")
  color: string; // hex sin # para hover/fondo
};

type Project = {
  title: string;
  description?: string;
  imageSrc: string; // ruta desde /public
  url?: string;
  stack: SkillItem[];
};

/* =======================
   Utils
======================= */
const normalizeHex = (c?: string) => {
  if (!c) return "ffffff";
  const m = c.trim().toLowerCase();
  if (m === "white") return "ffffff";
  if (m === "black") return "000000";
  return m.replace(/^#/, "");
};

/* =======================
   Chip con ícono (compacto + fallback)
======================= */
const SkillChip = memo(({ skill }: { skill: SkillItem }) => {
  const [imgError, setImgError] = useState(false);
  const slug = (skill.logo || "").trim().toLowerCase();
  const color = normalizeHex(skill.logoColor);
  const iconUrl = slug ? `https://cdn.simpleicons.org/${slug}/${color}` : "";

  const fallbackIcon = (
    <Avatar
      sx={{
        bgcolor: `#${skill.color}`,
        color: `#${color}`,
        fontSize: "0.8rem",
        width: 22,
        height: 22,
      }}
    >
      {skill.name.substring(0, 2)}
    </Avatar>
  );

  return (
    <Chip
      size="small"
      avatar={
        imgError || !iconUrl ? (
          fallbackIcon
        ) : (
          <Avatar
            src={iconUrl}
            alt={skill.name}
            sx={{ p: 0.35, width: 22, height: 22 }}
            imgProps={{ onError: () => setImgError(true), loading: "lazy" }}
          />
        )
      }
      label={skill.name}
      variant="outlined"
      sx={{
        cursor: "default",
        borderColor: "divider",
        "&:hover": {
          backgroundColor: `#${skill.color}15`,
          boxShadow: "0 6px 18px rgba(0,0,0,.12)",
          transform: "translateY(-2px)",
        },
        transition: "all .18s ease",
      }}
    />
  );
});
SkillChip.displayName = "SkillChip";

/* =======================
   Data de proyectos
======================= */
const projects: Project[] = [
  {
    title: "Espacio Chivilcoy",
    imageSrc: "/images/chivilcoy.png",
    url: "https://chivilcoy.netlify.app/",
    description:
      "Sitio oficial del espacio de arte. Performance, accesibilidad y UI moderna.",
    stack: [
      {
        name: "Next.js 13",
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
      {
        name: "Framer Motion",
        logo: "framer",
        logoColor: "FFFFFF",
        color: "1F1B24",
      },
      { name: "Vite", logo: "vite", logoColor: "FFD62E", color: "1A1A1A" },
      {
        name: "Google Maps",
        logo: "googlemaps",
        logoColor: "4285F4",
        color: "0B1220",
      },
    ],
  },
  {
    title: "Oráculo",
    imageSrc: "/images/oraculo.png",
    url: "https://oraculopica.netlify.app/",
    description:
      "Aplicación tipo oráculo desarrollada con Supabase y un stack moderno.",
    stack: [
      {
        name: "React + TypeScript (Vite)",
        logo: "vite",
        logoColor: "646CFF",
        color: "1A1A1A",
      },
      {
        name: "Tailwind CSS",
        logo: "tailwindcss",
        logoColor: "06B6D4",
        color: "0B1220",
      },
      {
        name: "Supabase",
        logo: "supabase",
        logoColor: "3ECF8E",
        color: "0B1220",
      },
      {
        name: "React Router",
        logo: "reactrouter",
        logoColor: "CA4245",
        color: "1A1A1A",
      },
      { name: "Vitest", logo: "vitest", logoColor: "6E9F18", color: "0F172A" },
      {
        name: "Testing Library",
        logo: "testinglibrary",
        logoColor: "E33332",
        color: "111111",
      },
    ],
  },
];

/* =======================
   Card más grande (con ElectricBorder)
======================= */
const MAX_CHIPS = 7;

const ProjectCard = ({ project }: { project: Project }) => {
  const [imgOk, setImgOk] = useState(true);

  return (
    <ElectricBorder
      color="#7df9ff"
      speed={1}
      chaos={0.6}
      thickness={2}
      style={{ borderRadius: 16 }}
    >
      <Card
        className="project-card"
        data-tilt="true"
        sx={{
          height: "100%",
          backgroundColor: "transparent",
          border: "none", // el borde lo dibuja ElectricBorder
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform .2s ease, box-shadow .2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 16px 44px rgba(0,0,0,.3)",
          },
        }}
      >
        {/* Imagen más alta para sensación de “card grande” */}
        {imgOk ? (
          <Box
            component="img"
            src={project.imageSrc}
            alt={project.title}
            loading="lazy"
            onError={() => setImgOk(false)}
            sx={{
              width: "100%",
              aspectRatio: "4/3", // 👈 más alto que 16/9
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              aspectRatio: "4/3",
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

        <CardContent sx={{ p: 2.25 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {project.title}
          </Typography>

          {project.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 4, // 👈 más texto visible
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 1.25,
              }}
            >
              {project.description}
            </Typography>
          )}

          {/* Chips (máx N + “+X”) */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {project.stack.slice(0, MAX_CHIPS).map((s) => (
              <SkillChip key={`${project.title}-${s.name}`} skill={s} />
            ))}
            {project.stack.length > MAX_CHIPS && (
              <Chip
                size="small"
                label={`+${project.stack.length - MAX_CHIPS}`}
                variant="outlined"
                sx={{ borderColor: "divider" }}
              />
            )}
          </Box>
        </CardContent>

        {project.url && (
          <>
            <Divider sx={{ opacity: 0.2 }} />
            <CardActions sx={{ p: 1.5, pt: 0.75 }}>
              <Button
                size="small"
                endIcon={<OpenInNew />}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Proyecto
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </ElectricBorder>
  );
};

/* =======================
   Grid responsivo (más grande aún)
======================= */
const Projects = () => {
  return (
    <Box id="projects" sx={{ mb: 5, backgroundColor: "transparent" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        🚀 Proyectos
      </Typography>

      {/* XS=1, SM=2, MD=2 por fila, LG=3 por fila (cards más grandes) */}
      <Grid container spacing={2.5}>
        {projects.map((p) => (
          <Grid key={p.title} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ProjectCard project={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;

