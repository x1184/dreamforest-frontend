import { ActionContext } from 'vuex'

import {
  IIdeaProps,
  ITagProps,
  ICommentProps,
  IProjectProps
} from '../../interface'
import {
  getAllTagsByUserId,
  updateUserPreferTags,
  getAllIdeaByTags,
  getDetailsByIdeaId,
  addCommentByIdeaId,
  addIdeaByUserId,
  addProjectByUserId,
  getCommentsByIdeaId,
  updateLikeOrFavoriteByIdeaId
} from '../../api/explore'

interface IStateProps {
  ideas: IIdeaProps[];
  tags: ITagProps[];
}

const initialState: IStateProps = {
  ideas: [],
  tags: []
}

export default {
  state: initialState,

  getters: {
    getIdeaById: (
      state: IStateProps,
      id: string
    ): IIdeaProps | undefined => {
      return state.ideas.find(idea => id === idea.id)
    },

    getShowTags: (
      state: IStateProps
    ): ITagProps[] => {
      return state.tags.filter(tag => tag.show)
    },

    getHiddenTags: (
      state: IStateProps
    ): ITagProps[] => {
      return state.tags.filter(tag => tag.show)
    }
  },

  mutations: {
    updateTags: (
      state: IStateProps,
      payload: ITagProps[]
    ) => {
      state.tags = payload
    },

    updateIdeas: (
      state: IStateProps,
      payload: IIdeaProps[]
    ) => {
      state.ideas = payload
    },

    updateIdeaById: (
      state: IStateProps,
      payload: IIdeaProps
    ) => {
      for (let i = 0; i < state.ideas.length; i++) {
        if (state.ideas[i].id === payload.id) {
          state.ideas[i] = payload
        }
      }
    }
  },

  actions: {
    // 通过 userId 来获取所有的标签
    async getAllTagsByUserId (
      { commit }: ActionContext<IStateProps, any>
    ) {
      const response = await getAllTagsByUserId()

      if (response.code === 200) {
        commit('updateTags', response.data)
      }
    },

    // 更新个人标签的偏好
    async updateUserPreferTags (
      { commit }: ActionContext<IStateProps, any>,
      payload: ITagProps[]
    ) {
      await updateUserPreferTags(payload)
    },

    // 通过 标签 来获取所有的 想法
    async getAllIdeaByTags (
      { commit }: ActionContext<IStateProps, any>,
      ids: string[]
    ) {
      const response = await getAllIdeaByTags(ids)

      if (response.code === 200) {
        commit('updateIdeas', response.data)
      }
    },

    // 通过 id 来获取 想法详情
    async getDetailsByIdeaId (
      { commit }: ActionContext<IStateProps, any>,
      id: string
    ) {
      const response = await getDetailsByIdeaId(id)

      if (response.code === 200) {
        commit('')
      }
    },

    // 发表评论
    async addCommentByIdeaId (
      action: ActionContext<IStateProps, any>,
      payload: ICommentProps
    ) {
      await addCommentByIdeaId(payload)
    },

    // 添加想法
    async addIdeaByUserId (
      action: ActionContext<IStateProps, any>,
      payload: IIdeaProps
    ) {
      await addIdeaByUserId(payload)
    },

    // 添加项目
    async addProjectByUserId (
      action: ActionContext<IStateProps, any>,
      payload: IProjectProps
    ) {
      await addProjectByUserId(payload)
    },

    // 通过 ideaId 查询评论
    async getCommentsByIdeaId (
      { commit }: ActionContext<IStateProps, any>,
      payload: string
    ) {
      const response = await getCommentsByIdeaId(payload)

      console.log(response)
    },

    // 更新项目点赞活着关注
    async updateLikeOrFavoriteByIdeaId (
      { commit }: ActionContext<IStateProps, any>,
      payload: any
    ) {
      await updateLikeOrFavoriteByIdeaId(payload)
    }
  }
}
