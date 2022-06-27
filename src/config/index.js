import dotenv from "dotenv";

dotenv.config();

export const baseConfig = {
  port: process.env.PORT,
  dbUrl: process.env.MONGO_URI,
};
