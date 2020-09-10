// initial konstanta
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// make object
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

const db = require("./src/models/index.js");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

//seed role data
function initial() {
  Role.create({
    id: 1,
    name: "admin"
  });
 
  Role.create({
    id: 2,
    name: "reseller"
  });
 
  Role.create({
    id: 3,
    name: "user"
  });
}

// parse request of Content-type - application/json
/**
 * that is mean for all request must give header content-type with parameter application/json
 */

 app.use(bodyParser.json());

 // parse request of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));

 // example simple route 
 app.get("/", (req, res) => {
     res.json({
         message: "welcome, hello world!"
     });
 });

 // routes
require('./src/routes/auth.routes.js')(app);
require('./src/routes/user.routes')(app);

 // define port
 const PORT = process.env.PORT || 8080;

 app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}.`);
 });