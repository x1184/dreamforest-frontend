<template>
  <div class="verify-container">
    <van-sticky :offset-top="20">
      <div class="verify-close-container">
        <van-icon
          name="cross"
          color="#969799"
          @click="handleClosePage"
        />
        <van-button
          color="#07C160"
          :disabled="!isStart"
          @click="handleClosePage"
        >开始使用</van-button>
      </div>
    </van-sticky>

    <div class="verify-title">完成验证</div>

    <div>
      <div @click="handleClickVerifyPhone">
        <df-verify :checked="isVerify.phone" />
      </div>
      <div @click="handleClickVerifyEmail">
        <df-verify
          :checked="isVerify.email"
          content="验证邮箱"
        />
      </div>
    </div>

    <van-popup
      round
      position="bottom"
      class="forget-password-popup"
      v-model:show="showPopup.phone"
      @closed="handleCloseVerify"
    >
      <div class="login-popup-title">
      </div>

      <div class="login-popup-container">
        <van-form validate-trigger="onChange">
          <van-field
            type="tel"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            v-model="form.phone"
            @change="handleBlurPhone"
          />

          <div class="login-popup-button">
            <van-button
              round
              type="primary"
              :disabled="timing.phone"
              @click="handlePhoneTime"
            >发送验证码（{{ timing.phoneCount }}s）</van-button>
          </div>

          <div class="login-input-group">
            <van-password-input
              length="6"
              :mask="false"
              :gutter="10"
              :value="form.verifyValue"
              :focused="showPopup.keyboard"
              @focus="handleShowKeyboard"
            />
            <van-number-keyboard
              maxlength="6"
              v-model="form.verifyValue"
              :show="showPopup.keyboard"
              @blur="handleHiddenKeyboard"
            />
          </div>
        </van-form>
      </div>
    </van-popup>

    <van-popup
      round
      position="bottom"
      class="forget-password-popup"
      v-model:show="showPopup.email"
      @closed="handleCloseVerify"
    >
      <div class="login-popup-title">
      </div>

      <div class="login-popup-container">
        <van-form validate-trigger="onChange">
          <van-field
            type="email"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            v-model="form.email"
            @change="handleBlurEmail"
          />

          <div class="login-popup-button">
            <van-button
              round
              type="primary"
              :disabled="timing.email"
              @click="handleEmailTime"
            >发送验证码（{{ timing.emailCount }}s）</van-button>
          </div>

          <div class="login-input-group">
            <van-password-input
              length="6"
              :mask="false"
              :gutter="10"
              :value="form.verifyValue"
              :focused="showPopup.keyboard"
              @focus="handleShowKeyboard"
            />
            <van-number-keyboard
              maxlength="6"
              v-model="form.verifyValue"
              :show="showPopup.keyboard"
              @blur="handleHiddenKeyboard"
            />
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { Toast } from 'vant'

import DfVerify from '../../components/DfVerify.vue'

export default defineComponent({
  components: {
    [DfVerify.name]: DfVerify
  },

  setup () {
    let interval: any = null

    const router = useRouter()
    const store = useStore()

    const height = ref('40%')
    const form = reactive({
      phone: store.state.user.information.phone,
      email: store.state.user.information.email,
      verifyValue: ''
    })
    const showPopup = reactive({
      phone: false,
      email: false,
      keyboard: false
    })
    const timing = reactive({
      phone: !store.state.user.information.phone,
      email: !store.state.user.information.email,
      phoneCount: 60,
      emailCount: 60
    })
    // 是否验证邮箱以及手机号
    const isVerify = reactive({
      phone: false,
      email: false
    })
    // 是否可以开始使用
    const isStart = computed(() => isVerify.phone || isVerify.email)

    // 打开手机验证弹窗
    const handleClickVerifyPhone = () => {
      if (!isVerify.phone) {
        showPopup.phone = true
      }
    }
    // 打开邮箱验证弹窗
    const handleClickVerifyEmail = () => {
      if (!isVerify.email) {
        showPopup.email = true
      }
    }
    /**
     * 关闭验证弹窗
     * 1. 删除验证码显示
     */
    const handleCloseVerify = () => {
      form.verifyValue = ''

      showPopup.email = false
      showPopup.phone = false
    }
    // 显示键盘
    const handleShowKeyboard = async () => {
      const isPhone = /^1[3-9]\d{9}$/.test(form.phone)
      const isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.email)

      if (isPhone || isEmail) {
        showPopup.keyboard = true
        height.value = '80%'
      } else {
        Toast({
          message: '请输入正确',
          position: 'bottom'
        })
      }
    }
    // 隐藏键盘
    const handleHiddenKeyboard = () => {
      showPopup.keyboard = false
      setTimeout(() => {
        height.value = '45%'
      }, 300)
    }

    // 创建一个定时器
    const handlePhoneTime = async () => {
      timing.phone = true
      let response = null
      response = await store.dispatch('user/sendVerificationCodeByPhone')

      if (response.code === 200) {
        interval = setInterval(() => {
          timing.phoneCount -= 1

          if (timing.phoneCount <= 0) {
            clearInterval(interval)

            timing.phone = false
            timing.phoneCount = 60
          }
        }, 1000)
      } else {
        timing.phone = false
      }
    }
    const handleEmailTime = async () => {
      timing.email = true
      let response = null
      response = await store.dispatch('user/sendVerificationCodeByEmail')

      if (response.code === 200) {
        interval = setInterval(() => {
          timing.emailCount -= 1

          if (timing.emailCount <= 0) {
            clearInterval(interval)

            timing.email = false
            timing.emailCount = 60
          }
        }, 1000)
      } else {
        timing.email = false
      }
    }
    // 关闭此页面
    const handleClosePage = () => {
      router.replace('/')
    }

    // 手机取消聚焦
    const handleBlurPhone = () => {
      const isPhone = /^1[3-9]\d{9}$/.test(form.phone)

      if (isPhone) {
        timing.phone = false
      } else {
        Toast({
          message: '请输入正确的手机号',
          position: 'bottom'
        })
      }
    }

    // 邮箱取消聚焦
    const handleBlurEmail = () => {
      const isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.email)

      if (isEmail) {
        timing.email = false
      } else {
        Toast({
          message: '请输入正确的邮箱',
          position: 'bottom'
        })
      }
    }

    // watch
    // =======================================
    watch(form, async (newValue) => {
      if (newValue.verifyValue.length === 6) {
        if (showPopup.phone) {
          const response = await store.dispatch(
            'user/verifyPhoneByVerificationCode', {
              verification_code: newValue.verifyValue
            }
          )

          // 1. 关闭键盘
          // 2. 关闭忘记密码弹窗
          if (response.code === 200) {
            handleHiddenKeyboard()
            handleCloseVerify()
            isVerify.phone = true
            clearInterval(interval)
          }
        } else {
          const response = await store.dispatch(
            'user/verifyEmailByVerificationCode', {
              verification_code: newValue.verifyValue
            }
          )

          // 1. 关闭键盘
          // 2. 关闭忘记密码弹窗
          if (response.code === 200) {
            handleHiddenKeyboard()
            handleCloseVerify()
            isVerify.email = true
            clearInterval(interval)
          }
        }
      }
    })

    return {
      form,
      isStart,
      timing,
      height,
      showPopup,
      isVerify,

      handleBlurPhone,
      handleBlurEmail,
      handleClickVerifyPhone,
      handleClickVerifyEmail,
      handlePhoneTime,
      handleEmailTime,
      handleShowKeyboard,
      handleHiddenKeyboard,
      handleCloseVerify,
      handleClosePage
    }
  }
})
</script>

<style>
.verify-container {
  margin: 0 10px;
}

.verify-title {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20vh 50px 40px;

  text-align: center;
  font-size: 20px;
}

.verify-close-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-popup-title {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px 0 20px;

  font-size: 18px;
}

.forget-password-popup {
  height: v-bind(height);
}

.login-form {
  padding: 0 20px;
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
