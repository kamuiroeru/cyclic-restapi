import { generateUuidV4 } from './utils'

const generateId = (): string => {
  return generateUuidV4().slice(0, 7)
}

const idToOriginStore: { [id: string]: string } = {}

export const select = (id: string): string => {
  return id in idToOriginStore ? idToOriginStore[id] : null
}

export const insert = (origin: string): string => {
  const id = generateId()
  idToOriginStore[id] = origin
  return id
}
