<template>
  <div class="verify-container">
    <van-sticky :offset-top="20">
      <div class="verify-close-container">
        <van-icon name="cross" color="#969799" />
        <van-button color="#07C160">开始使用</van-button>
      </div>
    </van-sticky>

    <div class="verify-title">完成验证</div>

    <div>
      <df-verify />
      <df-verify content="验证邮箱" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sticky, Icon, Button } from 'vant'
import DfVerify from '../../components/DfVerify.vue'

export default defineComponent({
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [DfVerify.name]: DfVerify
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
</style>
