// src/components/Projects.tsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { memo, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../LanguageContext";

import ElectricBorder from "./ElectricBorder";

// Estilos estáticos para reducir churn en listas
const cardSx = {
  height: "100%",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: 2,
  overflow: "hidden",
  transition: "transform .2s ease, box-shadow .2s ease",
  "&:hover": { transform: "translateY(-4px)", boxShadow: "0 16px 44px rgba(0,0,0,.3)" },
} as const;
const imgSx = { width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" } as const;
const fallbackImgBoxSx = {
  width: "100%",
  aspectRatio: "4/3",
  display: "grid",
  placeItems: "center",
  background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 12px, rgba(255,255,255,0.02) 12px 24px)",
} as const;
const descSx = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  mb: 1.25,
} as const;
const chipsRowSx = { display: "flex", flexWrap: "wrap", gap: 0.75 } as const;

/* =======================
   Tipos
======================= */
type SkillItem = {
  name: string; // nombre visible
  logo: string; // slug de simpleicons (https://simpleicons.org/)
  logoColor: string; // hex sin # o palabras white/black
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
   Chip con icono (con preload + fallback)
======================= */
const SkillChip = memo(({ skill }: { skill: SkillItem }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [invert, setInvert] = useState(false);
  const slug = (skill.logo || "").trim().toLowerCase();
  const color = normalizeHex(skill.logoColor);
  const urlColored = slug
    ? `https://cdn.simpleicons.org/${slug}?color=${color}`
    : "";

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
    setImgSrc(null);
    setInvert(false);
    if (!urlColored) return;
    const img = new Image();
    img.onload = () => {
      setImgSrc(urlColored);
      setImgLoaded(true);
    };
    img.onerror = () => {
      const altUrl = `https://cdn.simpleicons.org/${slug}`;
      const img2 = new Image();
      img2.onload = () => {
        setImgSrc(altUrl);
        setInvert(true);
        setImgLoaded(true);
      };
      img2.onerror = () => setImgError(true);
      img2.src = altUrl;
    };
    img.src = urlColored;
    return () => {
      img.onload = null as any;
      img.onerror = null as any;
    };
  }, [urlColored]);

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
        imgError || !imgSrc || !imgLoaded ? (
          fallbackIcon
        ) : (
          <Avatar
            src={imgSrc}
            alt={skill.name}
            sx={{
              p: 0.35,
              width: 22,
              height: 22,
              filter: invert ? "invert(1)" : undefined,
            }}
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
    ],
  },
  {
    title: "Oráculo",
    imageSrc: "/images/oraculo.png",
    url: "https://oraculopica.netlify.app/",
    description: "App tipo oráculo con Supabase y flujo simple de rutas.",
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
    ],
  },
  {
    title: "Cripto Dashboard",
    imageSrc: "/images/cripto.png",
    // url: "https://tulink.com" // opcional, si tenés demo pública
    description:
      "🎨 Neumorphic: formulario hundido e inputs elevados. 🌈 Fondo dinámico con hue-rotate. ⚡ Datos en tiempo real desde CoinGecko. 🧑🏻‍💻 React + Vite + TypeScript + Zustand.",
    stack: [
      { name: "React", logo: "react", logoColor: "61DAFB", color: "20232A" },
      { name: "Vite", logo: "vite", logoColor: "646CFF", color: "1A1A1A" },
      {
        name: "Zustand",
        logo: "zustand",
        logoColor: "000000",
        color: "111827",
      }, // si el ícono no existe, usa fallback
      {
        name: "CSS3 (Neumorphic)",
        logo: "css3",
        logoColor: "1572B6",
        color: "0B1220",
      },
      {
        name: "TypeScript",
        logo: "typescript",
        logoColor: "3178C6",
        color: "0F172A",
      },
      {
        name: "Google Fonts (Outfit)",
        logo: "googlefonts",
        logoColor: "4285F4",
        color: "0B1220",
      },
      { name: "Jest", logo: "jest", logoColor: "C21325", color: "1A1A1A" },
      {
        name: "Testing Library",
        logo: "testinglibrary",
        logoColor: "E33332",
        color: "1A1A1A",
      },
      {
        name: "CoinGecko API",
        logo: "coingecko",
        logoColor: "00D36E",
        color: "0B1220",
      },
    ],
  },
];

/* =======================
   Card compacta (con ElectricBorder)
======================= */
const MAX_CHIPS = 6;

const ProjectCard = memo(({ project, labels }: { project: Project; labels: { view: string; noimg: string } }) => {
  const [imgOk, setImgOk] = useState(true);
  const chips = useMemo(() => project.stack.slice(0, MAX_CHIPS), [project.stack]);

  return (
    <ElectricBorder
      color="#7df9ff"
      speed={1}
      chaos={0.55}
      thickness={1.25}
      style={{ borderRadius: 12 }}
    >
      <Card className="project-card" data-tilt="true" sx={cardSx}>
        {imgOk ? (
          <Box component="img" src={project.imageSrc} alt={project.title} loading="lazy" decoding="async" onError={() => setImgOk(false)} sx={imgSx} />
        ) : (
          <Box sx={fallbackImgBoxSx}>
            <Typography variant="body2" color="text.secondary">
              {labels.noimg}
            </Typography>
          </Box>
        )}

        <CardContent sx={{ p: 2.25 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {project.title}
          </Typography>
          {project.description && (
            <Typography variant="body2" color="text.secondary" sx={descSx}>
              {project.description}
            </Typography>
          )}

          <Box sx={chipsRowSx}>
            {chips.map((s) => (
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
                {labels.view}
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </ElectricBorder>
  );
});
ProjectCard.displayName = "ProjectCard";

/* =======================
   Grid responsivo
======================= */
const Projects = () => {
  const { lang } = useLanguage();
  const t = { es: { title: "Proyectos", view: "Ver Proyecto", noimg: "Imagen no disponible" }, en: { title: "Projects", view: "View Project", noimg: "Image unavailable" } }[lang];
  const labels = useMemo(() => ({ view: t.view, noimg: t.noimg }), [t.view, t.noimg]);
  return (
    <Box
      id="projects"
      sx={{ mb: 5, backgroundColor: "transparent" }}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1200px" }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: "center", mb: { xs: 2, sm: 3 } }}
      >
        {t.title}
      </Typography>
      <Grid container spacing={2.5}>
        {projects.map((p) => (
          <Grid key={p.title} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ProjectCard project={p} labels={labels} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
