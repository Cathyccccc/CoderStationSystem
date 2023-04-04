import instance from '.';

// 获取所有类型的面试题标题
const getInterviewTitleApi = () => {
  return instance.get('/api/interview/interviewTitle')
}

// 根据id获取某个面试题信息
const getInterviewByIdApi = (id) => {
  return instance.get(`/api/interview/${id}`)
}

// 分页获取面试题数据
const getInterviewByPageApi = (params) => {
  return instance.get('/api/interview/', {
    params
  })
}

export {
  getInterviewTitleApi,
  getInterviewByIdApi,
  getInterviewByPageApi,
}