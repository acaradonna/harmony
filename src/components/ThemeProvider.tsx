import { ConfigProvider, theme } from 'antd';
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Custom theme tokens based on the provided color scheme
const getThemeTokens = (isDarkMode: boolean) => ({
  token: {
    colorPrimary: '#FCBC62', // Hunyadi Yellow
    colorBgBase: isDarkMode ? '#424242' : '#feffea', // onyx for dark, ivory for light
    colorTextBase: isDarkMode ? '#feffea' : '#424242', // ivory for dark, onyx for light
    colorBorder: isDarkMode ? '#a3a3a3' : '#c9c9c9', // silver-2 for dark, silver for light
    colorBgContainer: isDarkMode ? '#424242' : '#feffea',
    colorBgElevated: isDarkMode ? '#525252' : '#ffffff',
    borderRadius: 8,
    // Additional customizations
    colorInfo: '#FCBC62', // Hunyadi Yellow
    colorSuccess: '#4caf50',
    colorWarning: '#ff9800',
    colorError: '#f44336',
    // Text color variations
    colorTextSecondary: isDarkMode ? '#c9c9c9' : '#a3a3a3', // silver for dark, silver-2 for light
    colorTextTertiary: isDarkMode ? '#a3a3a3' : '#c9c9c9', // silver-2 for dark, silver for light
    // Component specific
    controlOutline: '#FCBC62', // Hunyadi Yellow for focus states
    colorBgLayout: isDarkMode ? '#363636' : '#feffea', // darker onyx for dark, ivory for light
    // Selection and highlight colors
    colorBgTextHover: isDarkMode ? '#FCBC6220' : '#FCBC6240', // Hunyadi Yellow with opacity
    colorBgTextActive: isDarkMode ? '#FCBC6230' : '#FCBC6250', // Hunyadi Yellow with opacity
    colorPrimaryBg: isDarkMode ? '#FCBC6220' : '#FCBC6240', // Hunyadi Yellow with opacity
    colorPrimaryBgHover: isDarkMode ? '#FCBC6230' : '#FCBC6250', // Hunyadi Yellow with opacity
  },
  components: {
    Button: {
      primaryColor: '#424242', // onyx
      primaryBg: '#FCBC62', // Hunyadi Yellow
      defaultBg: isDarkMode ? '#424242' : '#feffea',
      defaultColor: isDarkMode ? '#feffea' : '#424242',
      defaultBorderColor: isDarkMode ? '#a3a3a3' : '#c9c9c9',
    },
    Switch: {
      handleBg: '#feffea', // ivory
      colorPrimary: '#FCBC62', // Hunyadi Yellow
      colorPrimaryHover: '#FCBC62cc', // Hunyadi Yellow with opacity
    },
    Input: {
      activeBorderColor: '#FCBC62', // Hunyadi Yellow
      hoverBorderColor: '#FCBC62cc', // Hunyadi Yellow with opacity
      activeShadow: '0 0 0 2px #FCBC6220', // Hunyadi Yellow with opacity
      paddingBlock: 12,
      paddingInline: 16,
      borderRadius: 12,
      colorBgContainer: isDarkMode ? '#424242' : '#feffea',
      colorText: isDarkMode ? '#feffea' : '#424242',
      colorBorder: isDarkMode ? '#a3a3a3' : '#c9c9c9',
    },
    Select: {
      optionSelectedBg: isDarkMode ? '#FCBC6220' : '#FCBC6240', // Hunyadi Yellow with opacity
      optionSelectedColor: isDarkMode ? '#feffea' : '#424242',
      optionActiveBg: isDarkMode ? '#FCBC6230' : '#FCBC6250', // Hunyadi Yellow with opacity
    },
    Menu: {
      itemSelectedBg: isDarkMode ? '#FCBC6220' : '#FCBC6240', // Hunyadi Yellow with opacity
      itemSelectedColor: isDarkMode ? '#feffea' : '#424242',
      itemActiveBg: isDarkMode ? '#FCBC6230' : '#FCBC6250', // Hunyadi Yellow with opacity
    },
    Card: {
      colorBgContainer: isDarkMode ? '#424242' : '#feffea',
      colorText: isDarkMode ? '#feffea' : '#424242',
      colorBorderSecondary: 'transparent',
      boxShadowTertiary: '0 2px 8px rgba(0, 0, 0, 0.1)',
      borderRadiusLG: 12,
    },
  },
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          ...getThemeTokens(isDarkMode),
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
} 