import express from "express";
import { cspHandler, corsHandler } from "./utils/csp";
import { globalErrorHandler } from "./utils/global-error";
import morgan from "morgan";
import { dynamicLimiter } from "./utils/rate-limit";

const app = express();
app.use(corsHandler);
app.use(cspHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", dynamicLimiter(10, { windowMs: 60 * 1000 }), (_, res) => {
  res.json({ ok: true });
});

app.use(globalErrorHandler);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
