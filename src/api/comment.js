import request from '@/utils/request'

const URL = {
  GET_LIST: '/comment',
  GET_COMMENT_DETAIL: '/comment/:commentId',
  CREATE: '/comment',
  UPDATE: '/comment/:commentId',
  DELETE: '/comment/:commentId',
  GET_LIST_BY_USER: '/user/:userId/comments',
  GET_LIST_BY_BLOG: '/blog/:blogId/comments'
}

export default {
  getCommentsByBlogId({ blogId, page = 1 }) {
    return request(URL.GET_LIST_BY_BLOG.replace(':blogId', blogId), 'GET', { page })
  },

  getCommentsByUserId({ userId, page = 1 }) {
    return request(URL.GET_LIST_BY_USER.replace(':userId', userId), 'GET', { page })
  },

  getCommentDetail({ commentId }) {
    return request(URL.GET_COMMENT_DETAIL.replace(':commentId', commentId))
  },

  createComment({ content, blog_id, user_id }) {
    // console.log(content, blog_id, user_id)
    return request(URL.CREATE, 'POST', { content, blog_id, user_id })
  }
}
