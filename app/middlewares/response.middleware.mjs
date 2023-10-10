// responseHandler.js

export const responseHandler = (req, res, next) => {
  res.success = (data, message = "Operation successful", statusCode = 200) => {
    res.status(statusCode).json({
      status: "SUCCESS",
      message: message,
      data: data,
    });
  };

  res.error = (error, statusCode = 400) => {
    error.status = statusCode; // Assign the status code to the error instance
    next(error); // Pass the error to the next middleware (your error handler)
  };

  next();
};
