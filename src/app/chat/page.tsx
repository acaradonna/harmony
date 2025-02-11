'use client';  // Add this since we're using client-side hooks

import { ConfigProvider, Segmented } from 'antd';
import { useTheme } from 'antd-style';
import enUS from 'antd/locale/en_US';
import { useState } from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import { Message } from '@/types/chat';

type Locale = 'en-US' | 'zh-CN';

const ChatPage = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [language, setLanguage] = useState<Locale>('en-US');

  const handleSendMessage = async (content: string) => {
    try {
      // Add user message to chat
      const userMessage: Message = {
        content,
        role: 'user',
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // Create an initial assistant message
      const assistantMessage: Message = {
        content: '',
        role: 'assistant',
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Send request to API
      const response = await fetch('/api/test-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: { role: 'user', content },
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (!reader) throw new Error('No reader available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // Update the last message with the accumulated buffer
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = buffer;
            lastMessage.updateAt = Date.now();
          }
          return newMessages;
        });
      }

      // Flush the decoder
      const remaining = decoder.decode();
      if (remaining) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = buffer + remaining;
            lastMessage.updateAt = Date.now();
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      const errorMessage: Message = {
        content: 'Sorry, there was an error processing your request.',
        role: 'assistant',
        id: `error-${Date.now()}`,
        createAt: Date.now(),
        updateAt: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div style={{ background: theme.colorBgLayout, height: '100vh', padding: '20px' }}>
      <ConfigProvider locale={enUS}>
        <Segmented<Locale>
          options={['en-US', 'zh-CN']}
          value={language}
          onChange={(v) => setLanguage(v)}
        />
        <ChatContainer messages={messages} />
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          placeholder="Ask me anything"
        />
      </ConfigProvider>
    </div>
  );
};

export default ChatPage; 