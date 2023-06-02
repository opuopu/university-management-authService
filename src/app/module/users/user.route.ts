import express from 'express'
import { createUsers } from './user.controller'
export const router = express.Router()
router.post('/createuser', createUsers)
