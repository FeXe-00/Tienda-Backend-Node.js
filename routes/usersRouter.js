const express = require('express');
const router = express.Router();

//parámetros query
router.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send("No hay parámetros");
  }
});

module.exports = router;
