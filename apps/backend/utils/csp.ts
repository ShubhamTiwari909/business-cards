import helmet from "helmet";
import cors from "cors";

const whitelist = [process.env.FRONTEND_ORIGIN, "http://localhost:3000"].filter(
  Boolean,
);

export const cspHandler = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      frameAncestors: [
        "'self'",
        process.env.FRONTEND_ORIGIN || "http://localhost:3000",
      ],
      formAction: ["'none'"],
    },
  },
});

export const corsHandler = cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
});
