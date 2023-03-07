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

export interface ReturnData {
  code: number
  data: Record<string, any>
  msg: string
}
