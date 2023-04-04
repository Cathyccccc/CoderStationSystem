import instance from ".";

// 新增评论
const addCommentApi = (params) => {
  return instance.post('/api/comment', params)
}

// 获取某个问答的评论
const getIssueCommentApi = (id, params) => {
  return instance.get(`/api/comment/issuecomment/${id}`, {
    params
  })
}

// 获取某个书籍的评论
const getBookCommentApi = (id, params) => {
  return instance.get(`/api/comment/bookcomment/${id}`, {
    params
  })
}

export {
  addCommentApi,
  getIssueCommentApi,
  getBookCommentApi,
}