import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatMessage } from '../../../types/chatMessage';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { message }: { message: ChatMessage } = await request.json();
        const stream = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [{ role: message.role, content: message.content }],
            stream: true,
        });

        const textStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    controller.enqueue(chunk.choices[0]?.delta?.content || '');
                }
                controller.close();
            },
        });

        return new Response(textStream);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
    }
} 