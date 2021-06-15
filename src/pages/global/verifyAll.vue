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
          @click="handleClosePage"
          color="#07C160"
        >开始使用</van-button>
      </div>
    </van-sticky>

    <div class="verify-title">完成验证</div>

    <div>
      <div @click="handleClickVerifyPhone">
        <df-verify />
      </div>
      <div @click="handleClickVerifyPhone">
        <df-verify content="验证邮箱" />
      </div>
    </div>

    <van-popup
      round
      position="bottom"
      class="forget-password-popup"
      v-model:show="showDrawer.popUp"
      @closed="handleCloseVerifyPhone"
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
              :disabled="timing.disabled"
              @click="handleCreateCount"
            >发送验证码（{{ timing.count }}s）</van-button>
          </div>

          <div class="login-input-group">
            <van-password-input
              length="6"
              :mask="false"
              :gutter="10"
              :value="form.verifyValue"
              :focused="showDrawer.keyboard"
              @focus="handleShowKeyboard"
            />
            <van-number-keyboard
              maxlength="6"
              v-model="form.verifyValue"
              :show="showDrawer.keyboard"
              @blur="handleHiddenKeyboard"
            />
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { Toast } from 'vant'

import DfVerify from '../../components/DfVerify.vue'

export default defineComponent({
  components: {
    [DfVerify.name]: DfVerify
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const height = ref('40%')
    const form = reactive({
      phone: '',
      verifyValue: ''
    })
    const timing = reactive({
      disabled: true,
      count: 60
    })
    const showDrawer = reactive({
      popUp: false,
      keyboard: false
    })

    // 手机号取消聚焦
    const handleBlurPhone = () => {
      const phone = /^1[3-9]\d{9}$/.test(form.phone)

      if (phone) {
        timing.disabled = false
      } else {
        Toast({
          message: '请输入正确的手机号',
          position: 'bottom'
        })
      }
    }
    // 打开验证弹窗
    const handleClickVerifyPhone = () => {
      showDrawer.popUp = true
    }
    /**
     * 关闭验证弹窗
     * 1. 删除验证码显示
     */
    const handleCloseVerifyPhone = () => {
      form.verifyValue = ''
    }
    // 显示键盘
    const handleShowKeyboard = async () => {
      const phone = /^1[3-9]\d{9}$/.test(form.phone)

      if (phone) {
        showDrawer.keyboard = true
        height.value = '80%'
      } else {
        Toast({
          message: '请输入正确的手机号',
          position: 'bottom'
        })
      }
    }
    // 隐藏键盘
    const handleHiddenKeyboard = () => {
      showDrawer.keyboard = false
      setTimeout(() => {
        height.value = '45%'
      }, 300)
    }
    // 创建一个定时器
    const handleCreateCount = () => {
      timing.disabled = true
      const response = store.dispatch('user/sendVerificationCodeByPhone')

      if (response.code === 200) {
        const interval = setInterval(() => {
          timing.count -= 1

          if (timing.count <= 0) {
            clearInterval(interval)

            timing.disabled = false
            timing.count = 60
          }
        }, 1000)
      }
    }
    // 关闭此页面
    const handleClosePage = () => {
      router.replace('/')
    }

    // watch
    // =======================================
    watch(form, async (newValue) => {
      if (newValue.verifyValue.length === 6) {
        const response = await store.dispatch(
          'user/verifyPhoneByVerificationCode', {
            verification_code: newValue.verifyValue
          }
        )

        // 1. 关闭键盘
        // 2. 关闭忘记密码弹窗
        if (response.code === 200) {
          handleHiddenKeyboard()
          handleCloseVerifyPhone()
        }
      }
    })

    return {
      form,
      timing,
      height,
      showDrawer,

      handleBlurPhone,
      handleClickVerifyPhone,
      handleCreateCount,
      handleShowKeyboard,
      handleHiddenKeyboard,
      handleCloseVerifyPhone,
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
