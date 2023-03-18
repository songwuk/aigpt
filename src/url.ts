import { createFetch } from '@vueuse/core'
import { ref, unref } from 'vue'
import type { UseFetchReturn } from '@vueuse/core'
import type { OpenaiComletions, ProductsPageCondition } from './types'
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
    headers: {
      'Content-Type': 'application/json',
    },
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
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
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
export function loadChatGroup<T>(): Pick<UseFetchReturn<T>, 'data'> {
  return useFetchOptions('/openai/loadChatGroup', {
    method: 'GET',
  })
}
/**
 * 聊天
 * @param params
 * @returns
 */
export function openaiComletions<T>(...params: OpenaiComletions[]): Pick<UseFetchReturn<T>, 'data' | 'abort' | 'canAbort'> {
  const data = getParams(params)
  return useFetchOptions(`/openai/completions?${data}`, {
    method: 'GET',
  })
}
// "page": 1,
// "size": 10,
// "condition": {
//   "keyword": "text to video",
//   "product_categry": "AI Copywriter",
//   "product_model": "OpenAI CLIP",
//   "product_applications": "Website",
//   "product_generative_ai": "Text to Image"
// }
/**
 * 获取指定产品数据
 * @returns
 */
export function productsPage<T>(params: ProductsPageCondition): Pick<UseFetchReturn<T>, 'data'> {
  return useFetchOptions('/products/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      page: 1,
      size: 1000,
      ...params,
    }),
  })
}

/**
 * 获取首页菜单列表
 * @returns
 */
export function productsLoadCateg<T>(): Pick<UseFetchReturn<T>, 'data'> {
  return useFetchOptions('/products/loadCateg', {
    method: 'GET',
  })
}

/**
 *
 * 获取图片
 * @param id
 * @returns
 */
export function productsImage(id) {
  return `${unref(url)}/products/image/${id}`
}
/**
 * 获取喜爱的列表
 * @returns
 */
export function favoriteOfPage<T>(): Pick<UseFetchReturn<T>, 'data'> {
  return useFetchOptions('/products/member/favoriteOfPage', {
    method: 'POST',
    body: JSON.stringify({
      page: 1,
      size: 1000,
    }),
  })
}

/**
 * 获取历史的列表
 * @returns
 */
export function historyOfPage<T>(): Pick<UseFetchReturn<T>, 'data'> {
  return useFetchOptions('/products/member/historyOfPage', {
    method: 'POST',
    body: JSON.stringify({
      page: 1,
      size: 1000,
    }),
  })
}
/**
 * 获取当前产品的详情
 * @param id
 * @param user_id
 * @returns
 */
export function productsQuery<T>(id): Pick<UseFetchReturn<T>, 'data'> {
  return useFetchOptions(`/products/query/${id}`, {
    method: 'GET',
  })
}

/**
 * 登录
 * /account/login
 */
export function accountLogin(param) {
  return useFetchOptions('account/login', {
    method: 'POST',
    body: JSON.stringify(param),
  })
}

/**
 * /account/register
 * {
      nickName: 'Vicar',
      walletAddress: 'DZR5SGt4ktjKhXyrtf1fkGuBk5VXP2vGBTyAaepwJT1e',
      email: 'xxx@xx.xx',
      password: 'hXyrt3fkG.1e',
    }
 */
export function accountRegister(param) {
  return useFetchOptions('', {
    method: 'POST',
    body: JSON.stringify(param),
  })
}
