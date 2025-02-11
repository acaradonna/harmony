export interface Message {
  content: string;
  role: 'user' | 'assistant';
  id: string;
  createAt: number;
  updateAt: number;
} 