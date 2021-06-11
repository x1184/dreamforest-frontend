import request from '../utils/request'

const MODULE = 'user'

// 新增用户
export async function register (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/register`,
    data
  })
}

// 通过手机号来发送验证码
export async function sendVerificationCodeByPhone (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/sendVerificationCodeByPhone`,
    data
  })
}

// 通过验证码来判读手机号是否验证成功
export async function verifyPhoneByVerificationCode (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/verifyPhoneByVerificationCode`,
    data
  })
}

// 通过邮箱来发送验证码
export async function sendVerificationCodeByEmail (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/sendVerificationCodeByEmail`,
    data
  })
}

// 通过验证码来验证邮箱是否认证
export async function verifyEmailByVerificationCode (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/verifyEmailByVerificationCode`,
    data
  })
}

// 通过手机号修改密码
export async function updatePasswordByPhone (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/updatePasswordByPhone`,
    data
  })
}

// 通过旧密码修改密码
export async function updatePasswordByOldPassword (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/updatePasswordByOldPassword`,
    data
  })
}

// 查询个人信息
export async function findUserInfoByUserId () {
  return request({
    method: 'POST',
    url: `/${MODULE}/findUserInfoByUserId`
  })
}

// 登录
export async function login (data: any) {
  return request({
    method: 'POST',
    url: `/${MODULE}/login`,
    data
  })
}
