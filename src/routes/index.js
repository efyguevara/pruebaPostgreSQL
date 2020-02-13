const {
  Router
} = require('express');
const router = Router();


// ROUTES
router.get('/', (req, res) => {
  res.json({
    "title": "First Page"
  })
})

router.get('/user', (req, res) => {
  const data = {
    "name": "Stefany",
    "lastName": "Guevara",
    "age": "28"
  }
  res.json(data)
})


module.exports = router;