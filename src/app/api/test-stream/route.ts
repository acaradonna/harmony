import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST() {
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "user", content: "Tell me every single fact you know about GOKU, the legendary SUPER SAIYAN! I must understand this legendary foe! Fufufufu!" }],
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