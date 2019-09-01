import request from '@/utils/request'

const URL = {
  GET_LIST: '/blog',
  GET_BLOG_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPDATE: '/blog/:blogId',
  DELETE: '/blog/:blogId',
  GET_USER_BLOGS: '/user/:userId/blogs'
}

export default {
  getBlogs({ page = 1, tag = [] } = { page: 1, tag: [] }) {
    return request(URL.GET_LIST, 'GET', { page, tag })
  },

  getBlogsByUserId({ userId, tag = [], page = 1 }) {
    return request(URL.GET_USER_BLOGS.replace(':userId', userId), 'GET', { page, tag })
  },

  getBlogDetail({ blogId }) {
    return request(URL.GET_BLOG_DETAIL.replace(':blogId', blogId))
  },

  updateBlog({ blogId, title, content, description }) {
    return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', { title, content, description })
  },

  deleteBlog({ blogId }) {
    return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
  },

  createBlog({ title = '', content = '', description = '', user_id, tags }) {
    console.log(JSON.stringify(tags))
    return request(URL.CREATE, 'POST', { title, content, description, user_id, tags: JSON.stringify(tags) })
  }
}
