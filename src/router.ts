import express from 'express'
import morgan from 'morgan'
import urlShorterRouter from './urlShorter'

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/public')
})

app.get('/h', (req, res) => {
  res.status(200).send('hello!')
})

app.get('/cev', (req, res) => {
  res.status(200).json({
    CUSTOM_ENV: process.env.CUSTOM_ENV,
  })
})

app.use('/r', urlShorterRouter)

export default app
