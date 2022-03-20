import ErrorCodes from '../errors/ErrorCodes';
import ErrorBase from '../errors/ErrorBase';

const globalErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Handling of body-parser content malformed error
  if (err.type === 'entity.parse.failed') {
    return res.status(400).send({
      errorCode: ErrorCodes.MALFORMED_JSON_ERROR_CODE,
      message: 'Malformed json'
    });
  }

  if (err instanceof ErrorBase) {
    const error = err;

    return res.status(error.getHttpStatusCode()).send({
      errorCode: error.getErrorCode(),
      message: error.getMessage()
    });
  } else {
    return res.status(500).send({
      errorCode: ErrorCodes.RUNTIME_ERROR_CODE,
      message: 'Internal Server Error'
    });
  }
}

export default globalErrorHandler;