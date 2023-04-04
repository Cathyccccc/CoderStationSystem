import instance from ".";

const getTypeListApi = () => {
  return instance.get('/api/type')
}

export {
  getTypeListApi,
}