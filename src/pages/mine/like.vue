<template>
  <div>
    <df-header>
      <template #title>
        我的点赞
      </template>

      <template #left>
        <van-icon
          name="arrow-left"
          @click="handleGoback"
        />
      </template>
    </df-header>

    <van-list
      v-model:loading="lists.loading"
      finished-text="没有更多了"
      :finished="lists.finished"
      @load="handleLoad"
    >
      <df-card
        v-for="item in ideas"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :title="item.title"
        :avatar="item.avatar"
        :createTime="item.createTime"
        :link="item.link"
      >
      </df-card>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import DfHeader from '../../layouts/DfHeader.vue'
import DfCard from '../../components/DfCard.vue'

interface IListProps {
  loading: boolean;
  finished: boolean;
}

export default defineComponent({
  name: 'df-home',

  components: {
    [DfCard.name]: DfCard,
    [DfHeader.name]: DfHeader
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const ideas = computed(() => store.state.ideas.data)
    // 列表
    const lists = reactive<IListProps>({
      loading: false,
      finished: false
    })
    // 分页参数
    const page = reactive({
      pageIndex: 1,
      pageSize: 10
    })

    // 后退
    const handleGoback = () => {
      router.go(-1)
    }

    // 加载效果
    const handleLoad = () => {
      lists.loading = false
      store.dispatch('ideas/getAllIdea', {
        ...page
      })

      page.pageIndex += 1
    }

    return {
      lists,
      ideas,

      handleGoback,
      handleLoad
    }
  }
})
</script>

<style lang="css">
.fixed {
  position: fixed;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 30px;

  bottom: 100px;
  right: 30px;
}

.idea {
  display: v-bind(display);
  font-size: 20px;
}

.van-nav-bar__title {
  overflow-x: auto;
  text-overflow: unset;
}

.tags-container {
  margin-left: 10px;
  width: 100%;
}

.header-tag {
  padding: 5px 10px;
}
</style>
