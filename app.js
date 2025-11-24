
const express = require('express')
const colors = require('ansi-colors')
const app = express()
const port = 3010

// middleware
app.use(express.static('public'))
app.use(express.json())

// routes
app.use('/api/v1', require('./routes/api/v1/games'))
app.use('/', require('./routes/pages/games'))

// server
const url = colors.blue('http://localhost:3010/')
const message = `Server is running on port ${port}. Visit ${url} in your browser.`
app.listen(port, () => console.log(message))