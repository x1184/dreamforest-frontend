import request from '../utils/request'

const MODULE_NAME = 'explore'

// 所有的标签
export async function getAllTagsByUserId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getAllTagsByUserId`,
    data: params
  })
}

// 个人的标签偏好设置
export async function updateUserPreferTags (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/updateUserPreferTags`,
    data: params
  })
}

// 通过标签查询 idea
export async function getAllIdeaByTags (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getAllIdeaByTags`,
    data: params
  })
}

// 通过 ideaId 查询 idea 详情
export async function getDetailsByIdeaId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getDetailsByIdeaId`,
    data: params
  })
}

// 发送评论
export async function addCommentByIdeaId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/addCommentByIdeaId`,
    data: params
  })
}

// 添加想法
export async function addIdeaByUserId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/addIdeaByUserId`,
    data: params
  })
}

// 添加项目
export async function addProjectByUserId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/addProjectByUserId`,
    data: params
  })
}

// 查询所有标签
export async function getCommentsByIdeaId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getCommentsByIdeaId`,
    data: params
  })
}

// 点赞和关注
export async function updateLikeOrFavoriteByIdeaId (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/updateLikeOrFavoriteByIdeaId`,
    data: params
  })
}
