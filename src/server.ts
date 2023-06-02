import mongoose from 'mongoose'
import { app } from './app'
import config from './config/index'
import { errorLogger, infoLogger } from './shared/logger'
async function main() {
  try {
    await mongoose.connec(config.dbUrl as string)
    app.listen(config.port, () => {
      infoLogger.info(`application listening on port ${config.port}`)
    })
    infoLogger.info('database connected')
  } catch (err) {
    errorLogger.error('failed to connect database')
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
