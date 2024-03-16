import express from 'express'
import Orders from '../models/Orders.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try{
    const orders = await Orders.find()
    res.send({ message: "Orders fetched successfully!", data: orders })
  }catch (e){
    res.send({ message: e.message })
  }
})

router.post('/add', async (req, res) => {
  try{
    await Orders.create(req.body)
    res.send({ message: "Orders added successfully!" })
  } catch (e) {
    res.send({ message: e.message })
  }
})

export default router
