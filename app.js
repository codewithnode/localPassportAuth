//Vars
const express = require('express');
const app = express();
const express_ejs_layout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

//Body Parser
app.use(express.urlencoded({ extended: false }))

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//DB
mongoose.connect(require('./config/keys').MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function () {
    console.log("Connected");
})

//Routes
app.use(express_ejs_layout);
app.set('view engine', 'ejs');

app.use(indexRoute);
app.use(usersRoute);

//Webserver
app.listen(3000, () => {
    return console.log("myself");
});