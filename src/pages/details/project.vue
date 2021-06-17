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

    <div class="details-container">
      <div>
        <div class="details-title">项目标题</div>
        <div>
          {{ project.title }}
        </div>
      </div>
      <div>
        <div class="details-title">项目内容</div>
        <div class="details-content">
          {{ project.content }}
        </div>
        <div class="details-create-time">
          创建于 {{ project.createTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import DfHeader from '../../layouts/DfHeader.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader
  },

  setup () {
    const { params } = useRoute()
    const router = useRouter()
    const store = useStore()

    const project = computed(() => store.state.projects.data)

    // onMounted
    onMounted(() => {
      store.dispatch('projects/findProjectDetailByProjectId', {
        id: params.id
      })
    })

    const handleGoback = () => {
      router.go(-1)
    }

    return {
      project,

      handleGoback
    }
  }
})
</script>

<style>
.details-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column;

  margin: 10px 20px;

  font-size: 20px;
}

.details-container > div {
  width: 100%;
  margin-bottom: 35px;
}

.details-container > div:last-child {
  width: 100%;
  margin-bottom: 0;
}

.details-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 24px;
  margin-bottom: 10px;
}

.details-content {
  max-height: 30vh;
  overflow-y: auto;
}

.details-create-time {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 20px;
  padding: 5px 10px;

  font-size: 16px;
  color: #00000082;
}
</style>
