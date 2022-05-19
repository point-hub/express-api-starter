import { config } from "dotenv";
import App from "./app.js";

config();

const port = process.env.PORT || 3000;

const app = await new App().init();

app
  .listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  })
  .on("error", (e) => {
    console.error(e);
  });
