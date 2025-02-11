'use client';

import { useState } from 'react';

export default function SSETestPage() {
    const [response, setResponse] = useState<string>('');

    async function handleTest() {
        try {
            const res = await fetch('/api/test-stream', {
                method: 'POST',
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error('No reader available');

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
        <div className="p-4">
            <button 
                onClick={handleTest}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Run Test
            </button>
            <div className="mt-4 p-4 border rounded min-h-[100px] whitespace-pre-wrap">
                {response || 'Response will appear here...'}
            </div>
        </div>
    );
} 