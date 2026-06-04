import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(request: Request) {
  try {
    const { question, answer } = await request.json();
    
    if (!question || !answer) {
      return NextResponse.json({ error: 'Missing question or answer' }, { status: 400 });
    }

    const prompt = `You are an English teacher checking a student's translation.
The original Vietnamese sentence is: "${question}"
The student's English translation is: "${answer}"

Please provide feedback in Vietnamese:
1. Is the student's translation correct? (Yes/No with a brief explanation).
2. Point out any grammar or vocabulary mistakes if they exist.
3. Provide the most natural and correct English translation.
4. Give a brief tip to help the student remember the grammar or vocabulary used.

Format the output cleanly.`;

    const response = await ollama.chat({
      model: 'qwen2.5:3b',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({ 
      feedback: response.message.content 
    });
  } catch (error) {
    console.error('Error checking answer:', error);
    return NextResponse.json({ error: 'Failed to check answer' }, { status: 500 });
  }
}
