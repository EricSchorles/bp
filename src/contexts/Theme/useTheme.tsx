import { localStorageThemeMode, ThemeProviderProps, UseThemeProps } from '@utils/types/theme.type';
import React, {
    Fragment,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
    memo
} from 'react'

const MEDIA = '(prefers-color-scheme: dark)'
const defaultThemes = ['light', 'dark'];
const isServer = typeof window === 'undefined'
const ThemeContext = createContext<UseThemeProps | undefined>(undefined)
const defaultContext: UseThemeProps = { setTheme: _ => { }, themes: [] }

export const useTheme = () => useContext(ThemeContext) ?? defaultContext

export const ThemeProvider: React.FC<ThemeProviderProps> = props => {
    const context = useContext(ThemeContext)

    if (context) return <Fragment>{props.children}</Fragment>
    return <Theme {...props} />
}


const Theme: React.FC<ThemeProviderProps> = ({
    enableSystem = true,
    storageKey = localStorageThemeMode,
    themes = defaultThemes,
    defaultTheme = enableSystem ? 'system' : 'light',
    value,
    children,
}) => {
    const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme))
    const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey))
    const attrs = !value ? themes : Object.values(value)

    const applyTheme = useCallback((theme: any) => {
        let resolved = theme
        if (!resolved) return

        // If theme is system, resolve it before setting theme
        if (theme === 'system' && enableSystem) {
            resolved = getSystemTheme()
        }

        const name = value ? value[resolved] : resolved
        const d = document.documentElement

        d.classList.remove(...attrs)

        if (name) d.classList.add(name)

    }, [attrs, enableSystem, value])

    const setTheme = useCallback(
        (theme: any) => {
            setThemeState(theme)

            // Save to storage
            try {
                localStorage.setItem(storageKey, theme)
            } catch (e) {
                // Unsupported
            }
        },
        [storageKey]
    )

    const handleMediaQuery = useCallback(
        (e: MediaQueryListEvent | MediaQueryList) => {
            const resolved = getSystemTheme(e)
            setResolvedTheme(resolved)

            if (theme === 'system' && enableSystem) {
                applyTheme('system')
            }
        },
        [theme, applyTheme, enableSystem]
    )

    // Always listen to System preference
    useEffect(() => {
        const media = window.matchMedia(MEDIA)

        media.addEventListener('change', handleMediaQuery)
        handleMediaQuery(media)

        return () => media.removeEventListener('change', handleMediaQuery)
    }, [handleMediaQuery])

    // localStorage event handling
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key !== storageKey) {
                return
            }

            // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
            const theme = e.newValue || defaultTheme
            setTheme(theme)
        }

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [setTheme, defaultTheme, storageKey])

    // Whenever theme or forcedTheme changes, apply it
    useEffect(() => {
        applyTheme(theme)
    }, [theme, applyTheme])

    const providerValue: UseThemeProps = useMemo(() => ({
        theme,
        setTheme,
        resolvedTheme: theme === 'system' ? resolvedTheme : theme,
        themes: enableSystem ? [...themes, 'system'] : themes,
        systemTheme: (enableSystem ? resolvedTheme : undefined) as 'light' | 'dark' | undefined
    }), [theme, setTheme, resolvedTheme, enableSystem, themes]);

    return (
        <ThemeContext.Provider
            value={providerValue}
        >
            <ThemeScript
                {...{
                    enableSystem,
                    storageKey,
                    themes,
                    defaultTheme,
                    value,
                    children,
                    attrs,
                }}
            />
            {children}
        </ThemeContext.Provider>
    )
}

const ThemeScript = memo(
    ({
        forcedTheme,
        storageKey,
        enableSystem,
        defaultTheme,
        value,
        attrs,
    }: any & { attrs: string[]; defaultTheme: string }) => {

        const defaultSystem = defaultTheme === 'system'
        const removeClasses = `c.remove(${attrs.map((t: string) => `'${t}'`).join(',')})`

        // Code-golfing the amount of characters in the script
        const initializationDOMvariables = (() => {
            return `var d=document.documentElement,c=d.classList;${removeClasses};`

        })()

        const updateDOM = (name: string, literal: boolean = false, setColorScheme = true) => {
            const resolvedName = value ? value[name] : name
            const val = literal ? name + `|| ''` : `'${resolvedName}'`
            let text = ''

            // MUCH faster to set colorScheme alongside HTML attribute/class
            // as it only incurs 1 style recalculation rather than 2
            // This can save over 250ms of work for pages with big DOM
            if (literal || resolvedName) {
                text += `c.add(${val})`
            } else {
                text += `null`
            }


            return text
        }

        const scriptSrc = (() => {
            if (forcedTheme) {
                return `!function(){${initializationDOMvariables}${updateDOM(forcedTheme)}}()`
            }

            if (enableSystem) {
                return `!function(){try{${initializationDOMvariables}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
                    'dark'
                )}}else{${updateDOM('light')}}}else if(e){${value ? `var x=${JSON.stringify(value)};` : ''
                    }${updateDOM(value ? `x[e]` : 'e', true)}}${!defaultSystem ? `else{` + updateDOM(defaultTheme, false, false) + '}' : ''
                    }}catch(e){}}()`
            }

            return `!function(){try{${initializationDOMvariables}var e=localStorage.getItem('${storageKey}');if(e){${value ? `var x=${JSON.stringify(value)};` : ''
                }${updateDOM(value ? `x[e]` : 'e', true)}}else{${updateDOM(
                    defaultTheme,
                    false,
                    false
                )};}}catch(t){}}();`
        })()

        return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />
    },
    // Never re-render this component
    () => true
)
ThemeScript.displayName = 'ThemeScript'
// Helpers
const getTheme = (key: string, fallback?: string) => {
    if (isServer) return undefined
    let theme
    try {
        theme = localStorage.getItem(key) || undefined
    } catch (e) {
        // Unsupported
    }
    return theme || fallback
}

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
    if (!e) e = window.matchMedia(MEDIA)
    const isDark = e.matches
    const systemTheme = isDark ? 'dark' : 'light'
    return systemTheme
}