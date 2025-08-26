// src/data/skills.ts

// ===== TIPOS =====
export type SkillItem = {
  name: string;
  color: string; // hex sin "#"
  logo: string; // nombre simpleicons (p.ej. "react", "next.js")
  logoColor: string; // "white" | "black" | hex sin "#"
};

// ===== DATA =====
export const skillsData: {
  languages: SkillItem[];
  frameworks: SkillItem[];
  tools: SkillItem[];
} = {
  languages: [
    {
      name: "JavaScript",
      color: "F7DF1E",
      logo: "javascript",
      logoColor: "black",
    },
    {
      name: "TypeScript",
      color: "3178C6",
      logo: "typescript",
      logoColor: "white",
    },
    { name: "HTML5", color: "E34F26", logo: "html5", logoColor: "white" },
    { name: "CSS3", color: "1572B6", logo: "css3", logoColor: "white" },
  ],
  frameworks: [
    { name: "React", color: "61DAFB", logo: "react", logoColor: "black" },
    { name: "Next.js", color: "000000", logo: "next.js", logoColor: "white" },
    { name: "Node.js", color: "339933", logo: "node.js", logoColor: "white" },
    {
      name: "Tailwind CSS",
      color: "06B6D4",
      logo: "tailwindcss",
      logoColor: "white",
    },
    { name: "Material-UI", color: "007FFF", logo: "mui", logoColor: "white" },
    {
      name: "Bootstrap",
      color: "7952B3",
      logo: "bootstrap",
      logoColor: "white",
    },
    { name: "Zustand", color: "000000", logo: "zustand", logoColor: "white" },
    {
      name: "React Query",
      color: "FF4154",
      logo: "reactquery",
      logoColor: "white",
    },
  ],
  tools: [
    { name: "Git", color: "F05032", logo: "git", logoColor: "white" },
    { name: "GitHub", color: "181717", logo: "github", logoColor: "white" },
    {
      name: "VS Code",
      color: "007ACC",
      logo: "visualstudiocode",
      logoColor: "white",
    },
    { name: "Vite", color: "646CFF", logo: "vite", logoColor: "white" },
    { name: "Figma", color: "F24E1E", logo: "figma", logoColor: "white" },
    { name: "Postman", color: "FF6C37", logo: "postman", logoColor: "white" },
    { name: "npm", color: "CB3837", logo: "npm", logoColor: "white" },
  ],
};

export const softSkills: SkillItem[] = [
  { name: "Comunicación Clara", color: "4A4A4A", logo: "", logoColor: "white" },
  { name: "Trabajo en Equipo", color: "4A4A4A", logo: "", logoColor: "white" },
  { name: "Adaptabilidad", color: "4A4A4A", logo: "", logoColor: "white" },
  { name: "Organización", color: "4A4A4A", logo: "", logoColor: "white" },
  { name: "Resolución de Problemas", color: "4A4A4A", logo: "", logoColor: "white" },
];
