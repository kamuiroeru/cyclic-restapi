import CyclicDB from 'cyclic-dynamodb'
import LRU from 'lru-cache'
import { CyclicCollectionItem, Record } from './domain'
import { generateUuidV4 } from './utils'

const db = CyclicDB(process.env.CYCLIC_DB)

// 500 record までメモリにキャッシュする
const cache = new LRU<string, Record | null>({
  maxSize: 500,
  sizeCalculation: (_v, _k) => 1,
})

export const _selectFromDynamoDB = async (
  id: string
): Promise<Record | null> => {
  const idToOrigin = db.collection('idToOrigin')
  const cyclicItem: CyclicCollectionItem = await idToOrigin.get(id)
  if (cyclicItem !== null) {
    return cyclicItem.props
  } else {
    return null
  }
}

const generateId = async (): Promise<string> => {
  // 重複の無い id を生成する
  while (true) {
    const id = generateUuidV4().slice(0, 7)
    // cache.get の結果が undefined or null かつ dynamodb にも無い
    if (!cache.get(id) && (await _selectFromDynamoDB(id)) === null) {
      return id
    }
    console.info('[ID Conflict]', id)
  }
}

export const select = async (id: string): Promise<Record | null> => {
  // キャッシュあり
  let record = cache.get(id)
  if (record === undefined) {
    record = await _selectFromDynamoDB(id)
    cache.set(id, record) // record が null だったとしても put
  } else {
    console.log('[Cache Hit]', id)
  }
  return record
}

export const insert = async (origin: string): Promise<string> => {
  const id = await generateId()
  const idToOrigin = db.collection('idToOrigin')
  await idToOrigin.set(id, {
    id,
    origin,
  })
  return id
}
