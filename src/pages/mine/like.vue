<template>
  <div>
    <df-header>
      <template #left>
        <van-icon
          name="arrow-left"
          @click="handleGoback"
        />
      </template>

      <template #title>
        我的点赞
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
import { useRouter } from 'vue-router'

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
    const store = useStore()
    const router = useRouter()

    // 想法列表
    const ideas = computed(() => store.state.ideas.data)
    const tagId = ref('')
    const showPopup = ref(false)
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
      store.dispatch('ideas/findLikeIdeaByUserId', {
        id: tagId,
        ...page
      })

      page.pageIndex += 1
    }
    const handleToggleShowPopup = () => {
      showPopup.value = !showPopup.value
    }
    const handleGoback = () => {
      router.go(-1)
    }

    return {
      ideas,
      lists,
      showPopup,

      handleLoad,
      handleGoback,
      handleToggleShowPopup
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

.star-popup-container {
  position: relative;
  /* margin: 10px 5px; */
}

.star-popup-title {
  z-index: 999;
  position: sticky;
  top: 0;

  background-color: #fff;
}

.star-popup-container div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.star-popup-container > div:last-child {
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 5px 10px;
  width: 100%;

  font-size: 18px;
  background-color: #fff;
}
</style>
