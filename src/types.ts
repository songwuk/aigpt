import type { Ref } from 'vue'

export interface OpenAiFetchController {
  abort: () => void
  data: null | Record<string, any>
  canAbort: Ref
}
