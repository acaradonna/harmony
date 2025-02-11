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
    colorPrimary: '#fcfc62', // icterine
    colorBgBase: isDarkMode ? '#424242' : '#feffea', // onyx for dark, ivory for light
    colorTextBase: isDarkMode ? '#feffea' : '#424242', // ivory for dark, onyx for light
    colorBorder: isDarkMode ? '#a3a3a3' : '#c9c9c9', // silver-2 for dark, silver for light
    colorBgContainer: isDarkMode ? '#424242' : '#feffea',
    colorBgElevated: isDarkMode ? '#525252' : '#ffffff',
    borderRadius: 8,
    // Additional customizations
    colorInfo: '#fcfc62', // icterine
    colorSuccess: '#4caf50',
    colorWarning: '#ff9800',
    colorError: '#f44336',
    // Text color variations
    colorTextSecondary: isDarkMode ? '#c9c9c9' : '#a3a3a3', // silver for dark, silver-2 for light
    colorTextTertiary: isDarkMode ? '#a3a3a3' : '#c9c9c9', // silver-2 for dark, silver for light
    // Component specific
    controlOutline: '#fcfc62', // icterine for focus states
    colorBgLayout: isDarkMode ? '#363636' : '#feffea', // darker onyx for dark, ivory for light
    // Selection and highlight colors
    colorBgTextHover: isDarkMode ? '#fcfc6220' : '#fcfc6240', // icterine with opacity
    colorBgTextActive: isDarkMode ? '#fcfc6230' : '#fcfc6250', // icterine with opacity
    colorPrimaryBg: isDarkMode ? '#fcfc6220' : '#fcfc6240', // icterine with opacity
    colorPrimaryBgHover: isDarkMode ? '#fcfc6230' : '#fcfc6250', // icterine with opacity
  },
  components: {
    Button: {
      primaryColor: '#424242', // onyx
      primaryBg: '#fcfc62', // icterine
      defaultBg: isDarkMode ? '#424242' : '#feffea',
      defaultColor: isDarkMode ? '#feffea' : '#424242',
      defaultBorderColor: isDarkMode ? '#a3a3a3' : '#c9c9c9',
    },
    Switch: {
      handleBg: '#feffea', // ivory
      colorPrimary: '#fcfc62', // icterine
      colorPrimaryHover: '#fcfc62cc', // icterine with opacity
    },
    Input: {
      activeBorderColor: '#fcfc62', // icterine
      hoverBorderColor: '#fcfc62cc', // icterine with opacity
      activeShadow: '0 0 0 2px #fcfc6220', // icterine with opacity
      paddingBlock: 12,
      paddingInline: 16,
      borderRadius: 12,
      colorBgContainer: isDarkMode ? '#424242' : '#feffea',
      colorText: isDarkMode ? '#feffea' : '#424242',
      colorBorder: isDarkMode ? '#a3a3a3' : '#c9c9c9',
    },
    Select: {
      optionSelectedBg: isDarkMode ? '#fcfc6220' : '#fcfc6240', // icterine with opacity
      optionSelectedColor: isDarkMode ? '#feffea' : '#424242',
      optionActiveBg: isDarkMode ? '#fcfc6230' : '#fcfc6250', // icterine with opacity
    },
    Menu: {
      itemSelectedBg: isDarkMode ? '#fcfc6220' : '#fcfc6240', // icterine with opacity
      itemSelectedColor: isDarkMode ? '#feffea' : '#424242',
      itemActiveBg: isDarkMode ? '#fcfc6230' : '#fcfc6250', // icterine with opacity
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