<template>
  <div class="df-personal-container">
    <div>
      <img
        alt="avatar"
        :src="user.avatar"
      >
    </div>
    <div class="df-personal-content">
      <span>{{ user.name }}</span>
      <span>
        ID: {{ user.showId }}
      </span>
      <span v-if="type === 'description'">
        介绍：{{ user.description }}
      </span>

      <span v-if="type === 'createTime'">
        <div>注册时间：</div>
        <div>{{ user.createTime }}</div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'df-personal-card',

  props: {
    user: {
      type: Object,
      default: () => ({
        avatar: '',
        name: '',
        showId: '',
        description: '',
        createTime: ''
      }),
      required: true
    },

    type: {
      type: String,
      default: 'description'
    }
  }
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

.df-personal-content > span {
  margin-top: 5px;
}
</style>
