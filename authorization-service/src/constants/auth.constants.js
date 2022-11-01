import dotenv from "dotenv";

dotenv.config();

export const USER = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
