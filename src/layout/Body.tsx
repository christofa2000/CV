import { Box } from "@mui/material";
import Skills from "../components/Skills";
import OctaPrism from "../components/OctaPrism";

export default function Body() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: 3,
        width: "100%",
        background: "transparent",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
          gap: { xs: 3, md: 3 },
          alignItems: "start",
          background: "transparent",
        }}
      >
        <OctaPrism />
        <Skills />
      </Box>
    </Box>
  );
}
