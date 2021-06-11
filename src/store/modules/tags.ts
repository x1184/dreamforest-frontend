import { ActionContext } from 'vuex'

import {
  findAll
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
    }
  }
}
