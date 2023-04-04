class ErrorHandler extends Error {
  constructor( message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
//writing comment to make changes in git
module.exports = ErrorHandler; 