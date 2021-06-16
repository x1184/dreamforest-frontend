<template>
  <div>
    <div class="form-idea-container">
      <div>
        <div>项目标题</div>
        <van-field
          autosize
          show-word-limit
          v-model="form.title"
          rows="3"
          type="textarea"
          maxlength="50"
          placeholder="简介概括你的项目"
        />
      </div>

      <div>
        <div>项目内容</div>
        <van-field
          autosize
          show-word-limit
          v-model="form.content"
          rows="6"
          type="textarea"
          maxlength="500"
          placeholder="然后详细介绍一下吧"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'df-form-project',

  setup () {
    const form = reactive({
      title: '',
      content: ''
    })

    return {
      form
    }
  }
})
</script>

<style>
.form-idea-container {
  margin: 20px;

  font-size: 18px;
}

.form-idea-container > div {
  margin-top: 50px;
}

.form-idea-container > div:first-child {
  margin-top: 0;
}

.form-idea-container .tag-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
