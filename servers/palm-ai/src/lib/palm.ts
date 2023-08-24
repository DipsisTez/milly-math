import * as generativelanguage from '@google-ai/generativelanguage';
import * as googleAuth from 'google-auth-library';
import * as dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = 'models/chat-bison-001';
const API_KEY = process.env.API_KEY;

const client = new generativelanguage.DiscussServiceClient({
  authClient: new googleAuth.GoogleAuth().fromAPIKey(API_KEY),
});

export async function sendPrompt(message: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('(sendPromt) no find env.API_KEY!');
  }

  const result = await client.generateMessage({
    model: MODEL_NAME, // Required. The model to use to generate the result.
    prompt: {
      // optional, preamble context to prime responses
      context: 'Answer my questions',
      // Optional. Examples for further fine-tuning of responses.
      examples: [
        {
          input: { content: 'What is the capital of California?' },
          output: {
            content: `If the capital of California is what you seek,
            Sacramento is where you ought to peek.`,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages: [{ content: message }],
    },
  });
  const responseData = result[0].candidates[0].content;

  return responseData;
}
