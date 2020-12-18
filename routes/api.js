const router = require('express').Router();
const yup = require('yup');
const { nanoid } = require('nanoid');
const { links } = require('../db');


const ID_SIZE = process.env.ID_SIZE ? parseInt(process.env.ID_SIZE, 10) : 5

const linkSchema = yup.object().shape({
  slug: yup.string().trim().matches(/[\w\-]/i),
  url: yup.string().trim().url().required()
});

router.get('/link/:slug', async (req, res) => {
  const { slug } = req.params;
  const link = await links.findOne({ slug });

  return res.json(link);
})

router.post('/link', async (req, res, next) => {
  let { slug, url } = req.body;

  try {
    await linkSchema.validate({
      slug,
      url
    })

    if (!slug)
      slug = nanoid(ID_SIZE);

    slug = slug.toLowerCase();

    await links.insert({ slug, url })

    res.json({ slug, url })

  } catch (error) {
    next(error);
  }
})

module.exports = router