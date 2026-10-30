import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { config } from './config/env.js';
import { requestId } from './middleware/request-id.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import healthRouter from './routes/health.js';
import v1Router from './routes/v1.js';

export const logger = pino({
  level: config.LOG_LEVEL,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'res.headers["set-cookie"]',
      '*.password',
      '*.token',
      '*.secret',
    ],
    censor: '[REDACTED]',
  },
});

export function createApp() {
  const app = express();

  if (config.TRUST_PROXY) {
    // Set only when the service is actually behind a known trusted proxy.
    app.set('trust proxy', 1);
  }

  app.disable('x-powered-by');
  app.use(requestId);
  app.use(pinoHttp({
    logger,
    customProps: (req) => ({ requestId: req.id }),
    // Avoid logging request bodies, cookies, or authorization headers.
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url, remoteAddress: req.remoteAddress };
      },
    },
  }));

  app.use(helmet());
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin && origin === config.CORS_ORIGIN) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Request-ID');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(origin === config.CORS_ORIGIN ? 204 : 403);
    next();
  });

  app.use(express.json({
    limit: '16kb',
    strict: true,
    type: 'application/json',
  }));

  app.use(rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: { code: 'RATE_LIMITED', message: 'Too many requests.' } },
  }));

  app.use('/health', healthRouter);
  app.use('/api/v1', v1Router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
