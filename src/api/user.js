import request from '@/utils/request'

const URL = {
  GET_LIST: '/user',
  GET_BLOG_DETAIL: '/user/:userId',
  CREATE: '/user',
  UPDATE: '/user/:userId',
  DELETE: '/user/:userId',
  GET_USER_BLOGS: '/user/:userId/blogs'
}

export default {
  getUsers({ page = 1 } = { page: 1 }) {
    return request(URL.GET_LIST, 'GET')
  },

  getBlogsByUserId({ userId, page = 1 }) {
    return request(URL.GET_USER_BLOGS.replace(':userId', userId), 'GET', { page })
  },

  getUserDetail({ userId }) {
    return request(URL.GET_BLOG_DETAIL.replace(':userId', userId))
  },

  updateUser({ userId, title, content, description }) {
    return request(URL.UPDATE.replace(':userId', userId), 'PATCH', { name })
  },

  deleteUser({ userId }) {
    return request(URL.DELETE.replace(':userId', userId), 'DELETE')
  }

}
