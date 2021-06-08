<template>
  <div class="verify-container">
    <van-sticky :offset-top="20">
      <van-icon name="cross" color="#969799" />
    </van-sticky>

    <div class="verify-title">根据国家相关法律法规规定，完成次操作需验证</div>

    <div>
      <df-verify :show-checked="false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sticky, Icon } from 'vant'
import DfVerify from '../../components/DfVerify.vue'

export default defineComponent({
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
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
</style>
