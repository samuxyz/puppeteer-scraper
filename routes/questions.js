const express = require('express');
const scraper = require('../lib/scaper');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { pages } = req.query;
  const questions = await scraper.scrapWebsite(pages);

  res.status(200).json({
    statusCode: 200,
    message: 'Questions correctly retrieved',
    data: { questions },
  });
});

module.exports = router;
