# Mi Portfolio Interactivo con React y Material-UI

¡Bienvenido a mi portfolio personal! Este proyecto es una aplicación web de una sola página, moderna e interactiva, diseñada para mostrar mi perfil profesional, habilidades y proyectos de una manera visualmente atractiva.

La aplicación está construida con las últimas tecnologías de frontend y cuenta con un sistema de temas personalizable para una experiencia de usuario única.

## ✨ Características Principales

- **Stack Moderno:** Construido con **React**, **Vite**, **TypeScript** y **Material-UI**.
- **Diseño Responsivo:** Totalmente adaptable a dispositivos de escritorio, tabletas y móviles.
- **Selector de Temas:** ¡Cambia el estilo de la página al instante! Elige entre varios temas predefinidos:
    - **D:** Developer (Morado - por defecto)
    - **M:** Matrix (Verde hacker)
    - **O:** Ocean (Tonos azules)
    - **F:** Fire (Tonos de fuego)
- **Fondo Animado:** Un sutil fondo de galaxia en movimiento que está presente en todos los temas.
- **Animaciones Suaves:** Las secciones de contenido aparecen con una animación de "fade-in" y los elementos interactivos tienen efectos "hover".
- **Componentes Reutilizables:** Estructura de proyecto limpia y organizada con componentes de React.

## 🚀 Tecnologías Utilizadas

- **Framework/Librería:** [React](https://reactjs.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **UI Kit:** [Material-UI (MUI)](https://mui.com/)
- **Despliegue:** (Puedes añadir aquí dónde lo desplegaste, ej: Vercel, Netlify)

## 🛠️ Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clona el repositorio** (si está en GitHub):
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## 🎨 Personalización

Este portfolio está diseñado para ser fácilmente personalizable.

### Cambiar Información Personal

Todo el contenido (nombre, descripción, habilidades, etc.) está "hardcodeado" directamente en los componentes. Para cambiarlo, edita los archivos correspondientes en la carpeta `src/components/`:

- **`Header.tsx`**: Cambia tu nombre, título y enlaces de navegación.
- **`AboutMe.tsx`**: Edita tu descripción personal.
- **`Skills.tsx`**: Actualiza tus habilidades duras y blandas.
- **`Projects.tsx`**: Modifica la información de tus proyectos.
- **`Contact.tsx`**: Actualiza tus datos de contacto.

### Cambiar Foto de Perfil

1.  Coloca tu foto en la carpeta `public/`.
2.  Actualiza la ruta en el componente `src/components/Header.tsx`, en la línea del componente `Avatar`:
    ```jsx
    <Avatar src="/tu-foto.png" ... />
    ```

### Añadir o Modificar Temas

Los temas se definen en `src/themes.ts`. Puedes modificar los existentes o añadir nuevos siguiendo la misma estructura:

1.  Crea una nueva definición de tema con `createTheme`.
2.  Añádelo al objeto `themes` con la letra que quieras usar como clave.
3.  Agrega el nuevo botón al array `themeOptions` en `src/components/Header.tsx`.

## 📂 Estructura del Proyecto

```
mi-cv-futurista/
├── public/               # Archivos estáticos (imágenes, etc.)
│   └── Fotocv.png
├── src/
│   ├── components/       # Componentes de React reutilizables
│   │   ├── AboutMe.tsx
│   │   ├── Contact.tsx
│   │   ├── Header.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── assets/           # Assets como SVGs
│   ├── styles/           # (Vacío por ahora)
│   ├── App.tsx           # Componente principal que une todo
│   ├── index.css         # Estilos globales mínimos
│   ├── main.tsx          # Punto de entrada de la aplicación
│   ├── ThemeContext.tsx  # Lógica para el cambio de tema
│   └── themes.ts         # Definiciones de todos los temas de MUI
├── .gitignore
├── package.json
└── README.md
```

---

*Este README fue generado con la ayuda de un asistente de IA.*