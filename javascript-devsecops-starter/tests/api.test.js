import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('health endpoints', () => {
  it('reports liveness', async () => {
    const response = await request(app).get('/health/live');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('sets security headers and request ID', async () => {
    const response = await request(app).get('/health/live');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-request-id']).toBeTruthy();
  });
});

describe('POST /api/v1/echo', () => {
  it('accepts a valid payload', async () => {
    const response = await request(app)
      .post('/api/v1/echo')
      .send({ message: 'secure by design' });

    expect(response.status).toBe(200);
    expect(response.body.data.message).toBe('secure by design');
  });

  it('rejects unknown properties', async () => {
    const response = await request(app)
      .post('/api/v1/echo')
      .send({ message: 'hello', isAdmin: true });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects oversized messages', async () => {
    const response = await request(app)
      .post('/api/v1/echo')
      .send({ message: 'x'.repeat(501) });

    expect(response.status).toBe(400);
  });

  it('does not expose stack traces for unknown routes', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.status).toBe(404);
    expect(JSON.stringify(response.body)).not.toContain('stack');
  });
});
