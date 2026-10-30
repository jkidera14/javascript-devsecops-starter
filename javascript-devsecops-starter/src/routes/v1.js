import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const echoSchema = z.object({
  message: z.string().trim().min(1).max(500),
}).strict();

router.post('/echo', (req, res) => {
  const result = echoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request body is invalid.',
        fields: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          code: issue.code,
        })),
        requestId: req.id,
      },
    });
  }

  return res.status(200).json({ data: { message: result.data.message } });
});

export default router;
