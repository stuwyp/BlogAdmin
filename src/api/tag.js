import request from '@/utils/request'

const URL = {
  GET_LIST: '/tag'
}

export default {
  getTags({ limit = 10 } = { limit: 10 }) {
    return request(URL.GET_LIST, 'GET', { limit })
  }
}
