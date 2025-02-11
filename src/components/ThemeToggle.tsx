import { Switch } from 'antd';
import { useTheme } from './ThemeProvider';
import { BsSun, BsMoonStars } from 'react-icons/bs';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren={<BsMoonStars style={{ color: '#424242' }} />}
      unCheckedChildren={<BsSun style={{ color: '#424242' }} />}
      style={{
        marginRight: 16,
        backgroundColor: isDarkMode ? '#fcfc62' : '#fcfc62',
      }}
    />
  );
} 