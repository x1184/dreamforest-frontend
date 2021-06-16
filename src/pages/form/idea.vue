<template>
  <div>
    <df-header>
      <template #title>
        <span>
          添加想法
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

    <df-form-idea :ref="el => ideaRef = el"></df-form-idea>

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

import DfFormIdea from '../../components/DfFormIdea.vue'
import DfHeader from '../../layouts/DfHeader.vue'

export default defineComponent({
  components: {
    [DfFormIdea.name]: DfFormIdea,
    [DfHeader.name]: DfHeader
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const ideaRef = ref(null)

    const handleGoback = () => {
      router.go(-1)
    }

    const handleSubmit = () => {
      const form = (ideaRef.value as any).form

      if (!form.title) {
        Toast({
          message: '请输入想法标题'
        })

        return null
      }

      if (!form.content) {
        Toast({
          message: '请输入想法内容'
        })

        return null
      }

      store.dispatch('ideas/addNewIdea', {
        idea: {
          ...form,
          plan: {
            startTime: form.plan[0],
            endTime: form.plan[1]
          }
        }
      })
    }

    return {
      ideaRef,

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
