const pgp = require('pg-promise')( /*options*/ );
const db = pgp("postgres://stefany:123456@localhost:5432/stefany");

const {
  Router
} = require('express');

const router = Router();

router.get('/', (req, res) => {
  db.any("SELECT * from owners ORDER BY id ASC")
    .then(function (data) {
      return data;
    })
    .then(function (data) {

      const dbOwners = data;

      return res.json(dbOwners)
    })
})

router.post('/', (req, res) => {
  const {
    name,
    phone,
    address
  } = req.body;
  db.one(`INSERT INTO owners(name, phone, address) VALUES ('${name}', '${phone}', '${address}') RETURNING *`)
    .then(data => {
      console.log(data); // imprime la nueva identificación de usuario;
      const dbOwners = data;

      if (name && phone && address) {

        const newOwner = {
          ...req.body
        };

        dbOwners.push(newOwner)
        res.json(dbOwners);
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
    id,
    name,
    phone,
    address
  } = req.body;
  
  console.log(`UPDATE owners SET address = '${address}' WHERE id = ${id} RETURNING *`);
  console.log(req.body['name']);

  db.one(`UPDATE owners SET name = '${name}' WHERE id = ${id} RETURNING *`)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log('ERROR:', error);
    });
})

router.delete('/', (req, res) => {
  const {
    id,
    name,
    phone,
    address
  } = req.body;
  db.result(`DELETE FROM owners WHERE id = ${id} `)
    .then(result => {
      // rowCount = number of rows affected by the query
      console.log(result); // print how many records were deleted;
    })
    .catch(error => {
      console.log('ERROR:', error);
    });
})


module.exports = router;