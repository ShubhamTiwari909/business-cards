import helmet from 'helmet';
import cors from 'cors';

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

export const cspHandler = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'none'"],
            frameAncestors: ["'self'", FRONTEND_ORIGIN],
            formAction: ["'none'"],
        },
    },
})

export const corsHandler = cors({
    origin: FRONTEND_ORIGIN,
    optionsSuccessStatus: 200,
})