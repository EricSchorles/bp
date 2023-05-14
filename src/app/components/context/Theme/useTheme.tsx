import { getCurrentThemeMode, setLocalStorageThemeMode, setThemeMode, } from '@/utils/storage/theme';
import { ThemeModeProps } from '@/utils/types/theme.type';
import React, { ReactNode, useEffect } from 'react';

type ThemeProviderProps = { children?: ReactNode }

type ThemeContextProps = { setTheme: (mode: ThemeModeProps) => void, }

export const ThemeContext = React.createContext<ThemeContextProps>({ setTheme: () => undefined });
export const ThemeProvider = ({ children }: ThemeProviderProps
) => {

    function setTheme(mode: ThemeModeProps) {
        setLocalStorageThemeMode(mode)
        setThemeMode(mode)
    }
    useEffect(() => {
        setTheme(getCurrentThemeMode())
    }, []);
    if (typeof window !== "undefined") {
        addEventListener("storage", (event: any) => {
            setThemeMode(event.detail.localStorageThemeMode)
        })
    }

    return (
        <ThemeContext.Provider value={{ setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
