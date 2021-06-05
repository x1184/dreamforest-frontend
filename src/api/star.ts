import request from '../utils/request'

const MODULE_NAME = 'star'

// 根据用户id查询关注想法
export async function getAllIdeaByUserId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getAllIdeaByUserId`,
    data: params
  })
}

// 根据用户id查询关注想法
export async function cancelStar (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/cancelStar`,
    data: params
  })
}
