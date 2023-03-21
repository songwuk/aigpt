import type { Ref } from 'vue'
export interface LoadingGroup {
  chatGroup: string
  count: number
}
export interface OpenaiComletions {
  group_id: string
  prompt: string
  user_id: string
}
export interface OpenAiFetchController {
  abort: () => void
  data: null | Record<string, any>
  canAbort: Ref
}
export interface dataModule {
  applications: categ[]
  categry: categ[]
  generativeAi: categ[]
  model: categ[]
}
interface categ {
  name: string
  count: number
}

export interface ReturnData {
  code: number
  data: Pick<dataModule, 'applications' | 'categry' | 'generativeAi' | 'model'>
  msg: string
}
export interface ReturnPageData {
  code: number
  data: Pick<ReturnPageDataList, 'productList' | 'total'>
  msg: string
}

export interface ReturnPageDataList {
  productList: Array<Record<string, any>>
  total: number
}
export interface ProductsPage {
  keyword: string
  product_categry: string
  product_model: string
  product_applications: string
  product_generative_ai: string
}

export interface ProductsPageCondition {
  condition: Partial<ProductsPage>
}
