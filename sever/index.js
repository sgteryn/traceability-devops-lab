const express = require('express')
const path= require('path')
const app = express()
app.use(express.static("client"));

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'f13c46d5573945e4873b5ff767a5487c',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
})
const port = process.env.PORT || 4000 

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})