import express from 'express'
import Ads from '../models/Ads.js'
import verifyToken from '../middlewares/verifyToken.js'
const router = express.Router()

//GET: localhost:3001/ads
router.get('/', async (req, res) => {
  try {
    const result = await Ads.find();
    res.send({ message: 'Ads fetched successfully', data: result });
  } catch (e) {
    res.send({ message: e.message })
  };
});

// router.get('/:id')
router.post('/post', verifyToken, async (req, res) => {
    try {
        const ad = new Ads(req.body)
        await ad.save()

        res.send({ message: 'Ad posted successfully' })
    } catch (e) {
        res.send({ message: e.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
  const result = await Ads.findById(req.params.id);
  res.send({ message: 'Single product fetched successully', data: result })
    } catch (e) {
        res.send({ message: e.message })
    };
});

router.get('/search/:search', async (req, res) => {
    try {
        const result = await Ads.find({ title: req.params.search });

        res.send({ message: 'Products fetched successully', data: result })
    } catch (e) {
        res.send({ message: e.message })
    };
});

router.put('/put/:id', async (req, res) => {
    try {
        await Ads.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: 'Products updated successully' });
    } catch (e) {
        res.send({ message: e.message })
    };
});

router.delete('/remove/:id', async (req, res) => {

    try {
        await Ads.findByIdAndDelete(req.params.id);

        res.send({ message: 'Products deleted successully' })

    } catch (e) {
        res.send({ message: e.message })
    };
});

export default router;
