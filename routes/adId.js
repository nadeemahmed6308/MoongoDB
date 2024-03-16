import express from 'express';

import adId from '../models/adId.js';



const router = express.Router();



router.get('/', async (req, res) => {

    try {

    const result = await adId.findById('65da2a0185f19ee977ccb69e');

  res.send({ msg: 'ad id fetched successully', data: result });

    } catch (err) {

        res.send({ msg: err.message })

    };

});



router.get('/:newId', async (req, res) => {

    try {

        await adId.findByIdAndUpdate('65da2a0185f19ee977ccb69e', {

            adId: req.params.newId

        });



        res.send({ msg: 'ad id updated successully' });

    } catch (err) {

        res.send({ msg: err.message })

    };

});



export default router;

