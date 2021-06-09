import request from '../utils/request'

const MODULE = 'tags'

// 查询所有的标签
export async function findAll (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/findAll`,
    data
  })
}

// 通过用户id查询标签
export async function findTagsByUserId () {
  return request({
    method: 'post',
    url: `/${MODULE}/findTagsByUserId`
  })
}

// 通过用户id修改用户个人标签配置
export async function updateUserTagsConfigByUserId (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/updateUserTagsConfigByUserId`,
    data
  })
}
