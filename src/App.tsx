import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Fade
} from '@mui/material';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Hook simple para animar la entrada de las secciones
const useAnimatedSections = (count: number) => {
    const [loaded, setLoaded] = useState(Array(count).fill(false));

    useEffect(() => {
        const timers = loaded.map((_, index) => 
            setTimeout(() => {
                setLoaded(prev => {
                    const newLoaded = [...prev];
                    newLoaded[index] = true;
                    return newLoaded;
                });
            }, index * 300) // Carga escalonada
        );
        return () => timers.forEach(clearTimeout);
    }, [count]);

    return loaded;
};

function App() {
    const sections = [<AboutMe />, <Skills />, <Projects />, <Contact />];
    const loadedSections = useAnimatedSections(sections.length);

    return (
        <Box sx={{ minHeight: '100vh', pb: 4 }}>
            <Container maxWidth="md">
                <Header />
                <Box component="main">
                    {sections.map((section, index) => (
                        <Fade in={loadedSections[index]} timeout={1000} key={index}>
                            {/* El div es necesario para que Fade funcione correctamente con componentes personalizados */}
                            <div>{section}</div>
                        </Fade>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default App;