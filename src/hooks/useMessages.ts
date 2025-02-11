import { useState } from 'react';
import { Message } from '@/types/chat';
import { messageService } from '@/services/messageService';
import { streamHandler } from '@/utils/streamHandler';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (content: string) => {
    try {
      const userMessage = messageService.createMessage(content, 'user');
      const assistantMessage = messageService.createMessage('', 'assistant');
      
      setMessages(prev => [...prev, userMessage, assistantMessage]);

      const stream = await messageService.sendMessage(content);
      if (!stream) throw new Error('No stream available');

      const reader = stream.getReader();
      
      for await (const buffer of streamHandler.processStream(reader)) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage?.role === 'assistant') {
            lastMessage.content = buffer;
            lastMessage.updateAt = Date.now();
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = messageService.createMessage(
        'Sorry, there was an error processing your request.',
        'assistant'
      );
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return { messages, sendMessage };
}; 