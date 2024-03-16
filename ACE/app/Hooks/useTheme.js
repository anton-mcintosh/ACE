import { useContext } from 'react';
import { ThemeContext } from '../Contexts/Theme';

const useTheme = () => {
    const { theme, setTheme, color } = useContext(ThemeContext);
    return { theme, setTheme, color };
    
};

export default useTheme;