require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 3000

// MongoDbStore(session)

//DB connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB connected...');
}).catch(err => {
    console.log('DB failed...');
});
//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})
//Session congig
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: true,
    // cookie: { maxAge: 1000 * 60 * 24 } //24 hr
    cookie: { maxAge: 1000 * 60 * 24 } //24 hr
}))
app.use(flash())
// Assets kaha par rakhe h 
app.use(express.static('public'))
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})


// set template emgine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})



