import { ActionContext } from 'vuex'

import { login, register } from '../../apis/user'
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
    async login (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ): Promise<void> {
      const response = await login(payload)

      if (response.code === 200) {
        localStorage.setItem('authorization', response.data)
      }

      return response
    },

    async register (
      action: ActionContext<IPersonalProps, any>,
      payload: any
    ): Promise<void> {
      const response = await register(payload)

      if (response.code === 200) {
        localStorage.setItem('authorization', response.data)
      }

      return response
    }
  }
}
