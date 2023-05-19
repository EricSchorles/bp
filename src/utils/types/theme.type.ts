export const localStorageThemeMode = "theme"
export type ThemeModeProps = 'dark' | 'light'
export interface ThemeProviderProps {
    enableSystem?: boolean
    enableColorScheme?: boolean
    storageKey?: string
    themes?: string[]
    defaultTheme?: string
    value?: { [themeName: string]: string }
    children?: React.ReactNode
}
export interface UseThemeProps {
    themes: string[]
    forcedTheme?: string
    setTheme: (theme: string) => void
    theme?: string
    resolvedTheme?: string
    systemTheme?: 'dark' | 'light'
}