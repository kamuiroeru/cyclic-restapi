// FYI: https://github.com/cyclic-software/db-sdk#collection-items
type PropsBase = {
  created: string
  updated: string
}
type CyclicCollectionItemBase<T> = {
  collection: string
  key: string
  props: PropsBase & Content
  $index?: string[]
}

type Content = {
  id: string
  origin: string
}

export type CyclicCollectionItem = CyclicCollectionItemBase<Content>
export type Record = PropsBase & Content
