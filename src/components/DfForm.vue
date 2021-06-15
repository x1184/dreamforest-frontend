<template>
  <van-form
    validate-trigger="onSubmit"
    @submit="onSubmit"
  >

    <van-cell-group title="想法">
      <van-field
        v-model="state.idea.title"
        name="ideaTitle"
        label="想法"
        placeholder="请输入想法"
        :rules="[
          { required: true, message: '请输入想法标题' }
        ]"
      />

      <van-field
        autosize
        show-word-limit
        v-model="state.idea.content"
        rows="2"
        name="ideaContent"
        label="内容"
        type="textarea"
        maxlength="50"
        placeholder="请输入内容"
      />
    </van-cell-group>

    <van-cell-group
      v-if="showProject"
      title="项目"
    >
      <van-field
        v-model="state.project.title"
        name="projectTitle"
        label="标题"
        placeholder="请输入标题"
        :rules="[
          { required: true, message: '请输入项目标题' }
        ]"
      />

      <van-field
        v-model="state.project.content"
        autosize
        show-word-limit
        rows="2"
        label="内容"
        name="projectContent"
        type="textarea"
        maxlength="50"
        placeholder="请输入内容"
      />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
      >
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface IFormProps {
  idea: {
    title: string;
    content: string;
  };
  project?: {
    title: string;
    content: string;
  }
}

export default defineComponent({
  name: 'df-form',

  setup () {
    const { params } = useRoute()
    const router = useRouter()
    const state = reactive<IFormProps>({
      idea: {
        title: '',
        content: ''
      },
      project: {
        title: '',
        content: ''
      }
    })

    const showProject = params.type === 'project'

    // TODO 发送请求
    const onSubmit = (value: IFormProps) => {
      router.go(-1)
    }

    return {
      state,
      showProject,
      onSubmit
    }
  }
})
</script>
