import express from 'express'

import adId from './adId.js'

import ads from './ads.js'

import users from './users.js'

import UserInfo from './userInfo.js';

import orders from './orders.js'

const router = express.Router()

    

router.use('/adId', adId)

router.use('/ads', ads)

router.use('/users', users)

router.use('/userinfo', UserInfo);

router.use('/orders', orders)



export default router
