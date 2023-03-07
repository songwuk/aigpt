import type { Ref } from 'vue'

export interface OpenaiComletions {
  chatGroup: number
  prompt: string
}
export interface OpenAiFetchController {
  abort: () => void
  data: null | Record<string, any>
  canAbort: Ref
}
