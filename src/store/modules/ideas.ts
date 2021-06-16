import { ActionContext } from 'vuex'

import {
  addNewIdea,
  getAllIdea,
  findIdeaByTagId,
  findLikeIdeaByUserId,
  findAttentionIdeaByUserId
} from '../../apis/ideas'
import { IIdeaProps } from '../../interface'

interface IState {
  data: IIdeaProps[];
  total: number;
}

const initialState: IState = {
  data: [],
  total: 1
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
    },

    updateTotal (state: IState, payload: number) {
      state.total = payload
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
          commit('updateIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
        } else {
          commit('addIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
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
          commit('updateIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
        } else {
          commit('addIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
        }
      }
    },

    async findLikeIdeaByUserId (
      { commit }: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await findLikeIdeaByUserId(payload)

      if (response.code === 200) {
        if (payload.pageIndex === 1) {
          commit('updateIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
        } else {
          commit('addIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
        }
      }
    },

    async findAttentionIdeaByUserId (
      { commit }: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await findAttentionIdeaByUserId(payload)

      if (response.code === 200) {
        if (payload.pageIndex === 1) {
          commit('updateIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
        } else {
          commit('addIdeas', response.data.ideas)
          commit('updateTotal', response.data.total)
        }
      }
    },

    addNewIdea (
      action: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      addNewIdea(payload)
    }
  }
}
