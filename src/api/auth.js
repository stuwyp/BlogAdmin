import request from '@/utils/request'

export default {

  login(data) {
    return request('/auth/login', 'POST', data)
  },

  getInfo() {
    return request('/auth/info', 'POST')
  },

  logout() {
    return request('/auth/logout', 'POST')
  },

  register({ username, password, email }) {
    // console.log(email)
    return request('/auth/register', 'POST', { username, password, email })
  }
}
