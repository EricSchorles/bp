import { ThemeModeProps, localStorageThemeMode } from "../types/theme.type"

export function setLocalStorageThemeMode(mode: ThemeModeProps) {
    localStorage.setItem(localStorageThemeMode, mode)
    window.dispatchEvent(new CustomEvent("storage", { detail: { localStorageThemeMode: mode } }));
}

export function isThemeMode(mode: ThemeModeProps) {
    if (mode == localStorage.getItem(localStorageThemeMode)) {
        return true
    } else {
        return false
    }
}

export function setThemeMode(mode: ThemeModeProps) {
    if (mode === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

export function getCurrentThemeMode(): ThemeModeProps {
    if (typeof window !== 'undefined') {
        const systemThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        const getCurrentThemeMode = localStorage.getItem(localStorageThemeMode) as ThemeModeProps | null
        if (getCurrentThemeMode) {
            return getCurrentThemeMode
        }
        if (systemThemeMode) {
            return "dark"
        }
        else return 'light';
    }
    return 'light'
}
