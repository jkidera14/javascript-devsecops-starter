import { randomUUID } from 'node:crypto';

export function requestId(req, res, next) {
  // Do not trust arbitrary client-supplied IDs as the canonical internal ID.
  const id = randomUUID();
  req.id = id;
  res.setHeader('X-Request-ID', id);
  next();
}
