import request from '@/utils/request'

const URL = {
  GLOBAL_SEARCH: '/blog/search'
}

export default {
  globalSearch({ content }) {
    console.log(content)
    return request(URL.GLOBAL_SEARCH, 'POST', { key: content })
  }
}
