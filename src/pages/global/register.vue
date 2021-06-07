<template>
  <van-form class="register-container" @submit="handleRegister">
    <div class="register-name">南枝</div>
    <div>
      <van-field
        v-model="personal.name"
        name="name"
        label="昵称"
        placeholder="请输入手机号或邮箱"
        :rules="[{ required: true, message: '请输入昵称' }]"
      />
      <van-field
        v-model="personal.phoneOrEmail"
        name="phoneOrEmail"
        label="手机 / 邮箱"
        placeholder="请输入手机号或邮箱"
        :rules="[{ required: true, message: '请输入手机号或邮箱' }]"
      />
      <van-field
        v-model="personal.password"
        type="password"
        name="password"
        label="密码"
        placeholder="包含大小写字母和数字"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
        v-model="personal.confirmPassword"
        type="password"
        name="confirmPassword"
        label="确认密码"
        placeholder="重复密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
    </div>
    <div class="register-button-group">
      <van-button type="primary" round native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Form, Field, Button, Icon } from 'vant'

export default defineComponent({
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon
  },

  setup () {
    const personal = reactive<any>({
      name: '',
      phoneOrEmail: '',
      password: '',
      confirmPassword: ''
    })

    const handleRegister = () => {
      console.log(personal)
    }

    return {
      personal,
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
</style>
