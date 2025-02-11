import { Card } from 'antd';
import { Message } from '@/types/chat';
import { useTheme } from '../ThemeProvider';
import { themeConfig } from '@/config/theme';

interface MessageCardProps {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? themeConfig.colors.dark : themeConfig.colors.light;

  return (
    <Card 
      key={message.id}
      style={{
        backgroundColor: message.role === 'user' ? colors.userMessageBg : colors.messageBg,
        marginLeft: message.role === 'user' ? '48px' : '0',
        marginRight: message.role === 'assistant' ? '48px' : '0',
        border: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
      styles={{ 
        body: { 
          padding: '16px',
          borderRadius: themeConfig.borderRadius.default,
        }
      }}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <div style={{
        color: colors.text,
        fontSize: '1rem',
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {message.content}
      </div>
    </Card>
  );
}; 