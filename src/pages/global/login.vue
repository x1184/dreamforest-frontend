<template>
  <van-form class="login-container" @submit="handleLogin">
    <div class="login-name">南枝</div>
    <div>
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
        <van-button round native-type="submit">
          登陆
        </van-button>
        <van-button round>
          <van-icon size="20px" name="question-o" />
        </van-button>
      </div>
      <div>
        <van-button round block type="primary">
          注册
        </van-button>
      </div>
    </div>
    <div class="login-third">
      <van-icon name="like" />
      <van-icon name="fire" />
      <van-icon name="cart" />
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
      username: '',
      password: ''
    })

    const handleLogin = () => {
      console.log(personal)
    }

    return {
      personal,
      handleLogin
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
</style>
