import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PictureAsPdfRounded from "@mui/icons-material/PictureAsPdfRounded";
import { styled } from "@mui/material/styles";
import { useLanguage } from "../LanguageContext";

const labels = {
  es: {
    about: "Sobre Mí",
    skills: "Habilidades",
    projects: "Proyectos",
    contact: "Contacto",
    subtitle: "Desarrollador Frontend especializado en React + TypeScript",
    language: "Idioma",
    cvEs: "CV-ChristianPapa-Español",
    cvEn: "CV-ChristianPapa-Ingles",
  },
  en: {
    about: "About Me",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    subtitle: "Frontend Developer specialized in React + TypeScript",
    language: "Language",
    cvEs: "CV-ChristianPapa-Español",
    cvEn: "CV-ChristianPapa-Ingles",
  },
} as const;

/** 🎨 Botón con gradiente azul oscuro → verde oscuro */
const GradientButton = styled(Button)(() => ({
  paddingInline: "1.5rem",
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 600,
  background: "linear-gradient(90deg, #006d99, #00593d)", // azul oscuro → verde oscuro
  color: "#e2e8f0",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.6)", // sombra tenue
  transition: "transform .15s ease, filter .15s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    filter: "brightness(1.1)", // sutil, no tan fuerte
  },
}));

/** Badge cuadradito con ES/EN */
const LangBadge = ({ text }: { text: "ES" | "EN" }) => (
  <Box
    component="span"
    aria-hidden
    sx={{
      fontSize: 11,
      fontWeight: 800,
      width: 22,
      height: 22,
      borderRadius: 0.75,
      background: "linear-gradient(135deg, #00593d, #006d99)", // verde oscuro → azul oscuro
      color: "#e2e8f0",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 3px rgba(0,0,0,0.7)",
    }}
  >
    {text}
  </Box>
);

const Header = () => {
  const { lang, setLang } = useLanguage();
  const t = labels[lang];

  const navItems = [
    { text: t.about, href: "#about-me" },
    { text: t.skills, href: "#skills" },
    { text: t.projects, href: "#projects" },
    { text: t.contact, href: "#contact" },
  ];

  return (
    <Box
      component="header"
      sx={{ position: "relative", textAlign: "center", my: { xs: 4, md: 6 } }}
    >
      {/* Avatar */}
      <Avatar
        alt="Christian Oscar Papa"
        src="/Fotocv.png"
        sx={{
          width: { xs: 180, sm: 220, md: 280 },
          height: { xs: 180, sm: 220, md: 280 },
          margin: "auto",
          mb: 2.5,
          border: "6px solid #0a0f1c", // borde negro-azulado
          backgroundColor: "#0a0f1c",
          boxShadow: "0 0 8px rgba(0,0,0,0.7)", // sombra oscura sutil
          "& img": { objectFit: "cover", objectPosition: "center 15%" },
        }}
      />

      <Typography variant="h4" component="h1" sx={{ color: "#e2e8f0" }}>
        Christian Oscar Papa
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, color: "#94a3b8" }}>
        {t.subtitle}
      </Typography>

      {/* Barra: CV ES — Idiomas — CV EN */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 1.25, sm: 2.5 }}
        sx={{ mb: 2.5 }}
      >
        {/* CV Español */}
        <Tooltip title={t.cvEs} arrow>
          <a href="/CV-ChristianPapa.pdf" download style={{ textDecoration: "none" }}>
            <GradientButton size="small" startIcon={<PictureAsPdfRounded />}>
              {t.cvEs}
            </GradientButton>
          </a>
        </Tooltip>

        {/* Selector de idioma */}
        <ButtonGroup
          variant="outlined"
          aria-label={t.language}
          sx={{
            borderRadius: 999,
            overflow: "hidden",
            boxShadow: "0 0 4px rgba(0,0,0,0.6)",
          }}
        >
          <Button
            size="small"
            onClick={() => setLang("es")}
            variant={lang === "es" ? "contained" : "outlined"}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              ...(lang === "es"
                ? {
                    background: "linear-gradient(135deg, #00593d, #006d99)",
                    color: "#e2e8f0",
                    border: "none",
                  }
                : { color: "#006d99", borderColor: "#006d99" }),
            }}
          >
            <LangBadge text="ES" />
            Español
          </Button>
          <Button
            size="small"
            onClick={() => setLang("en")}
            variant={lang === "en" ? "contained" : "outlined"}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              ...(lang === "en"
                ? {
                    background: "linear-gradient(135deg, #00593d, #006d99)",
                    color: "#e2e8f0",
                    border: "none",
                  }
                : { color: "#006d99", borderColor: "#006d99" }),
            }}
          >
            <LangBadge text="EN" />
            English
          </Button>
        </ButtonGroup>

        {/* CV Inglés */}
        <Tooltip title={t.cvEn} arrow>
          <a href="/CV-ChristianPapaIngles.pdf" download style={{ textDecoration: "none" }}>
            <GradientButton size="small" startIcon={<PictureAsPdfRounded />}>
              {t.cvEn}
            </GradientButton>
          </a>
        </Tooltip>
      </Stack>

      {/* Navegación */}
      <Stack direction="row" spacing={2} justifyContent="center">
        {navItems.map((item) => (
          <Button
            key={item.text}
            href={item.href}
            variant="text"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              color: "#006d99", // azul oscuro
              "&:hover": {
                textDecoration: "underline",
                color: "#00593d", // verde oscuro
              },
            }}
          >
            {item.text}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Header;
