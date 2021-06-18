<template>
  <van-form
    class="login-container"
    @submit="handleLogin"
  >
    <div class="login-name">南枝</div>

    <div class="login-form">
      <van-field
        v-model.trim="form.username"
        name="username"
        label="手机 / 邮箱"
        placeholder="请输入手机号或邮箱"
      />
      <van-field
        v-model.trim="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="包含大小写字母和数字"
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
          @click="handleGotoPage('/register')"
        >
          注册
        </van-button>
      </div>
    </div>

    <!-- <div class="login-third">
      <van-icon name="like" />
      <van-icon name="fire" />
      <van-icon name="cart" />
    </div> -->

    <van-popup
      round
      position="bottom"
      class="forget-password-popup"
      v-model:show="showDrawer.forgetPassword"
      @closed="handleCloseForgetPassword"
    >
      <div class="login-popup-container">
        <div class="login-popup-title">
          找回密码
        </div>

        <van-form validate-trigger="onChange">
          <van-field
            type="tel"
            name="phone"
            label="手机号"
            placeholder="请输入待找回账号绑定手机"
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

    <van-popup
      round
      position="bottom"
      class="forget-password-popup"
      v-model:show="showDrawer.newPassword"
      @closed="handleCloseConfirmPassword"
    >
      <div class="login-popup-container">
        <div class="login-popup-title">
          输入新密码
        </div>

        <van-form>
          <van-field
            type="password"
            name="password"
            label="新密码"
            placeholder="请输入您的新密码"
            v-model="form.newPassword"
          />

          <van-field
            type="password"
            name="password"
            label="确认密码"
            placeholder="请重新输入"
            v-model="form.confirmPassword"
          />

          <van-button
            block
            type="primary"
            @click.stop="handleConfirmModify"
          >
            确认修改
          </van-button>
        </van-form>
      </div>
    </van-popup>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()

    const height = ref('40%')
    const form = reactive<any>({
      username: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      phone: '',
      verifyValue: ''
    })
    const timing = reactive({
      disabled: true,
      count: 60
    })
    const showDrawer = reactive({
      forgetPassword: false,
      keyboard: false,
      newPassword: false
    })

    // Function
    // =========================
    const handleLogin = async () => {
      if (!form.username) {
        Toast({
          message: '请输入用户名',
          position: 'bottom'
        })

        return null
      }

      if (!form.password) {
        Toast({
          message: '请输入密码',
          position: 'bottom'
        })

        return null
      }

      const response = await store.dispatch('user/login', {
        phone: form.username,
        password: form.password
      })

      if (response.code === 200) {
        router.push('/')
      }
    }
    // 跳转 页面
    const handleGotoPage = (path: string) => {
      router.push(path)
    }
    // 打开 忘记密码弹窗
    const handleForgetPassword = () => {
      showDrawer.forgetPassword = true
    }
    /**
     * 关闭 忘记密码的弹窗
     * 1. 将忘记密码里面的表单置空
     * 2. 将密码置空
     */
    const handleCloseForgetPassword = () => {
      form.phone = ''
      form.verifyValue = ''
      form.password = ''
    }
    // 打开 新密码的弹窗
    const handleShowNewPassword = () => {
      showDrawer.forgetPassword = false
      showDrawer.newPassword = true
    }
    /**
     * 关闭 新密码的弹窗
     * 1. 将新密码弹窗里面的表单置空
     */
    const handleCloseConfirmPassword = () => {
      form.newPassword = ''
      form.confirmPassword = ''
    }
    // 手机号取消聚焦
    const handleBlurPhone = () => {
      const phone = /^1[3-9]\d{9}$/.test(form.phone)

      if (!phone) {
        Toast({
          message: '请输入正确的手机号',
          position: 'bottom'
        })
      }
    }
    /**
     * 显示键盘
     * 1. 验证手机号，不然无法打开
     */
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
    /**
     * 隐藏键盘
     * 1. 延迟 0.3s 让键盘关闭
     */
    const handleHiddenKeyboard = () => {
      showDrawer.keyboard = false
      setTimeout(() => {
        height.value = '45%'
      }, 300)
    }
    // 确认修改按钮
    const handleConfirmModify = async () => {
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/.test(form.newPassword)
      ) {
        Toast({
          message: '请输入 6-30 位，包含大小写字母和数字的密码'
        })

        return false
      }

      if (form.newPassword !== form.confirmPassword) {
        Toast({
          message: '两次输入的密码不相同'
        })

        return false
      }

      const response = await store.dispatch('user/updatePasswordByPhone', {
        password: form.newPassword
      })

      if (response.code === 200) {
        showDrawer.newPassword = false
      }
    }
    // 创建一个定时器
    const handleCreateCount = () => {
      store.dispatch('user/sendVerificationCodeByPhone', {
        phone: form.phone
      })

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

    // watch
    // =========================
    watch(form, async (newValue) => {
      if (newValue.verifyValue.length === 6) {
        const response = await store.dispatch(
          'user/verifyPhoneByVerificationCode', {
            verification: newValue.verifyValue
          }
        )

        // 1. 关闭键盘
        // 2. 关闭忘记密码弹窗
        // 3. 打开输入密码弹窗
        if (response.code === 200) {
          handleHiddenKeyboard()
          handleCloseForgetPassword()
          handleShowNewPassword()
        }
      }

      if (/^1[3-9]\d{9}$/.test(form.phone) && timing.count >= 60) {
        timing.disabled = false
      }
    })

    return {
      form,
      timing,
      height,
      showDrawer,

      handleLogin,
      handleBlurPhone,
      handleForgetPassword,
      handleCreateCount,
      handleShowKeyboard,
      handleHiddenKeyboard,
      handleShowNewPassword,
      handleConfirmModify,
      handleCloseForgetPassword,
      handleCloseConfirmPassword,
      handleGotoPage
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

div.login-name {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0;
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
