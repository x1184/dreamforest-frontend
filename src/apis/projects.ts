import request from '../utils/request'

const MODULE = 'project'

// 添加项目
export async function addProject (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/addProject`,
    data
  })
}

// findProjectDetailByProjectId
export async function findProjectDetailByProjectId (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/findProjectDetailByProjectId`,
    data
  })
}
