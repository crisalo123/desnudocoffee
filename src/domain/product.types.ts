export type ProductCategory = 'coffee' | 'membership'

export interface Product {
  readonly id: string
  readonly category: ProductCategory
  readonly featured?: boolean
}
