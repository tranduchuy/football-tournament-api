import * as dotenv from 'dotenv';
dotenv.config();

export const Env = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_POST || '3306', 10),
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '123456',
  DB_NAME: process.env.DB_NAME || 'hometest',
};
