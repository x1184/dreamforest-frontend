<template>
  <div>
    <df-header>
      <template #left>
        <van-icon
          name="arrow-left"
          @click="handleGoback"
        />
      </template>
    </df-header>

    <div class="about-container">
      <img
        src="https://img.yzcdn.cn/vant/ipad.jpeg'"
        alt="logo"
      >
      <div>当前版本 MVP</div>
    </div>

    <div>
      <van-cell-group>
        <van-cell
          url="https://github.com/orgs/dreamforestnet"
          clickable
          is-link
          value="开发团队"
        />
        <van-cell
          url="https://github.com/orgs/dreamforestnet"
          clickable
          is-link
          value="支持我们"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import DfHeader from '../../layouts/DfHeader.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader
  },

  setup () {
    const router = useRouter()

    const handleGoback = () => {
      router.go(-1)
    }

    return {
      handleGoback
    }
  }
})
</script>

<style>
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  font-size: 20px;

  margin: 30px;
}

.about-container img {
  margin-bottom: 30px;

  width: 80px;
  height: 80px;

  border-radius: 50%;
  border: 1px solid #00000082;
}
</style>
