import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import type { ChatCompletionMessage } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type CompletionsResponse = {
  messages: ChatCompletionMessage[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompletionsResponse>,
) {
  if (req.method !== 'GET') return res.status(405).end();

  const messages: ChatCompletionMessage[] = [];

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: '너는 내가 만든 챗봇이야.',
      },
      {
        role: 'user',
        content: '너는 누구니?',
      },
    ],
    model: 'gpt-4-0613',
  });

  messages.push(response.choices[0].message);

  res.status(200).json({ messages });
}
