import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
//   openaiApiKey: string;
}

const getConfig = (): Config => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  const mongoURI = process.env.MONGODB_URI;
//   const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!mongoURI) {
    throw new Error('Missing MONGODB_URI in .env');
  }

//   if (!openaiApiKey) {
//     throw new Error('Missing OPENAI_API_KEY in .env');
//   }

  return {
    port,
    mongoURI,
    // openaiApiKey,
  };
};

const config = getConfig();

export default config;
