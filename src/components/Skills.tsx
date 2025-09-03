import { Card, CardContent, Typography, Box, Chip, Avatar } from "@mui/material";
import {} from "@mui/material/styles";
import { useEffect, useState, memo } from "react";
import { useLanguage } from "../LanguageContext";

import { skillsData, softSkills } from "../data/skills";
import type { SkillItem } from "../data/skills";

const normalizeHex = (c?: string) => {
  if (!c) return "ffffff";
  const m = c.trim().toLowerCase();
  if (m === "white") return "ffffff";
  if (m === "black") return "000000";
  return m.replace(/^#/, "");
};

const remapSlug = (slug: string) => {
  const s = (slug || "").trim().toLowerCase();
  if (s === "next.js") return "nextdotjs";
  if (s === "node.js") return "nodedotjs";
  return s;
};

const SkillChip = memo(({ skill }: { skill: SkillItem }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [invert, setInvert] = useState(false);
  const slug = remapSlug(skill.logo);
  const color = normalizeHex(skill.logoColor);
  const iconUrl = slug ? `https://cdn.simpleicons.org/${slug}?color=${color}` : "";

  // Preload with fallback (uncolored) to avoid flicker
  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
    setImgSrc(null);
    setInvert(false);
    if (!iconUrl) return;
    const img = new Image();
    img.onload = () => {
      setImgSrc(iconUrl);
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
    img.src = iconUrl;
    return () => {
      img.onload = null as any;
      img.onerror = null as any;
    };
  }, [iconUrl]);

  const fallbackIcon = (
    <Avatar
      sx={{
        bgcolor: `#${skill.color}`,
        color: `#${color}`,
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
      avatar={imgError || !imgSrc || !imgLoaded ? (
        fallbackIcon
      ) : (
        <Avatar
          src={imgSrc}
          alt={skill.name}
          sx={{ p: 0.5, filter: invert ? "invert(1)" : undefined }}
          imgProps={{ onError: () => setImgError(true), loading: "lazy" }}
        />
      )}
      label={skill.name}
      variant="outlined"
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 4px 12px 0 rgba(0,0,0,0.12)`,
          backgroundColor: `#${skill.color}20`,
        },
      }}
    />
  );
});
SkillChip.displayName = "SkillChip";

const SkillSection = ({ title, skills }: { title: string; skills: SkillItem[] }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
      {skills.map((skill) => (
        <SkillChip key={skill.name} skill={skill} />
      ))}
    </Box>
  </Box>
);

const Skills = () => {
  const { lang } = useLanguage();
  const t = {
    es: {
      title: "Habilidades",
      languages: "Lenguajes",
      frameworks: "Frameworks y Librerías",
      tools: "Software y Herramientas",
      soft: "Habilidades Blandas",
    },
    en: {
      title: "Skills",
      languages: "Languages",
      frameworks: "Frameworks & Libraries",
      tools: "Software & Tools",
      soft: "Soft Skills",
    },
  }[lang];

  return (
    <Card id="skills" variant="outlined" sx={{ mb: 3, p: 1, backgroundColor: "transparent", boxShadow: "none", borderColor: "rgba(255,255,255,0.08)" }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          {t.title}
        </Typography>

        <SkillSection title={t.languages} skills={skillsData.languages} />
        <SkillSection title={t.frameworks} skills={skillsData.frameworks} />
        <SkillSection title={t.tools} skills={skillsData.tools} />

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }} align="center">
          {t.soft}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center" }}>
          {softSkills.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Skills;

