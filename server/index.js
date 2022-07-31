require('dotenv').config()
const express = require('express')
const path= require('path')
const app = express()

app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})
console.log(rollbar)
// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
})
const port = process.env.PORT || 5501

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})