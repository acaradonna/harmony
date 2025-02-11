import { Message } from '@/types/chat';

export class MessageService {
  async sendMessage(content: string): Promise<ReadableStream<Uint8Array> | null> {
    const response = await fetch('/api/test-stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: { role: 'user', content },
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch');
    return response.body;
  }

  createMessage(content: string, role: 'user' | 'assistant'): Message {
    return {
      content,
      role,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createAt: Date.now(),
      updateAt: Date.now(),
    };
  }
}

export const messageService = new MessageService(); 