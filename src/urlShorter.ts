import { Router } from 'express'
import { insert, select } from './repository'

const router = Router()

router.get('/:id', (req, res) => {
  const id = req.params.id
  const origin = select(id)
  if (origin === null) {
    res.sendStatus(404)
    return
  }
  res.redirect(origin)
})

router.post('/', (req, res) => {
  const origin: string = req.body.origin
  if (origin === undefined) {
    res.status(400).send('"origin" value must be required.')
    return
  }

  const id = insert(origin)
  res.status(200).json({
    id,
  })
})

export default router
