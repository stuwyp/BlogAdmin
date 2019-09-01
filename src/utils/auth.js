// import Cookies from 'js-cookie'
//
// const TokenKey = 'vue_admin_template_token'
//
export function getToken() {
  return window.localStorage.getItem('jwt_token') !== ''
}

//
// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }
//
// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
