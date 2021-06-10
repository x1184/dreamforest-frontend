<template>
  <div class="df-personal-container">
    <div>
      <img
        src="https://img.yzcdn.cn/vant/ipad.jpeg'"
        alt="avatar"
      >
    </div>
    <div class="df-personal-content">
      <span>马云</span>
      <span>
        ID: 123
      </span>
      <span>
        介绍：XXX
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'df-personal-card'
})
</script>

<style>
.df-personal-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 5px 10px;

  font-size: 18px;
}

.df-personal-container img {
  width: 80px;
  height: 80px;

  border-radius: 50%;
  border: 1px solid #00000082;
}

.df-personal-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column;

  margin-left: 20px;
}

.df-personal-content span {
  margin-top: 2px;
}
</style>
