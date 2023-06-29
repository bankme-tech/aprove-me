import { config } from 'dotenv';

config();

export const authConstants = {
  secret: process.env.AUTH_SECRET,
};
