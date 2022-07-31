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

const sweets = []

app.get('/', function(req, res) {
    rollbar.info('user accessed the main page')
    res.sendFile(path.join(__dirname, '../index.html'))
})


app.get('/api/sweets', (req, res) => {
    rollbar.info('somebody made a sweets list')
    res.status(200).send(sweets)
})

app.post('/api/sweets', (req, res) => {
   let {sweet} = req.body

   const index = students.findIndex(student => {
       return student === name
   })

   try {
       if (index === -1 && sweet !== '') {
           students.push(sweet)
           rollbar.log(`${sweet} added successfully`)
           res.status(200).send(sweets)
       } else if (sweet === ''){
            rollbar.warning('no sweet item was given')
           res.status(400).send('Please enter your favorite SWEET TOOTH satisfier.')
       } else {
        rollbar.critical('user tried adding a sweet item that already exists')
           res.status(400).send('That sweet item already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/sweets/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    sweets.splice(targetIndex, 1)
    rollbar.warning('sweet-tooth satisfier deleted')
    res.status(200).send(students)
})
const port = process.env.PORT || 5501

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})