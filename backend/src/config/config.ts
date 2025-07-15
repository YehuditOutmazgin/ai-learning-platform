import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  //  openaiApiKey: string;
  openAI: OpenAI
  geminiAI: GoogleGenerativeAI
  adminPassword: string,
  adminUsername: string,
  jwtSecret:string
}

const getConfig = (): Config => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  const mongoURI = process.env.MONGODB_URI;
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!mongoURI) {
    throw new Error('Missing MONGODB_URI in .env');
  }

  if (!openaiApiKey) {
    throw new Error('Missing OPENAI_API_KEY in .env');
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
    if (!adminPassword|| !adminUsername) {
    throw new Error('Missing Admin values in .env');
  }
  if (!jwtSecret) {
    throw new Error('Missing JWT_SECRET in .env');
  }
  return {
    port,
    mongoURI,
    //  openaiApiKey,
    openAI: openai,
    geminiAI,
    adminUsername,
    adminPassword,
    jwtSecret
  };
};

const config = getConfig();

export default config;
