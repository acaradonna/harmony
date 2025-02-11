import { Message } from '@/types/chat';
import { Card } from 'antd';
import { useTheme } from '../ThemeProvider';

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const { isDarkMode } = useTheme();

  const getBgColor = (role: 'user' | 'assistant') => {
    if (role === 'user') {
      return isDarkMode ? '#424242' : '#feffea';
    }
    return isDarkMode ? '#363636' : '#fcfc6220';
  };

  const getTextColor = () => {
    return isDarkMode ? '#feffea' : '#424242';
  };

  return (
    <div className="h-[calc(100vh-150px)] overflow-y-auto my-5 px-4 space-y-4">
      {messages.map((message) => (
        <Card 
          key={message.id}
          style={{
            backgroundColor: getBgColor(message.role),
            marginLeft: message.role === 'user' ? '48px' : '0',
            marginRight: message.role === 'assistant' ? '48px' : '0',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          styles={{ 
            body: { 
              padding: '16px',
              borderRadius: '12px',
            }
          }}
          className="hover:shadow-lg transition-shadow duration-200"
        >
          <div style={{
            color: getTextColor(),
            fontSize: '1rem',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {message.content}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ChatContainer; 