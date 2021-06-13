import { ActionContext } from 'vuex'

import {
  findProjectDetailByProjectId
} from '../../apis/projects'
import { IProjectProps } from '../../interface'

const initialState: IProjectProps = {}

export default {
  namespaced: true,

  state: initialState,

  getters: {},

  mutations: {
    updateProject (state: IProjectProps, payload: IProjectProps) {
      state = payload
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
    }
  }
}
