import { createFetch } from '@vueuse/core'
import { ref, unref } from 'vue'
const url = ref(import.meta.env.PUBLIC_POKEAPI)
function getParams(params) {
  let data = ''
  for (const iterator of params) {
    for (const key in iterator)
      data += `${key}=${decodeURIComponent(iterator[key])}&`
  }
  return data.slice(0, -1)
}
const useFetchOptions = createFetch({
  baseUrl: unref(url),
  options: {
    async afterFetch({ response, data }: { response: Response; data: string | null }) {
      return {
        response,
        data: JSON.parse(data),
      }
    },
    async onFetchError({ data, response, error }: { data: string | null; response: Response | null; error: any }) {
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
/**
 * 产品提交接口
 * @param params
 * @param files
 * @returns
 */
export function productsSave(params: any, files: any) {
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
/**
 * 根据分享的id获取分享内容
 * @param id
 * @returns
 */
export function getShare(id: string) {
  return useFetchOptions(`/share/${id}`, {
    method: 'GET',
  })
}
/**
 * 提交分享
 * @param {Array<{q:'',a:''}>} params
 * @returns
 */
export function pushShare(params) {
  return useFetchOptions('/share/save', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
/**
 * 获取分享的列表
 * @param id
 * @returns
 */
export function shareList(id) {
  return useFetchOptions(`/share/${id}`, {
    method: 'GET',
  })
}
/**
 * 根据分组来获取所有的记录支持分页
 * @param { Object } params
 * @returns
 */
export function getPageOfChat(params) {
  return useFetchOptions('/openai/pageOfChat', {
    method: 'POST',
    body: JSON.stringify({
      page: 1,
      size: 1000,
      ...params,
    }),
  })
}
/**
 * 获取所有的分组列表
 * @returns
 */
export function loadChatGroup() {
  return useFetchOptions('/openai/loadChatGroup', {
    method: 'GET',
  })
}
/**
 * 聊天
 * @param params
 * @returns
 */
export function openaiComletions(...params: any[]) {
  const data = getParams(params)
  return useFetchOptions(`/openai/completions?${data}`, {
    method: 'GET',
  })
}

