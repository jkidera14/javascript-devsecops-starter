import { config } from './config/env.js';
import { createApp, logger } from './app.js';

const app = createApp();

const server = app.listen(config.PORT, config.HOST, () => {
  logger.info({ host: config.HOST, port: config.PORT, environment: config.NODE_ENV }, 'API listening');
});

function shutdown(signal) {
  logger.info({ signal }, 'Shutdown requested');
  server.close((error) => {
    if (error) {
      logger.error({ err: error }, 'Graceful shutdown failed');
      process.exitCode = 1;
    }
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
