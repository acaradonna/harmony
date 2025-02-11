import { openai } from '@/lib/openai';
import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages.map((msg: ChatMessage) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
    });

    return NextResponse.json({
      content: completion.choices[0].message.content,
      role: 'assistant',
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createAt: Date.now(),
      updateAt: Date.now()
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 