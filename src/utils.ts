// import { OAuth2Client } from 'google-auth-library'
// const client = new OAuth2Client(
//   {
//     clientId: '982800757040-brbfkric972d87u7uvku4st4iu37i1ni.apps.googleusercontent.com',
//     clientSecret: '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',
//     redirectUri: 'http://localhost',
//   },
// )

// // Call this function to validate OAuth2 authorization code sent from client-side
// export async function verifyCode(code) {
//   const { tokens } = await client.getToken(code)
//   client.setCredentials({ access_token: tokens.access_token })
//   const userinfo = await client.request({
//     url: 'https://www.googleapis.com/oauth2/v3/userinfo',
//   })
//   return userinfo.data
// }

// verifyCode('AUTHORIZATION_CODE_FROM_CLIENT_SIDE').then((userInfo) => {
//   // use userInfo and do your server-side logics here
// }).catch((error) => {
//   // validation failed and userinfo was not obtained
// })

export class NumUtils {
  static formatWithK(num) {
    const absNum = Math.abs(num) // 取绝对值
    if (absNum >= 1000000) { // 大于等于100万
      return `${(num / 1000000).toFixed(1)}M`
    }
    else if (absNum >= 1000) { // 大于等于1千
      return `${(num / 1000).toFixed(1)}k`
    }
    else {
      return num.toString()
    }
  }
}
