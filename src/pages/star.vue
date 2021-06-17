<template>
  <div>
    <df-header>
      <template #title>
        我的关注
      </template>
      <template #right>
        <van-icon
          name="bars"
          @click="handleToggleShowPopup"
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
        :name="item.initiator?.name"
        :title="item.title"
        :avatar="item.initiator?.avatar"
        :createTime="item.createTime"
        :link="item.link"
        :tags="item.tags"
        :times="item.times"
        :type="['comment', 'like', 'share']"
      >
      </df-card>
    </van-list>

    <van-popup
      lock-scroll
      close-on-popstate
      position="bottom"
      v-model:show="showPopup"
      :style="{ height: '90%' }"
    >
      <div class="star-popup-container">
        <div class="star-popup-title">
          选择想法
        </div>

        <van-list
          v-model:loading="lists.loading"
          finished-text="没有更多了"
          :finished="lists.finished"
          @load="handleLoad"
        >
          <df-card
            v-for="(idea, index) of ideas"
            :clickable="false"
            :selected="selected.list[index]"
            :key="idea.id"
            :id="idea.id"
            :name="idea.initiator?.name"
            :title="idea.title"
            :avatar="idea.initiator?.avatar"
            :createTime="idea.createTime"
            :link="idea.link"
            :tags="idea.tags"
            :times="idea.times"
            :type="['comment', 'like', 'share']"
            @handleClickCard="handleSelectedCard(index)"
          >
          </df-card>
        </van-list>

        <div>
          <van-checkbox
            v-model="selected.all"
            @change="handleSelectedAllButton"
          >
            全选
          </van-checkbox>

          <van-button
            size="small"
            @click="handleCancelStar"
          >
            取消关注
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import DfHeader from '../layouts/DfHeader.vue'
import DfCard from '../components/DfCard.vue'

interface IListProps {
  loading: boolean;
  finished: boolean;
}
interface ISelectedProps {
  list: boolean[];
  all: boolean;
}

export default defineComponent({
  name: 'df-home',

  components: {
    [DfCard.name]: DfCard,
    [DfHeader.name]: DfHeader
  },

  setup () {
    const store = useStore()

    // 想法列表
    const ideas = computed(() => store.state.ideas.data)
    const total = computed(() => store.state.ideas.total)

    const selected = reactive<ISelectedProps>({
      list: [],
      all: false
    })
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
    const handleLoad = async () => {
      lists.loading = false
      await store.dispatch('ideas/findAttentionIdeaByUserId', {
        ...page
      })

      if (selected.all) {
        selected.list = Array.from(ideas.value, () => true)
      }

      if (ideas.value.length >= total) {
        lists.finished = true
      }

      page.pageIndex += 1
    }
    const handleToggleShowPopup = () => {
      showPopup.value = !showPopup.value
    }
    // 点击单个想法
    const handleSelectedCard = (index: number) => {
      console.log(selected)
      selected.all = false
      if (!selected.list[index]) {
        selected.list[index] = true
      } else {
        selected.list[index] = false
      }
    }
    // 点击全选按钮
    const handleSelectedAllButton = (value: boolean) => {
      selected.all = value

      if (selected.all) {
        selected.list = Array.from(ideas.value, () => true)
      } else {
        selected.list = Array.from(ideas.value, () => false)
      }
    }
    // 点击取消关注
    const handleCancelStar = async () => {
      if (selected.all) {
        const response = await store.dispatch('ideas/updateAllAttentionIdeaByUserId')
        if (response.code === 200) {
          store.dispatch('ideas/findAttentionIdeaByUserId')
          page.pageIndex = 1
          page.pageSize = 10
          showPopup.value = false
          selected.all = false
          selected.list = []
        }
      } else {
        const ids = []

        console.log(typeof ideas.value)

        for (let i = 0; i < ideas.value.length; i += 1) {
          if (selected.list[i]) {
            ids.push(ideas.value[i].id)
          }
        }

        const response = await store.dispatch('ideas/updateAttentionIdeaByUserId', {
          id: ids
        })

        if (response.code === 200) {
          store.dispatch('ideas/findAttentionIdeaByUserId')
          page.pageIndex = 1
          page.pageSize = 10
          showPopup.value = false
          selected.all = false
          selected.list = []
        }
      }
    }

    onMounted(() => {
      handleLoad()
    })

    return {
      ideas,
      lists,
      selected,
      showPopup,

      handleLoad,
      handleCancelStar,
      handleSelectedCard,
      handleToggleShowPopup,
      handleSelectedAllButton
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

.star-popup-container .van-list {
  margin-bottom: 50px;
}
</style>
