<template>
  <div>
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
        :name="item.initiator?.name"
        :title="item.title"
        :avatar="item.initiator?.avatar"
        :createTime="item.createTime"
        :link="item.link"
        :tags="item.tags"
        :times="item.times"
        :type="['view', 'like', 'share']"
      >
      </df-card>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

import DfHeader from '../layouts/DfHeader.vue'
import DfCard from '../components/DfCard.vue'

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

  setup() {
    const store = useStore()

    // 想法列表
    const ideas = computed(() => store.state.ideas.data)
    const tagId = ref('')
    const page = reactive({
      pageIndex: 1,
      pageSize: 10
    })
    // idea 列表
    const lists = reactive<IListProps>({
      loading: false,
      finished: false
    })

    // 加载效果
    const handleLoad = () => {
      lists.loading = false
      store.dispatch('ideas/findIdeaByTagId', {
        id: tagId,
        ...page
      })

      page.pageIndex += 1
    }

    return {
      ideas,
      lists,

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
