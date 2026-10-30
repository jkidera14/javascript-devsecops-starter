export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found.',
      requestId: req.id,
    },
  });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const status = Number.isInteger(err.status) && err.status >= 400 && err.status <= 599
    ? err.status
    : 500;

  // Detailed errors belong in controlled server logs, never in API responses.
  req.log?.[status >= 500 ? 'error' : 'warn'](
    { err, requestId: req.id, status },
    'Request failed',
  );

  res.status(status).json({
    error: {
      code: status >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
      message: status >= 500 ? 'An unexpected error occurred.' : 'The request could not be processed.',
      requestId: req.id,
    },
  });
}
