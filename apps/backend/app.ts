import "dotenv/config";
import express from "express";
import { cspHandler, corsHandler } from "./utils/csp";
import { globalErrorHandler } from "./utils/global-error";
import morgan from "morgan";
import { dynamicLimiter } from "./utils/rate-limit";
import { dbConnection } from "./utils/db-connection";

const app = express();
// Trust first proxy so req.ip reflects the client (from X-Forwarded-For), not the proxy; required for correct rate limiting behind a reverse proxy or load balancer.
app.set("trust proxy", 1);
app.use(corsHandler);
app.use(cspHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", dynamicLimiter(10, { windowMs: 60 * 1000 }), (_, res) => {
  res.json({ ok: true });
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3001;

(async () => {
  await dbConnection();
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})();
