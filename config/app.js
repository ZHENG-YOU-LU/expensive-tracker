// require packages used in the project
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

//handlebars-helpers
const hbshelpers = require('handlebars-helpers')
const comparison = hbshelpers.comparison()

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// Define variables related to server and database
const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const port = process.env.PORT

// setting template engine
app.engine('hbs', exphbs({
	helpers: comparison, defaultLayout: 'main', extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	res.locals.success_msg = req.flash('success_msg')
	res.locals.warning_msg = req.flash('warning_msg')
	next()
})

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
	console.log(`Express is listening on localhost:${port}`)
})