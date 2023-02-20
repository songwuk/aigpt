import { useFetch } from '@vueuse/core'
import { reactive, ref } from 'vue'
export function ChatGet() {
  const submitFetch = ref('https://httpbin.org/get')
  const { isFetching, error, data, execute } = useFetch(submitFetch, { immediate: false })
  const responseData = reactive({
    isFetching,
    data,
    error,
    execute,
  })
  return responseData
}
