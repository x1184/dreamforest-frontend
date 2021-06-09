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
  }
}
