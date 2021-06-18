import { ActionContext } from 'vuex'

import {
  addLike,
  addStar,
  addNewIdea,
  getAllIdea,
  findIdeaByTagId,
  getIdeaDetailById,
  findCommentByIdeaId,
  findLikeIdeaByUserId,
  findAttentionIdeaByUserId,
  addCommentByUserIdAndIdeaId,
  updateAttentionIdeaByUserId,
  updateAllAttentionIdeaByUserId
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

    async getIdeaDetailById (
      actions: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await getIdeaDetailById(payload)

      if (response.code === 200) {
        return response.data
      }
    },

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
    },

    async addLike (
      action: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await addLike(payload)

      if (response.code === 200) {
        return response
      }
    },

    async addStar (
      action: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await addStar(payload)

      if (response.code === 200) {
        return response
      }
    },

    // 查询评论
    async findCommentByIdeaId (
      action: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await findCommentByIdeaId(payload)

      if (response.code === 200) {
        return response.data
      }
    },

    // 添加评论
    async addCommentByUserIdAndIdeaId (
      action: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await addCommentByUserIdAndIdeaId(payload)
      return response
    },

    // 取消全部关注
    async updateAllAttentionIdeaByUserId () {
      const response = await updateAllAttentionIdeaByUserId()

      if (response.code === 200) {
        return response
      }
    },

    // 取消关注
    async updateAttentionIdeaByUserId (
      action: ActionContext<IIdeaProps, any>,
      payload: any
    ) {
      const response = await updateAttentionIdeaByUserId(payload)

      if (response.code === 200) {
        return response
      }
    }
  }
}
