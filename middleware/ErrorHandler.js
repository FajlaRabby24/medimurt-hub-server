// errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error (can be enhanced with a logging library)

  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || undefined; // for validation errors, array/object

  // Hide stack trace and error details in production
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    // Don't leak internal error details in production
    if (statusCode === 500) {
      message = "Something went wrong! Please try again later.";
    }
    errors = undefined;
  } else {
    // In development, include stack trace for debugging
    message = err.message || message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: isProd ? undefined : err.stack,
  });
};

module.exports = errorHandler;
