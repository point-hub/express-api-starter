import { config } from "dotenv";

config();

export const port = Number(process.env.PORT);
