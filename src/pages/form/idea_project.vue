<template>
  <div>
    <df-header>
      <template #title>
        <span>
          添加项目
        </span>
      </template>

      <template #right>
        <van-icon
          name="clear"
          size="30px"
          @click="handleGoback"
        />
      </template>
    </df-header>
    <df-form-project></df-form-project>
    <df-form-idea></df-form-idea>

    <div class="submit-btn">
      <van-button
        round
        type="primary"
        @click="handleSubmit"
      >发布</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'

import DfHeader from '../../layouts/DfHeader.vue'
import DfFormIdea from '../../components/DfFormIdea.vue'
import DfFormProject from '../../components/DfFormProject.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader,
    [DfFormIdea.name]: DfFormIdea,
    [DfFormProject.name]: DfFormProject
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const ideaRef = ref(null)
    const projectRef = ref(null)

    const handleGoback = () => {
      router.go(-1)
    }

    const handleSubmit = () => {
      const ideaForm = (ideaRef.value as any).form
      const projectForm = (projectRef.value as any).form

      if (!ideaForm.title) {
        Toast({
          message: '请输入想法标题'
        })

        return null
      }

      if (!ideaForm.content) {
        Toast({
          message: '请输入想法内容'
        })

        return null
      }

      if (!projectForm.content) {
        Toast({
          message: '请输入项目内容'
        })

        return null
      }

      if (!projectForm.content) {
        Toast({
          message: '请输入项目内容'
        })

        return null
      }

      store.dispatch('projects/addProject', {
        idea: ideaForm,
        project: projectForm
      })
    }

    return {
      ideaRef,
      projectRef,

      handleGoback,
      handleSubmit
    }
  }
})
</script>

<style>
.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 50px 0 100px;
}
</style>
