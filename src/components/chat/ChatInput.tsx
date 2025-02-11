import { Input } from 'antd';
import { KeyboardEvent } from 'react';
import { useTheme } from '../ThemeProvider';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
  placeholder?: string;
}

const ChatInput = ({ value, onChange, onSend, placeholder }: ChatInputProps) => {
  const { isDarkMode } = useTheme();
  
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend(value.trim());
      }
    }
  };

  return (
    <div className="fixed bottom-5 left-5 right-5 max-w-[calc(100%-40px)]">
      <Input.TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{
          resize: 'none',
          backgroundColor: isDarkMode ? '#424242' : '#feffea',
          color: isDarkMode ? '#feffea' : '#424242',
          borderColor: isDarkMode ? '#a3a3a3' : '#c9c9c9',
          borderWidth: 2,
          borderRadius: 12,
          padding: '12px 16px',
        }}
        className="
          hover:border-[#fcfc62] focus:border-[#fcfc62]
          transition-all duration-200
          shadow-sm hover:shadow-md
        "
      />
    </div>
  );
};

export default ChatInput; 