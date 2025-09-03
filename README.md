# Mi CV Futurista: Portfolio Interactivo 3D con React & Three.js

¡Bienvenido a mi portfolio personal!

Aplicación SPA para mostrar perfil, habilidades y proyectos de forma inmersiva con efectos 3D y una estética futurista.

![CV Futurista Screenshot](public/CV-app.png)

---

## Características

- Stack moderno: React + Vite + TypeScript + MUI + Three.js.
- Experiencia 3D: fondo “warp speed” y octaedro interactivo de habilidades.
- UI cuidada: tema oscuro, tarjetas con bordes eléctricos y hover sutil.
- i18n: selector ES/EN con persistencia en `localStorage`.
- Responsive: mobile-first, adaptado a pantallas medianas y grandes.

---

## Novedades recientes

- Header con paleta verde/azul eléctrico:
  - Botón de CV con gradiente `#00e676 → #00b0ff`.
  - Borde del avatar en `#00b0ff`.
  - Botonera de idioma con mini-badge en gradiente y texto oscuro.
  - Navegación con links azules y hover verde.
- Proyectos: título centrado y con mayor separación de las cards.
- Build estable: correcciones de TypeScript (type-only imports) y tests.

Archivos tocados: `src/components/Header.tsx`, `src/components/Projects.tsx`, `src/components/ElectricBorder.tsx`, `src/components/OctaPrism.test.tsx`.

---

## Tecnologías

| Categoría   | Tecnologías |
|-------------|-------------|
| Framework   | React |
| 3D          | Three.js, @react-three/fiber, @react-three/drei |
| Bundler     | Vite |
| Lenguaje    | TypeScript |
| UI/UX       | MUI (Material UI), Emotion |
| Animación   | Framer Motion |
| Testing     | Jest + React Testing Library |

---

## Estructura

```
mi-cv-futurista/
├─ public/                 # Activos estáticos (imágenes, PDFs)
├─ src/
│  ├─ components/          # Componentes (Header, Projects, Skills, etc.)
│  ├─ layout/              # Layouts (Body)
│  ├─ LanguageContext.tsx  # i18n (ES/EN)
│  ├─ themes.ts            # Temas MUI (modo dark base)
│  ├─ App.tsx
│  └─ index.css
├─ index.html
├─ vite.config.ts
├─ jest.config.js
└─ package.json
```

---

## Uso rápido

Requisitos: Node 18+ recomendado.

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar build
npm run preview

# Tests
npm test
```

Vite mostrará la URL local al ejecutar `npm run dev`.

---

## Theming y colores

- Cambios locales en Header: `src/components/Header.tsx` define gradiente y colores de enlaces.
- Tema global MUI: `src/themes.ts`. Para adaptar la paleta global al verde/azul eléctrico, actualiza `palette`:

```ts
// src/themes.ts
const developerTheme = createTheme(
  createBaseThemeOptions({
    palette: {
      mode: "dark",
      primary: { main: "#00b0ff", contrastText: "#001018" },
      secondary: { main: "#00e676" },
      background: { default: "transparent", paper: "rgba(30,30,30,0.5)" },
    },
  })
);
```

---

## Internacionalización (ES/EN)

- Contexto: `src/LanguageContext.tsx`.
- Persistencia: `localStorage` clave `lang`.
- Etiquetas por sección: ver `labels` en cada componente (p. ej., Header y Projects).

---

## Componentes destacados

- `src/components/WarpSpeedBackground.tsx`: efecto de hipervelocidad.
- `src/components/ElectricBorder.tsx` + `src/components/ElectricBorder.css`: borde eléctrico configurable (`color`, `speed`, `chaos`, `thickness`).
- `src/components/OctaPrism.tsx`: octaedro interactivo con iconos.
- `src/components/Projects.tsx`: grilla responsiva de proyectos con chips de stack.

---

## Deploy

1) Genera el build con `npm run build`.
2) Sube `dist/` a un hosting estático (Netlify, Vercel, GitHub Pages, etc.).

---

## Créditos

- pmndrs (react-three-fiber/drei) por el ecosistema 3D en React.
- Electric Border inspirado en una demo de @BalintFerenczy (adaptado a React/MUI).

---

¿Sugerencias o mejoras? ¡Bienvenidas! Abre un issue o PR.

