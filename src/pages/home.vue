<template>
  <div>
    <df-header @handleClickRight="handleClickHeaderSettings">
      <template #title>
        <span
          class="tags-container"
          v-for="(tag, index) of tags"
          :key="tag.id"
        >
          <van-tag
            round
            type="primary"
            :plain="tagSelected[index] ? false : true"
            @click="handleClickTagItem(index, tag.id)"
          >
            <span class="header-tag">
              {{ tag.title }}
            </span>
          </van-tag>
        </span>
      </template>

      <template #left>
        <van-tag
          round
          type="primary"
          :plain="allSelected ? false : true"
          @click="handleClickAllTag"
        >
          <span class="header-tag">
            所有
          </span>
        </van-tag>
      </template>

      <template #right>
        <van-icon
          name="setting-o"
          size="18"
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
        :type="['view', 'like', 'share']"
      >
      </df-card>
    </van-list>

    <!-- 悬浮按钮 -->
    <div class="fixed">
      <span class="idea">
        <van-button
          round
          @click="handleClickFloatButtonItem('idea')"
        >
          <van-icon name="gem-o" />
        </van-button>
        <van-button
          round
          @click="handleClickFloatButtonItem('project')"
        >
          <van-icon name="gift-o" />
        </van-button>
      </span>

      <van-button
        hairline
        round
        type="primary"
        @click="handleShow"
      >
        <template #icon>
          <van-icon name="plus" />
        </template>
      </van-button>
    </div>

    <!-- 遮罩层 -->
    <van-overlay
      :show="showOverlay"
      @click="showOverlay = false"
    >
      <div
        class="wrapper"
        @click.stop
      >
        <div class="block" />
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const store = useStore()

    // 标签列表
    const tags = computed(() => store.state.tags.data)
    // 想法列表
    const ideas = computed(() => store.state.ideas.data)

    // 是否显示悬浮按钮
    const display = ref('none')
    // 是否显示遮罩层
    const showOverlay = ref(false)
    const allSelected = ref(true)
    const tagSelected = reactive((new Array(tags.value.length)).fill(false))
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

    onMounted(() => {
      store.dispatch('tags/findAll')
    })

    // 加载效果
    const handleLoad = () => {
      lists.loading = false
      if (allSelected) {
        store.dispatch('ideas/getAllIdea', {
          ...page
        })
      } else {
        store.dispatch('ideas/findIdeaByTagId', {
          id: tagId,
          ...page
        })
      }

      page.pageIndex += 1
    }

    // 点击事件
    // ===================================
    // 显示悬浮按钮
    const handleShow = () => {
      display.value = 'block'
    }
    // 点击悬浮按钮
    const handleClickFloatButtonItem = (type: string) => {
      router.push(`/form/${type}`)
    }
    // 点击 headers 右侧的 settings icon
    const handleClickHeaderSettings = () => {
      showOverlay.value = true
    }
    // 点击某个标签
    const handleClickTagItem = (index: number, id: string) => {
      scroll({
        top: 0
      })

      page.pageIndex = 1
      tagSelected.fill(false)
      tagSelected[index] = true
      allSelected.value = false
      tagId.value = id

      store.dispatch('ideas/findIdeaByTagId', {
        id,
        ...page
      })
    }
    // 点击所有标签
    const handleClickAllTag = () => {
      scroll({
        top: 0
      })

      tagSelected.fill(false)
      allSelected.value = true
      page.pageIndex = 1

      store.dispatch('ideas/getAllIdea', {
        ...page
      })
    }

    return {
      tags,
      ideas,
      lists,
      display,
      allSelected,
      tagSelected,
      showOverlay,

      handleLoad,
      handleShow,
      handleClickAllTag,
      handleClickTagItem,
      handleClickHeaderSettings,
      handleClickFloatButtonItem
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
