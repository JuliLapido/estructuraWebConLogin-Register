const {resolve} = require('path');
const {port,start} = require('./modules/server');
const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
const app = express();



app.listen(port, start());
app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(resolve(__dirname,'..','public')))
app.use(express.urlencoded({extended:true}))

app.use(require('./middlewares/styles'));

app.use(session({
    secret: 'express-users',
    resave: true,
    saveUninitialized: true
})) // agregar al request (req) la propiedad session / req.session

app.use(cookie()) // agregar al request (req) la propiedad cookies (req.cookie - leer una cookkie) y al responde (res) el metodo cookie() (agregar una cookie)

app.use(require('./middlewares/user'))

app.use(require("./routes/main.routes"))
app.use('/users',require('./routes/users.routes'))