import { Router } from 'express';

const router = Router();

router.get('/live', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/ready', (_req, res) => {
  // Add real dependency checks (database, queue, etc.) with strict timeouts.
  res.status(200).json({ status: 'ready' });
});

export default router;
