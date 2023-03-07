import type { Ref } from 'vue'
export interface LoadingGroup {
  chatGroup: string
  count: number
}
export interface OpenaiComletions {
  chatGroup: number
  prompt: string
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

