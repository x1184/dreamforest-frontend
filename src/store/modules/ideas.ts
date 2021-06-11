import { ActionContext } from 'vuex'

import {
  getAllIdea,
  findIdeaByTagId
} from '../../apis/ideas'
import { IIdeaProps } from '../../interface'

interface IState {
  data: IIdeaProps[];
}

const initialState: IState = {
  data: []
}

export default {
  namespaced: true,

  state: initialState,

  getters: {},

  mutations: {
    updateIdeas (state: IState, payload: IIdeaProps[]) {
      state.data = payload
    },

    addIdeas (state: IState, payload: IIdeaProps[]) {
      state.data.push(...payload)
    }
  },

  actions: {
    async getAllIdea (
      { commit }: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await getAllIdea(payload)

      if (response.code === 200) {
        if (payload.pageIndex === 1) {
          commit('updateIdeas', response.data)
        } else {
          commit('addIdeas', response.data)
        }
      }
    },

    getIIdeaDetailById (
      actions: ActionContext<IIdeaProps, any>
    ) { },

    async findIdeaByTagId (
      { commit }: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await findIdeaByTagId(payload)

      if (response.code === 200) {
        if (payload.pageIndex === 1) {
          commit('updateIdeas', response.data)
        } else {
          commit('addIdeas', response.data)
        }
      }
    }
  }
}
