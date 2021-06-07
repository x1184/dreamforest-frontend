import { ActionContext } from 'vuex'

import { getUserByUserId } from '../../api/mine'
import { IPersonalProps } from './../../interface'

const initialState: IPersonalProps = {
  name: ''
}

export default {
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
    async queryUserByUserId (
      { commit }: ActionContext<IPersonalProps, any>
    ) {
      const response = await getUserByUserId()

      if (response.code) {
        commit('updatePersonalInformation', response.data)
      }
    }
  }
}
