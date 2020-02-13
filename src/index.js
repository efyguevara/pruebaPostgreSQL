const pgp = require('pg-promise')(/*options*/);
const db = pgp("postgres://stefany:123456@localhost:5432/stefany");
const express = require('express');
const app = express();
const morgan = require('morgan');

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//MIDDLEWARES

//'dev': devuelve en la terminal los datos como tipo de peticion, status code,tiempo que tomo  y peso
app.use(morgan('dev'));

//si hay alguna app con html ccss y js; esto se usa para entender los datos de inputs y cosas asi que vengan en formularios.
app.use(express.urlencoded({extended: false}));

//permite que reciba y entienda el formato json
app.use(express.json());

// ROUTES
app.use(require('./routes/index'));
app.use('/api/dogs', require('./routes/dogs'));
app.use('/api/owners', require('./routes/owners'));


// starting server
app.listen(app.get('port'), () => {
  console.log(`server on port 3000, ${app.get('port')}`);
});


// db.any("SELECT * from dogs", 123)
//     .then(function (data) {
//         console.log("DATA:", data);
//     })
//     .catch(function (error) {
//         console.log("ERROR:", error);
//     });