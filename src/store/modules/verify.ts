import { ActionContext } from 'vuex'
import {
  sendVerificationCodeByPhone,
  verifyPhoneByVerificationCode
} from '../../apis/user'

const initialState = {}

export default {
  namespaced: true,

  state: initialState,

  actions: {
    sendVerificationCodeByPhone (
      action: ActionContext<any, any>,
      payload: any
    ): any {
      return sendVerificationCodeByPhone(payload)
    },

    verifyPhoneByVerificationCode (
      action: ActionContext<any, any>,
      payload: any
    ): void {
      verifyPhoneByVerificationCode(payload)
    }
  }
}
