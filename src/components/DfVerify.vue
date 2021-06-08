<template>
  <div class="verify-container">
    <span>
      <van-image
        class="verify-image"
        :src="imageSrc" />
    </span>

    <span class="verify-content">
      {{ content }}
    </span>

    <span class="verify-icon">
      <van-icon v-show="showChecked" :name="checked ? 'checked' : 'passed'" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'df-verify',

  props: {
    checked: {
      type: Boolean,
      default: false
    },
    showChecked: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: '验证手机号'
    },
    imageSrc: {
      type: String,
      default: 'https://img01.yzcdn.cn/vant/cat.jpeg'
    }
  }
})
</script>

<style scoped>
.verify-container {
  display: flex;
  align-items: center;

  margin: 10px 0;
  padding: 10px 0;

  background-color: #f2f2f2;
}

.verify-container span {
  font-size: 20px;
  color: #1989fa;
}

.verify-image {
  margin-left: 20px;
  width: 75px;
  height: 75px;
}

.verify-content {
  margin: 0 30px;
  width: 40%;
}

.verify-icon i {
  font-size: 30px;
  color: black;
}
</style>
