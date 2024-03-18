import { createContext, useState } from "react";
import Colors from "../constants/Color.js";

const ThemeContext = createContext({
    theme: "dark",
    setTheme: () => {},
    color: Colors["dark"]
});

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    return (
        <ThemeContext.Provider value={{
            theme: theme, 
            setTheme: setTheme, 
            color: Colors[theme]
            }}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;
export {ThemeContext, ThemeProvider};