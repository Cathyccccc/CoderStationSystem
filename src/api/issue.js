import instance from ".";

// 分页获取问答数据（{ current：当前页，pageSize：每页条数，issueStatus：是否审核通过 }）参数为query
const getIssueListApi = (params) => {
  return instance.get('/api/issue/', {
    params
  })
}

// 根据id查找问答
const getIssueByIdApi = (id) => {
  return instance.get(`/api/issue/${id}`)
}

// 修改某个问答
const updateIssueApi = (id, params) => {
  return instance.patch(`/api/issue/${id}`, params)
}

// 新增问答
const addIssueApi = (data) => {
  return instance.post('/api/issue/', data)
}

export {
  getIssueListApi,
  getIssueByIdApi,
  updateIssueApi,
  addIssueApi,
}