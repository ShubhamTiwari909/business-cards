import type { Request, Response, NextFunction } from "express";
interface HttpError extends Error {
  statusCode?: number;
}

export const globalErrorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message;
  if (process.env.NODE_ENV !== "production" && err.stack) {
    console.error(err.stack);
  }
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
