import rateLimit from "express-rate-limit";

type DynamicLimiterOptions = {
  windowMs?: number;
};

function formatWindowMs(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  if (seconds >= 3600) {
    const hours = Math.ceil(seconds / 3600);
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  if (seconds >= 60) {
    const minutes = Math.ceil(seconds / 60);
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  }
  return seconds <= 1 ? "1 second" : `${seconds} seconds`;
}

export const dynamicLimiter = (
  limit: number,
  { windowMs = 1 * 60 * 1000 }: DynamicLimiterOptions,
) =>
  rateLimit({
    windowMs,
    max: () => {
      if (process.env.MODE === "development") {
        return 1000; // Higher limit for development
      }
      return limit; // Default limit for regular users
    },
    handler: (req, res) => {
      console.error(`Rate limit exceeded for IP: ${req.ip}`);
      const retryAfter = formatWindowMs(windowMs);
      res.status(429).json({
        message: `Too many requests, please try again later after ${retryAfter}`,
      });
    },
    statusCode: 429,
    standardHeaders: true,
    validate: {
      ip: true,
    },
  });
