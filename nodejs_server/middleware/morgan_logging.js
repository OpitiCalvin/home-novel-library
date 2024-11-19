const morgan = require("morgan");
const logger = require("../logging");

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      // configure morgan to user our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  }
);

module.exports = morganMiddleware;