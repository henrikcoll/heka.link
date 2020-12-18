const router = require('express').Router();
const { links } = require('../db');

router.get('/:short', async (req, res) => {
  const { slug } = req.params;
  const link = await links.find({ slug });

  return res.json(link);
})

router.get('/', (req, res) => {
  res.json({
    message: 'heka.link'
  });
})

module.exports = router