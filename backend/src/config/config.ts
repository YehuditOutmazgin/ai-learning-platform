import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  //  openaiApiKey: string;
   openai:OpenAI
}

const getConfig = (): Config => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  const mongoURI = process.env.MONGODB_URI;
   const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!mongoURI) {
    throw new Error('Missing MONGODB_URI in .env');
  }

  if (!openaiApiKey) {
    throw new Error('Missing OPENAI_API_KEY in .env');
  }
const openai=new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
  return {
    port,
    mongoURI,
    //  openaiApiKey,
     openai
  };
};

const config = getConfig();

export default config;
