import { createClient, SetOptions } from 'redis'
import config from '../config'
const redisClient = createClient({
  url: config.redis_url,
})
const redisPubClient = createClient({
  url: config.redis_url,
})
const redisSubClient = createClient({
  url: config.redis_url,
})
const connect = async (): Promise<void> => {
  await redisClient.connect()
  await redisPubClient.connect()

  await redisSubClient.connect()
}
redisClient.on('error', error => console.log('redisError', error))

redisClient.on('connect', () => console.log('redis connected'))

const set = async (
  key: string,
  value: string,
  options?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, options)
}
const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key)
}
const del = async (key: string): Promise<void> => {
  await redisClient.del(key)
}
const disconnect = async (): Promise<void> => {
  await redisClient.quit()
  await redisPubClient.quit()
  await redisSubClient.quit()
}
const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${userId}`
  const time = config.redis_token_expires_in
  const expiresInTime = time ? parseInt(time) : 30000

  await redisClient.set(key, token, { EX: expiresInTime })
}
const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`
  return await redisClient.get(key)
}

const deleteAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`
  await redisClient.del(key)
}
export const redisclient = {
  connect,
  set,
  get,
  del,
  disconnect,
  setAccessToken,
  getAccessToken,
  deleteAccessToken,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.subscribe.bind(redisSubClient),
}
