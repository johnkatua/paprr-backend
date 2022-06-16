import dotenv from 'dotenv';

dotenv.config();

export const baseConfig = {
  port: 3000,
  dbUrl: process.env.MONGO_URI
  // dbUrl: "mongodb://localhost:27017/pappr",
};
