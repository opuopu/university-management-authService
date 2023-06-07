import { Server } from 'http'
import mongoose from 'mongoose'
import { app } from './app'
import config from './config/index'
import { errorLogger, infoLogger } from './shared/logger'

// uncaought error
process.on('uncaughtException', err => {
  errorLogger.error(err)

  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.dbUrl as string)
    server = app.listen(config.port, () => {
      infoLogger.info(`application listening on port ${config.port}`)
    })
    infoLogger.info('database connected')
  } catch (err) {
    errorLogger.error('failed to connect database')
  }

  process.on('unhandledRejection', error => {
    // console.log('server is closed')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    }
    {
      process.exit(1)
    }
  })
}

main()

// sigterm
process.on('SIGTERM', () => {
  infoLogger.info('Sigterm is received')
  if (server) {
    server.close()
  }
})
