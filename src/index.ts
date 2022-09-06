import dotenv from 'dotenv'
dotenv.config()

import app from './router'
import { now } from './utils'

app.get('/now', (req, res) => {
  res.status(200).json({
    now: now(),
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.info('APP Started.')
})
