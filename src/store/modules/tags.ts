import { ActionContext } from 'vuex'

import {
  findAll,
  updateUserTagsConfigByUserId
} from '../../apis/tags'
import { ITagProps } from '../../interface'

interface IState {
  data: ITagProps[];
}

const initialState: IState = {
  data: []
}

export default {
  namespaced: true,

  state: initialState,

  getters: {},

  mutations: {
    updateTags (state: IState, payload: ITagProps[]) {
      state.data = payload
    },

    updateTagShowById (state: IState, { id }: ITagProps) {
      const tag = state.data.find(tag => tag.id === id)
      if (tag) {
        tag.show = !tag?.show
      }
    }
  },

  actions: {
    async findAll (
      { commit }: ActionContext<IState, any>
    ) {
      const response = await findAll()

      if (response.code === 200) {
        commit('updateTags', response.data)
      }
    },

    async updateUserTagsConfigByUserId (
      { state }: ActionContext<IState, any>
    ) {
      await updateUserTagsConfigByUserId(state.data)
    }
  }
}
