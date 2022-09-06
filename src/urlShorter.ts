import { Router } from 'express'
import path from 'path'
import { insert, select } from './repository'
import { utcToJst } from './utils'

const router = Router()

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const record = await select(id)
  if (record === null) {
    res.sendFile(path.join(__dirname, '..', 'public', 'notfound.html'))
    return
  }
  res.redirect(record.origin)
})

router.post('/', async (req, res) => {
  const origin: string = req.body.origin
  if (origin === undefined) {
    res.status(400).send('"origin" value must be required.')
    return
  }

  const id = await insert(origin)
  res.status(200).json({
    id,
  })
})

router.get('/info/:id', async (req, res) => {
  const id = req.params.id
  const record = await select(id)
  if (record === null) {
    res.sendStatus(404)
    return
  }
  record.created = utcToJst(record.created)
  record.updated = utcToJst(record.updated)
  res.status(200).json(record)
})

export default router
