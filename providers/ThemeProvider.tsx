import { DARKCOLORS, LIGHTCOLORS } from "@/constants";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";


interface ThemeContextType {
    dark: boolean;
    colors: typeof LIGHTCOLORS | typeof DARKCOLORS;
    setScheme: (scheme: 'light' | 'dark') => void;
}

// export const ThemeContext = createContext({
//     dark: false,
//     colors: LIGHTCOLORS,
//     setScheme: () => { },
// })

export const ThemeContext = createContext<ThemeContextType>({
    dark: false,
    colors: LIGHTCOLORS,
    setScheme: () => {},
});
export const ThemeProvider = (props: { children: React.ReactNode }) => {
    const colorScheme = useColorScheme();
    const [ isDark, setIsDark ] = useState(colorScheme === 'dark');

    useEffect(() => {
        setIsDark(colorScheme === 'dark')
    }, [ colorScheme ])

    const defaultTheme: ThemeContextType = {
        dark: isDark,
        colors: isDark ? DARKCOLORS : LIGHTCOLORS,
        setScheme: (scheme: any) => setIsDark(scheme === 'dark'),
    }

    return (
        // <ThemeContext.Provider value={defaultTheme}>
        // {props.children}
        // </ThemeContext.Provider>
        <ThemeContext.Provider value= { defaultTheme } >
        { props.children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);