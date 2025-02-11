'use client';

import { useState } from 'react';

export default function SSETestPage() {
    const [response, setResponse] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    async function handleTest() {
        try {
            const res = await fetch('/api/test-stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: {
                        role: 'user',
                        content: message
                    }
                }),
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error('No reader available');

            setResponse(''); // Clear previous response
            setMessage(''); // Clear input
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const text = decoder.decode(value);
                setResponse(prev => prev + text);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error occurred while streaming');
        }
    }

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="space-y-4">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    className="w-full p-2 border rounded min-h-[100px] text-black"
                />
                <button 
                    onClick={handleTest}
                    disabled={!message.trim()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Send Message
                </button>
                <div className="mt-4 p-4 border rounded min-h-[100px] whitespace-pre-wrap bg-gray-50 text-black">
                    {response || 'Response will appear here...'}
                </div>
            </div>
        </div>
    );
} 