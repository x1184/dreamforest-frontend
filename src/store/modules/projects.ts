import { ActionContext } from 'vuex'

import {
  addProject,
  findProjectDetailByProjectId
} from '../../apis/projects'
import { IProjectProps } from '../../interface'

interface IState {
  data: IProjectProps;
}

const initialState: IState = {
  data: {
    title: '',
    content: ''
  }
}

export default {
  namespaced: true,

  state: initialState,

  getters: {},

  mutations: {
    updateProject (state: IState, payload: IProjectProps) {
      state.data = payload
    }
  },

  actions: {
    // 查询详情
    async findProjectDetailByProjectId (
      { commit }: ActionContext<IProjectProps, any>,
      payload: any
    ) {
      const response = await findProjectDetailByProjectId(payload)

      if (response.code === 200) {
        commit('updateProject', response.data)
      }
    },

    // 添加项目
    async addProject (
      action: ActionContext<IProjectProps, any>,
      payload: any
    ) {
      addProject(payload)
    }
  }
}
