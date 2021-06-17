import request from '../utils/request'

const MODULE = 'idea'

// 获取所有的想法
export async function getAllIdea (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/getAllIdea`,
    data
  })
}

// 新增想法
export async function addNewIdea (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/addNewIdea`,
    data
  })
}

// 获取想法详情
export async function getIdeaDetailById (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/getIdeaDetailById`,
    data
  })
}

// 根据标签id查询想法
export async function findIdeaByTagId (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/findIdeaByTagId`,
    data
  })
}

// 通过用户id查询用户关注的想法(分页)
export async function findAttentionIdeaByUserId (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/findAttentionIdeaByUserId`,
    data
  })
}

// 通过用户id查询用户点赞的想法(分页)
export async function findLikeIdeaByUserId (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/findLikeIdeaByUserId`,
    data
  })
}

// 点赞
export async function addLike (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/addLike`,
    data
  })
}

// 关注
export async function addStar (data: any) {
  return request({
    method: 'post',
    url: `/${MODULE}/addAttention`,
    data
  })
}
