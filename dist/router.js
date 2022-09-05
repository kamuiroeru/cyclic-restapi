const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
  })
})

app.get('/h', (req, res) => {
  res.status(200).send('hello!')
})

module.exports = app
