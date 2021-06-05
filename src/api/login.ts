import request from '../utils/request'

const MODULE_NAME = 'login'

export async function getAbout (params: string[]) {
  return request({
    method: 'post',
    url: `/${MODULE_NAME}/getAbout`,
    data: params
  })
}
