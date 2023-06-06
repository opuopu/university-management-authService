import path from 'path'
import winston from 'winston'
const { combine, timestamp, prettyPrint, label } = winston.format

import DailyRotateFile from 'winston-daily-rotate-file'

export const infoLogger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: combine(timestamp(), label({ label: 'PH' }), prettyPrint()),

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'success',
        'university-s-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
})
export const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'errors',
        'university-s-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
})
