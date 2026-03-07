import app from "./app.js";
import { serve } from "@hono/node-server";

const port = Number(process.env.PORT ?? 3000);

export default {
  port,
  fetch: app.fetch,
};

if (process.env.NODE_ENV !== "production") {
  serve({
    port,
    fetch: app.fetch,
  });
}
