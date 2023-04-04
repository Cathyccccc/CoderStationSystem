import instance from ".";

// 修改书籍/更新书籍信息
const updateBookApi = (id, params) => {
  return instance.patch(`/api/book/${id}`, params)
}

// 分页获取书籍
const getBookByPageApi = (params) => {
  return instance.get('/api/book', {
    params
  })
}

// 根据id获取书籍信息
const getBookByIdApi = (id) => {
  return instance.get(`/api/book/${id}`)
}

export {
  updateBookApi,
  getBookByPageApi,
  getBookByIdApi,
}