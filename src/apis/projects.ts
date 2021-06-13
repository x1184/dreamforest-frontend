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

// 通过项目id查询项目详情
export async function findProjectDetailByProjectId (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/findProjectDetailByProjectId`,
    data
  })
}
