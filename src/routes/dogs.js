const pgp = require('pg-promise')( /*options*/ );
const db = pgp("postgres://stefany:123456@localhost:5432/stefany");

const {
  Router
} = require('express');
const router = Router();


router.get('/', (req, res) => {
  db.any("SELECT * from dogs ORDER BY id ASC")
    .then(function (data) {
      return data;
    })
    .then(function (data) {
      console.log("DATA:", data);
      const dbDogs = data;

      return res.json(dbDogs)
    })
})

router.post('/', (req, res) => {

  const {
    name,
    breed,
    color,
    birthdate
  } = req.body;
  db.one(`INSERT INTO dogs(name, breed, color, birthdate) VALUES ('${name}', '${breed}', '${color}', '${birthdate}') RETURNING *`)
    .then(data => {
      console.log(data);

      const dbDogs = data;

      if (name && breed && color && birthdate) {

        const newDog = {
          ...req.body
        };

        dbDogs.push(newDog)
        res.json(dbDogs);
        console.log("DATA:", data);
      } else {
        res.status(500).json({
          error: "Ha ocurrido un error"
        })
      }
    })
    .catch(error => {
      console.log(' ERROR: ', error); // error de impresión; 
    });
});

router.put('/', (req, res) => {
  const {
    name,
    breed,
    color,
    birthdate
  } = req.body;

  db.one(`UPDATE dogs SET breed = '${breed}' WHERE id = ${id} RETURNING *`)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log('ERROR:', error);
    });
})

module.exports = router;