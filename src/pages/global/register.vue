<template>
  <van-form
    class="register-container"
    @submit="handleRegister"
  >
    <div class="register-name">南枝</div>

    <div class="register-field">
      <van-field
        v-model.trim="form.username"
        name="name"
        label="昵称"
        placeholder="请输入昵称"
      />
      <van-field
        v-model.trim="form.phoneOrEmail"
        name="phoneOrEmail"
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
      <van-field
        v-model.trim="form.confirmPassword"
        type="password"
        name="confirmPassword"
        label="确认密码"
        placeholder="重复密码"
      />
    </div>

    <div class="register-button-group">
      <van-button
        round
        type="primary"
        native-type="submit"
      >
        <div class="register-button__submit">
          提交
        </div>
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()

    const form = reactive<any>({
      username: '',
      phoneOrEmail: '',
      password: '',
      confirmPassword: ''
    })
    const type = ref('phone')

    // Function
    // ==============================
    // 验证逻辑
    const validate = () => {
      if (!form.username) {
        Toast({
          message: '请输入昵称'
        })

        return false
      }

      if (!form.phoneOrEmail) {
        Toast({
          message: '请输入手机号或者邮箱'
        })

        return false
      } else if (
        !/^1[3-9]\d{9}$/.test(form.phoneOrEmail) &&
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.phoneOrEmail)
      ) {
        Toast({
          message: '请输入正确的手机号或者邮箱'
        })

        return false
      } if (/^1[3-9]\d{9}$/.test(form.phoneOrEmail)) {
        type.value = 'phone'
      } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.phoneOrEmail)) {
        type.value = 'email'
      }

      if (!form.password) {
        Toast({
          message: '请输入密码'
        })

        return false
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/.test(form.password)
      ) {
        Toast({
          message: '请输入 6-30 位，包含大小写字母和数字的密码'
        })

        return false
      }

      if (!form.confirmPassword) {
        Toast({
          message: '请输入确认密码'
        })

        return false
      } else if (form.confirmPassword !== form.password) {
        Toast({
          message: '确认密码与密码不一致，请重新输入'
        })

        return false
      }

      return true
    }

    // 注册逻辑
    const handleRegister = async () => {
      if (!validate()) return null
      const response = await store.dispatch('user/register', {
        name: form.username,
        [type.value]: form.phoneOrEmail,
        password: form.password
      })

      if (response.code === 200) {
        router.push('/verify-all')
      }
    }

    return {
      form,

      handleRegister
    }
  }
})
</script>

<style>
.register-container {
  display: flex;
  flex-flow: column nowrap;
}

.register-container > div {
  margin-top: 40px;
}

.register-field {
  margin: 0 10px;
}

.register-name {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30vh;
  font-size: 24px;
}

.register-button-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-button__submit {
  padding: 0 10px;
}
</style>
