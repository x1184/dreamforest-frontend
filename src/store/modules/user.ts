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
    sendVerificationCodeByPhone (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      sendVerificationCodeByPhone(payload)
    },

    // 通过验证码来判读手机号是否验证成功
    verifyPhoneByVerificationCode (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      verifyPhoneByVerificationCode(payload)
    },

    // 通过邮箱来发送验证码
    sendVerificationCodeByEmail (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      sendVerificationCodeByEmail(payload)
    },

    // 通过验证码来验证邮箱是否认证
    verifyEmailByVerificationCode (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      verifyEmailByVerificationCode(payload)
    },

    // 通过手机号修改密码
    updatePasswordByPhone (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      updatePasswordByPhone(payload)
    },

    // 通过旧密码修改密码
    updatePasswordByOldPassword (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ) {
      updatePasswordByOldPassword(payload)
    }
  }
}
