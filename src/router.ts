import express from 'express'
import morgan from 'morgan'

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

app.get('/cev', (req, res) => {
  res.status(200).json({
    CUSTOM_ENV: process.env.CUSTOM_ENV,
  })
})

export default app
