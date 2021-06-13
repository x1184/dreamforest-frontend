import { ActionContext } from 'vuex'

import {
  login,
  register,
  sendVerificationCodeByPhone,
  verifyPhoneByVerificationCode,
  sendVerificationCodeByEmail,
  verifyEmailByVerificationCode,
  updatePasswordByPhone,
  updatePasswordByOldPassword,
  findUserInfoByUserId
} from '../../apis/user'
import { IPersonalProps } from './../../interface'

const initialState: IPersonalProps = {
  name: ''
}

export default {
  namespaced: true,

  state: initialState,

  getters: {},

  mutations: {
    updatePersonalInformation (
      state: IPersonalProps,
      payload: IPersonalProps
    ): void {
      state = {
        ...state,
        ...payload
      }
    }
  },

  actions: {
    // 登陆
    async login (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ): Promise<void> {
      const response = await login(payload)

      if (response.code === 200) {
        localStorage.setItem('authorization', response)
      }

      return response
    },

    // 注册
    async register (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ): Promise<void> {
      const response = await register(payload)

      if (response.code === 200) {
        localStorage.setItem('authorization', response)
      }

      return response
    },

    // 通过用户 id 查询用户基本信息
    async findUserInfoByUserId (
      { commit }: ActionContext<IPersonalProps, any>
    ) {
      const response = await findUserInfoByUserId()

      commit('updatePersonalInformation', {
        payload: response
      })
    },

    // 通过手机号来发送验证码
    async sendVerificationCodeByPhone (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      const response = await sendVerificationCodeByPhone(payload)
      return response
    },

    // 通过验证码来判读手机号是否验证成功
    async verifyPhoneByVerificationCode (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      const response = await verifyPhoneByVerificationCode(payload)
      return response
    },

    // 通过邮箱来发送验证码
    async sendVerificationCodeByEmail (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      const response = sendVerificationCodeByEmail(payload)
      return response
    },

    // 通过验证码来验证邮箱是否认证
    async verifyEmailByVerificationCode (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      const response = await verifyEmailByVerificationCode(payload)
      return response
    },

    // 通过手机号修改密码
    async updatePasswordByPhone (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      const response = await updatePasswordByPhone(payload)
      return response
    },

    // 通过旧密码修改密码
    async updatePasswordByOldPassword (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      const response = updatePasswordByOldPassword(payload)
      return response
    }
  }
}
