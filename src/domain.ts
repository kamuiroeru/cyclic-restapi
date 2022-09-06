// FYI: https://github.com/cyclic-software/db-sdk#collection-items
export type PropsBase = {
  created: string
  updated: string
}
export type CyclicCollectionItem<T> = {
  collection: string
  key: string
  props: T & PropsBase
  $index?: string[]
}

export type Record = {
  id: string
  origin: string
}
