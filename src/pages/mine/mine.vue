<template>
  <div>
    <df-header>
      <template #left>
        <van-icon
          name="arrow-left"
          @click="handleGoback"
        />
      </template>

      <template #title>
        个人信息
      </template>

      <template #right>
        <van-button
          size="small"
          @click="handleModify"
        >
          修改
        </van-button>
      </template>
    </df-header>

    <div>
      <df-personal-card
        type="createTime"
        :user="user"
      ></df-personal-card>

      <van-cell-group>
        <van-cell title="手机号">
          <span>{{ user.phone }}</span>
          <template #right-icon>
            <van-icon
              name="edit"
              size="25px"
              @click="popup.confirmPhone = true"
            />
          </template>
        </van-cell>

        <van-cell title="邮箱">
          <span>{{ user.email }}</span>
          <template #right-icon>
            <van-icon
              name="edit"
              size="25px"
              @click="popup.newEmail = true"
            />
          </template>
        </van-cell>

        <van-cell title="密码">
          <template #right-icon>
            <van-icon
              name="edit"
              size="25px"
              @click="popup.modifyMethod = true"
            />
          </template>
        </van-cell>

        <van-cell
          title="介绍"
          :value="user.description"
        />
      </van-cell-group>
    </div>

    <van-popup
      round
      class="popup"
      position="bottom"
      v-model:show="popup.newEmail"
      @close="handleCloseNewEmailPopup"
    >
      <div class="popup-container">
        <div class="popup-title">
          新邮箱
        </div>
        <van-field
          type="email"
          name="phone"
          label="邮箱"
          placeholder="请输入您的新邮箱"
          v-model="form.email"
          @change="verify('email')"
        />

        <div class="login-popup-button">
          <van-button
            round
            type="primary"
            :disabled="timing.email.disabled"
            @click="sendVerifyCode('email')"
          >发送验证码（{{ timing.email.time }}s）</van-button>
        </div>

        <div class="login-input-group">
          <van-password-input
            length="6"
            :mask="false"
            :gutter="10"
            :value="form.verifyCode"
            :focused="popup.keyboard"
            @focus="handleOpenKeyboard('email')"
          />
          <van-number-keyboard
            maxlength="6"
            v-model="form.verifyCode"
            :show="popup.keyboard"
            @blur="handleCloseKeyboard"
          />
        </div>
      </div>
    </van-popup>

    <van-popup
      round
      class="popup"
      position="bottom"
      v-model:show="popup.confirmPhone"
      @close="handleCloseConfirmPhonePopup"
    >
      <div class="popup-container">
        <div class="popup-title">
          确认当前操作
        </div>
        <van-field
          type="tel"
          name="phone"
          label="手机号"
          placeholder="请输入您的手机号"
          v-model="form.confirmPhone"
          @change="verify('confirmPhone')"
        />

        <div class="login-popup-button">
          <van-button
            round
            type="primary"
            :disabled="timing.confirmPhone.disabled"
            @click="sendVerifyCode('confirmPhone')"
          >发送验证码（{{ timing.confirmPhone.time }}s）</van-button>
        </div>

        <div class="login-input-group">
          <van-password-input
            length="6"
            :mask="false"
            :gutter="10"
            :value="form.verifyCode"
            :focused="popup.keyboard"
            @focus="handleOpenKeyboard('confirmPhone')"
          />
          <van-number-keyboard
            maxlength="6"
            v-model="form.verifyCode"
            :show="popup.keyboard"
            @blur="handleCloseKeyboard"
          />
        </div>
      </div>
    </van-popup>

    <van-popup
      round
      class="popup"
      position="bottom"
      v-model:show="popup.newPhone"
      @close="handleCloseNewPhonePopup"
    >
      <div class="popup-container">
        <div class="popup-title">
          新手机号
        </div>
        <van-field
          type="tel"
          name="phone"
          label="手机号"
          placeholder="请输入您的新手机号"
          v-model="form.phone"
          @change="verify('phone')"
        />

        <div class="login-popup-button">
          <van-button
            round
            type="primary"
            :disabled="timing.phone.disabled"
            @click="sendVerifyCode('phone')"
          >发送验证码（{{ timing.phone.time }}s）</van-button>
        </div>

        <div class="login-input-group">
          <van-password-input
            length="6"
            :mask="false"
            :gutter="10"
            :value="form.verifyCode"
            :focused="popup.keyboard"
            @focus="handleOpenKeyboard('phone')"
          />
          <van-number-keyboard
            maxlength="6"
            v-model="form.verifyCode"
            :show="popup.keyboard"
            @blur="handleCloseKeyboard"
          />
        </div>
      </div>
    </van-popup>

    <van-popup
      round
      class="popup"
      position="bottom"
      v-model:show="popup.modifyMethod"
    >
      <div class="popup-container">
        <div class="popup-title">
          选择修改方式
        </div>
        <div @click="popup.confirmPhone = true">
          <df-verify
            content="验证手机号"
            :showChecked="false"
          />
        </div>
        <div @click="popup.password = true">
          <df-verify
            content="验证原密码"
            :showChecked="false"
          />
        </div>
      </div>
    </van-popup>

    <van-popup
      round
      class="popup"
      position="bottom"
      v-model:show="popup.password"
    >
      <div class="popup-container">
        <div class="popup-title">
          验证原密码
        </div>
        <div>
          <van-field
            type="password"
            name="phone"
            label="原密码"
            placeholder="请输入您的原密码"
            v-model="form.password"
          />
          <van-field
            type="password"
            name="phone"
            label="新密码"
            placeholder="请输入您的新密码"
            v-model="form.newPassword"
          />
          <van-field
            type="password"
            name="phone"
            label="新密码"
            placeholder="请重复输入"
            v-model="form.confirmPassword"
          />

          <div class="login-popup-button">
            <van-button
              round
              type="primary"
              @click="updatePasswordByOldPassword"
            >确认修改</van-button>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup
      round
      class="popup"
      position="bottom"
      v-model:show="popup.newPassword"
    >
      <div class="popup-container">
        <div class="popup-title">
          输入新密码
        </div>
        <div>
          <van-field
            type="password"
            name="phone"
            label="新密码"
            placeholder="请输入您的新密码"
            v-model="form.newPassword"
          />
          <van-field
            type="password"
            name="phone"
            label="新密码"
            placeholder="请重复输入"
            v-model="form.confirmPassword"
          />

          <div class="login-popup-button">
            <van-button
              round
              type="primary"
              @click="updatePasswordByPhone"
            >确认修改</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'

import { IPersonalProps } from '../../interface'

import DfHeader from '../../layouts/DfHeader.vue'
import DfPersonalCard from '../../components/DfPersonalCard.vue'
import DfVerify from '../../components/DfVerify.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader,
    [DfPersonalCard.name]: DfPersonalCard,
    [DfVerify.name]: DfVerify
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const user = computed<IPersonalProps>(() => store.state.user.information)

    const height = ref('50%')
    const form = reactive({
      verifyCode: '',
      email: '',
      confirmPhone: '',
      phone: '',
      password: '',
      newPassword: '',
      confirmPassword: ''
    })
    const timing = reactive({
      phone: {
        time: 60,
        disabled: true,
        interval: 0
      },
      confirmPhone: {
        time: 60,
        disabled: true,
        interval: 0
      },
      email: {
        time: 60,
        disabled: true,
        interval: 0
      }
    })
    const popup = reactive({
      newEmail: false,
      confirmPhone: false,
      newPhone: false,
      modifyMethod: false,
      password: false,
      newPassword: false,
      keyboard: false
    })

    onMounted(() => {
      if (!user.value.id) {
        store.dispatch('user/findUserInfoByToken')
      }
    })

    const sendVerifyCode = async (type: string) => {
      if (type === 'email') {
        const response = await store.dispatch('user/sendVerificationCodeByEmail', {
          email: form.email
        })

        if (response.code === 200) {
          timing.email.disabled = true

          timing.email.interval = setInterval(() => {
            timing.email.time -= 1

            if (timing.email.time <= 0) {
              clearInterval(timing.email.interval)
              timing.email.disabled = false
            }
          }, 1000)
        }
      } else if (type === 'phone') {
        const response = await store.dispatch('user/sendVerificationCodeByPhone', {
          phone: form.phone
        })

        if (response.code === 200) {
          timing.phone.disabled = true

          timing.phone.interval = setInterval(() => {
            timing.phone.time -= 1

            if (timing.phone.time <= 0) {
              clearInterval(timing.phone.interval)
              timing.phone.disabled = false
            }
          }, 1000)
        }
      } else if (type === 'confirmPhone') {
        const response = await store.dispatch('user/sendVerificationCodeByPhone', {
          phone: form.confirmPhone
        })

        if (response.code === 200) {
          timing.confirmPhone.disabled = true

          timing.confirmPhone.interval = setInterval(() => {
            timing.confirmPhone.time -= 1

            if (timing.confirmPhone.time <= 0) {
              clearInterval(timing.confirmPhone.interval)
              timing.confirmPhone.disabled = false
            }
          }, 1000)
        }
      }
    }
    const handleGoback = () => {
      router.go(-1)
    }
    const handleModify = () => {
      router.push('/modify')
    }
    // ==========================================================================
    // 关闭弹窗
    const handleCloseNewEmailPopup = () => {
      popup.newEmail = false
      form.email = ''
      form.verifyCode = ''
    }
    const handleCloseNewPhonePopup = () => {
      popup.newPhone = false
      form.phone = ''
      form.verifyCode = ''
    }
    const handleCloseConfirmPhonePopup = () => {
      popup.confirmPhone = false
      form.confirmPhone = ''
      form.verifyCode = ''
    }
    const handleCloseKeyboard = () => {
      popup.keyboard = false
      setTimeout(() => {
        height.value = '45%'
      }, 300)
    }
    // 打开弹窗
    const handleOpenKeyboard = (type: string) => {
      if (type === 'email') {
        if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.email)) {
          popup.keyboard = true
          height.value = '80%'

          watchEffect(async () => {
            if (form.verifyCode.length >= 6) {
              const response = await store.dispatch('user/verifyEmailByVerificationCode', {
                verifyCode: form.verifyCode
              })

              if (response.code === 200) {
                handleCloseNewEmailPopup()

                timing.email.time = 60
                clearInterval(timing.email.interval)
              }
            }
          })
        } else {
          Toast({
            message: '请输入正确的邮箱',
            position: 'bottom'
          })
        }
      } else if (type === 'phone') {
        if (/^1[3-9]\d{9}$/.test(form.phone)) {
          popup.keyboard = true
          height.value = '80%'

          watchEffect(async () => {
            if (form.verifyCode.length >= 6) {
              const response = await store.dispatch('user/verifyPhoneByVerificationCode', {
                verifyCode: form.verifyCode
              })

              if (response.code === 200) {
                handleCloseNewPhonePopup()

                timing.phone.time = 60
                clearInterval(timing.phone.interval)
              }
            }
          })
        } else {
          Toast({
            message: '请输入正确的手机号',
            position: 'bottom'
          })
        }
      } else if (type === 'confirmPhone') {
        if (form.confirmPhone === store.state.user.information.phone) {
          popup.keyboard = true
          height.value = '80%'

          watchEffect(async () => {
            if (form.verifyCode.length >= 6) {
              const response = await store.dispatch('user/verifyPhoneByVerificationCode', {
                verifyCode: form.verifyCode
              })

              if (response.code === 200) {
                handleCloseConfirmPhonePopup()
                handleCloseKeyboard()

                timing.confirmPhone.time = 60
                clearInterval(timing.confirmPhone.interval)

                if (!popup.modifyMethod) {
                  popup.newPhone = true
                } else {
                  popup.newPassword = true
                }
              }
            }
          })
        } else {
          Toast({
            message: '请输入正确的手机号',
            position: 'bottom'
          })
        }
      }
    }

    // 修改密码
    const updatePasswordByPhone = async () => {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/.test(form.newPassword)) {
        Toast({
          message: '请输入 6-30 位包含数字, 大小写字母的密码',
          position: 'bottom'
        })

        return null
      }

      if (form.newPassword !== form.confirmPassword) {
        Toast({
          message: '两次输入的密码不一致, 请重新输入',
          position: 'bottom'
        })

        return null
      }

      const response = await store.dispatch('user/updatePasswordByPhone', {
        password: form.newPassword
      })

      if (response.code === 200) {
        popup.password = false
        popup.newPassword = false
        popup.modifyMethod = false

        form.password = ''
        form.newPassword = ''
        form.confirmPassword = ''
      }
    }
    const updatePasswordByOldPassword = async () => {
      if (form.password !== store.state.user.information.password) {
        Toast({
          message: '输入的密码和原密码不一致',
          position: 'bottom'
        })

        return null
      }

      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/.test(form.newPassword)) {
        Toast({
          message: '请输入 6-30 位包含数字, 大小写字母的密码',
          position: 'bottom'
        })

        return null
      }

      if (form.newPassword !== form.confirmPassword) {
        Toast({
          message: '两次输入的密码不一致, 请重新输入',
          position: 'bottom'
        })

        return null
      }

      const response = await store.dispatch('user/updatePasswordByPhone', {
        password: form.newPassword
      })

      if (response.code === 200) {
        popup.password = false
        popup.newPassword = false
        popup.modifyMethod = false

        form.password = ''
        form.newPassword = ''
        form.confirmPassword = ''
      }
    }
    const verify = (type: string) => {
      if (type === 'email') {
        if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.email) && timing.email.time >= 60) {
          timing.email.disabled = false
        }
      } else if (type === 'phone') {
        if (/^1[3-9]\d{9}$/.test(form.phone) && timing.phone.time >= 60) {
          timing.phone.disabled = false
        }
      } else if (type === 'confirmPhone') {
        if (form.confirmPhone === store.state.user.information.phone && timing.confirmPhone.time >= 60) {
          timing.confirmPhone.disabled = false
        }
      }
    }

    return {
      user,
      form,
      popup,
      height,
      timing,

      verify,
      handleGoback,
      handleModify,
      sendVerifyCode,
      handleOpenKeyboard,
      handleCloseKeyboard,
      updatePasswordByPhone,
      updatePasswordByOldPassword,
      handleCloseNewPhonePopup,
      handleCloseNewEmailPopup,
      handleCloseConfirmPhonePopup
    }
  }
})
</script>

<style>
.van-cell__value {
  flex: 2;
}

.popup-container {
  font-size: 20px;
}

.popup-title {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0;
}

.popup {
  height: v-bind(height);
}

.login-popup-button {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0 30px;
}

.login-input-group .van-password-input__item {
  background-color: rgb(243, 241, 241);
}
</style>
