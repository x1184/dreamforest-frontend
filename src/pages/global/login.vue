<template>
  <van-form
    class="login-container"
    @submit="handleLogin"
  >
    <div class="login-name">南枝</div>

    <div class="login-form">
      <van-field
        v-model="personal.username"
        name="username"
        label="手机 / 邮箱"
        placeholder="请输入手机号或邮箱"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="personal.password"
        type="password"
        name="password"
        label="密码"
        placeholder="包含大小写字母和数字"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </div>

    <div class="login-button-group">
      <div class="login-button">
        <van-button
          round
          native-type="submit"
        >
          登陆
        </van-button>
        <van-button
          @click="handleForgetPassword"
          round
        >
          <van-icon
            size="20px"
            name="question-o"
          />
        </van-button>
      </div>
      <div>
        <van-button
          round
          block
          type="primary"
        >
          注册
        </van-button>
      </div>
    </div>

    <div class="login-third">
      <van-icon name="like" />
      <van-icon name="fire" />
      <van-icon name="cart" />
    </div>

    <van-popup
      round
      position="bottom"
      class="forget-password-popup"
      v-model:show="showPopUp"
    >
      <div class="login-popup-container">
        <div class="login-popup-title">
          找回密码
        </div>

        <van-form
          validate-trigger="onChange"
          :ref="el => { forgetFormRef = el }"
        >
          <van-field
            type="tel"
            name="phone"
            label="手机号"
            placeholder="请输入待找回账号绑定手机"
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
              :focused="showKeyboard"
              @focus="handleShowKeyboard"
            />
            <van-number-keyboard
              maxlength="6"
              v-model="verifyValue"
              :show="showKeyboard"
              @blur="handleHiddenKeyboard"
            />
          </div>
        </van-form>
      </div>

    </van-popup>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Form, Field, Button, Icon, Popup, Toast, PasswordInput, NumberKeyboard } from 'vant'

export default defineComponent({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard
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
    const showPopUp = ref(false)
    const showKeyboard = ref(false)
    const forgetFormRef = ref(null)
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
    const handleForgetPassword = () => {
      showPopUp.value = true
    }
    const handleLogin = () => {
      console.log(personal)
    }
    const handleShowKeyboard = async () => {
      const phone = /^1[3-9]\d{9}$/.test(telphone.value)

      if (phone) {
        showKeyboard.value = true
        height.value = '80%'
      } else {
        Toast({
          message: '请输入正确的手机号',
          position: 'bottom'
        })
      }
    }
    const handleHiddenKeyboard = () => {
      showKeyboard.value = false
      setTimeout(() => {
        height.value = '45%'
      }, 300)
    }
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
      showPopUp,
      showKeyboard,
      forgetFormRef,

      handleLogin,
      handleBlurPhone,
      handleForgetPassword,
      handleCreateCount,
      handleShowKeyboard,
      handleHiddenKeyboard
    }
  }
})
</script>

<style>
.login-container {
  display: flex;
  flex-flow: column nowrap;
}

.login-container > div {
  margin-top: 40px;
}

.login-name {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30vh;
  font-size: 24px;
}

.login-third {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.login-button-group {
  margin: 0 50px;
}

.login-button {
  display: flex;
}

.login-button button:first-child {
  flex: 1;
  margin-right: 10px;
}

.login-button button {
  margin-bottom: 10px;
  border: 1px solid;
}

.login-button button:first-child .van-button__text {
  margin-left: 60px;
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
