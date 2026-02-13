import type { Request, Response, NextFunction } from 'express';
interface HttpError extends Error {
    statusCode?: number;
}

export const globalErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};