import CyclicDB from 'cyclic-dynamodb'
import { CyclicCollectionItem, PropsBase, Record } from './domain'
import { generateUuidV4 } from './utils'

const db = CyclicDB(process.env.CYCLIC_DB)

const generateId = (): string => {
  return generateUuidV4().slice(0, 7)
}

export const select = async (id: string): Promise<Record> => {
  const idToOrigin = db.collection('idToOrigin')
  const cyclicItem: CyclicCollectionItem = await idToOrigin.get(id)
  if (cyclicItem !== null) {
    return cyclicItem.props
  } else {
    return null
  }
}

export const insert = async (origin: string): Promise<string> => {
  const id = generateId()
  const idToOrigin = db.collection('idToOrigin')
  await idToOrigin.set(id, {
    id,
    origin,
  })
  return id
}
