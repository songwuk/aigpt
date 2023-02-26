import { createFetch } from '@vueuse/core'
import { ref } from 'vue'
const url = ref('https://test-api.aigpt.me')
const useFetchOptions = createFetch({
  baseUrl: url.value,
  options: {
    async afterFetch<T>({ response, data }: { response: Response; data: T | null }) {
      return {
        response,
        data,
      }
    },
    async onFetchError<T>({ data, response, error }: { data: T | null; response: Response | null; error: any }) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        data,
        response,
        error,
      }
    },
  },
  // fetchOptions: {
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // },
})
export function uploadFile(file: File) {
  const fd = new FormData()
  fd.append('product_logo', file)
  return useFetchOptions('/products/save', {
    method: 'POST',
    body: fd,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export function productssave(params: any, files: any) {
  const fd = new FormData()
  if (files.product_logo)
    fd.append('product_logo', files.product_logo)
  if (files.product_imgs1)
    fd.append('product_imgs', files.product_imgs1)
  if (files.product_imgs2)
    fd.append('product_imgs', files.product_imgs2)
  let url = ''
  for (const key in params)
    url += `&${key}=${params[key]}`
  return useFetchOptions(`/products/save?${url.substring(1)}`, {
    method: 'POST',
    body: fd,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
  })
}
