const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
  
    // Handle specific error types and return appropriate responses
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    // General error response for unhandled errors
    res.status(500).json({ error: err.mesage || 'Internal server error' });
  };
  
  module.exports = errorHandler;
  