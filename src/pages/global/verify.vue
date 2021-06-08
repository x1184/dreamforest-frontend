<template>
  <div class="verify-container">
    <van-sticky :offset-top="20">
      <van-icon
        name="cross"
        color="#969799"
      />
    </van-sticky>

    <div class="verify-title">根据国家相关法律法规规定，完成次操作需验证</div>

    <div @click="handleClickVerifyPhone">
      <df-verify :show-checked="false" />
    </div>

    <van-popup
      round
      position="bottom"
      class="forget-password-popup"
      v-model:show="showDrawer.popUp"
    >
      <div class="login-popup-container">
        <div class="login-popup-title">
        </div>

        <van-form validate-trigger="onChange">
          <van-field
            type="tel"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            v-model="telphone"
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
              :value="verifyValue"
              :focused="showDrawer.keyboard"
              @focus="handleShowKeyboard"
            />
            <van-number-keyboard
              maxlength="6"
              v-model="verifyValue"
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
import { defineComponent, reactive, ref } from 'vue'
import { Toast } from 'vant'
import DfVerify from '../../components/DfVerify.vue'

export default defineComponent({
  components: {
    [DfVerify.name]: DfVerify
  },

  setup () {
    const personal = reactive<any>({
      username: '',
      password: ''
    })
    const timing = reactive({
      disabled: true,
      count: 60
    })
    const showDrawer = reactive({
      popUp: false,
      keyboard: false
    })
    const telphone = ref('')
    const verifyValue = ref('')
    const height = ref('40%')

    // 手机号取消聚焦
    const handleBlurPhone = () => {
      const phone = /^1[3-9]\d{9}$/.test(telphone.value)

      if (phone) {
        timing.disabled = false
      } else {
        Toast({
          message: '请输入正确的手机号',
          position: 'bottom'
        })
      }
    }
    // 忘记密码弹窗
    const handleClickVerifyPhone = () => {
      showDrawer.popUp = true
    }
    // 显示键盘
    const handleShowKeyboard = async () => {
      const phone = /^1[3-9]\d{9}$/.test(telphone.value)

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
    // 隐藏 keyboard
    const handleHiddenKeyboard = () => {
      showDrawer.keyboard = false
      setTimeout(() => {
        height.value = '45%'
      }, 300)
    }
    // 创建一个定时器
    const handleCreateCount = () => {
      timing.disabled = true
      const interval = setInterval(() => {
        timing.count -= 1

        if (timing.count <= 0) {
          clearInterval(interval)

          timing.disabled = false
          timing.count = 60
        }
      }, 1000)
    }

    return {
      timing,
      height,
      personal,
      verifyValue,
      telphone,
      showDrawer,

      handleBlurPhone,
      handleClickVerifyPhone,
      handleCreateCount,
      handleShowKeyboard,
      handleHiddenKeyboard
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

.forget-password-popup {
  height: v-bind(height);
}

.login-form {
  padding: 0 20px;
}

.login-popup-title {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px 0 20px;

  font-size: 18px;
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
