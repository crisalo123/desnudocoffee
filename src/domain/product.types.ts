export type ProductCategory =
  | 'coffee'
  | 'membership'
  | 'chocolate'
  | 'merch'

export interface Product {
  readonly id: string
  readonly category: ProductCategory
  readonly featured?: boolean
}
