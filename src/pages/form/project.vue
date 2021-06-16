<template>
  <div>
    <df-header>
      <template #title>
        <span>
          关联项目
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

    <df-form-project :ref="el => projectRef = el"></df-form-project>

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

import DfFormProject from '../../components/DfFormProject.vue'
import DfHeader from '../../layouts/DfHeader.vue'

export default defineComponent({
  components: {
    [DfFormProject.name]: DfFormProject,
    [DfHeader.name]: DfHeader
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const projectRef = ref(null)

    const handleGoback = () => {
      router.go(-1)
    }

    const handleSubmit = () => {
      const form = (projectRef.value as any).form
      if (!form.title) {
        Toast({
          message: '请输入项目标题'
        })

        return null
      }

      if (!form.content) {
        Toast({
          message: '请输入项目内容'
        })

        return null
      }

      store.dispatch('projects/addProject', form)
    }

    return {
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
