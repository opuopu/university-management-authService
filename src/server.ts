import mongoose from 'mongoose'
import { app } from './app'
import config from './config/index'
async function main() {
  try {
    await mongoose.connect(config.dbUrl as string)
    app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`)
    })
    console.log('database connected')
  } catch (err) {
    console.log('failed to connect database')
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
