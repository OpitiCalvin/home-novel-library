const winston = require("winston");
const { combine, timestamp, json, errors, colorize, printf } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss A",
    }),
    json()
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({
          format: "YYYY-MM-DD hh:mm:ss A",
        }),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: "./logs/combined.log",
    }),
    new winston.transports.File({
      filename: "./logs/app-error.log",
      level: "error",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "./logs/exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "./logs/rejections.log" }),
  ],
  exitOnError: false, // setup PM2 to restart node app after a crash and send out notification
});

module.exports = logger;
