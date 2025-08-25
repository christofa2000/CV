
import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { themes } from './themes';

interface ThemeContextType {
    setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeName, setThemeName] = useState('D'); // D for Developer as default

    const theme = useMemo(() => themes[themeName] || themes['D'], [themeName]);

    const setTheme = (name: string) => {
        if (themes[name]) {
            setThemeName(name);
        }
    };

    return (
        <ThemeContext.Provider value={{ setTheme }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeSwitcher = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeSwitcher must be used within a CustomThemeProvider');
    }
    return context;
};
