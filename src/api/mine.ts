import request from '../utils/request'

const MODULE_NAME = 'mine'

// 查询个人资料
export async function getUserByUserId () {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getUserByUserId`
  })
}

// 修改个人信息
export async function updateUserInformation (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/updateUserInformation`,
    data: params
  })
}

// 我的点赞
export async function getLikeByUserId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getLikeByUserId`,
    data: params
  })
}

// 关于
export async function getAbout (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getAbout`,
    data: params
  })
}
