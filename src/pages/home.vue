<template>
  <div>
    <df-header>
      <template #title>
        <span
          class="tags-container"
          v-for="(tag, index) of showTags"
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
          @click="handleShowAllTags"
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
    <van-popup
      round
      lock-scroll
      close-on-popstate
      safe-area-inset-bottom
      position="top"
      v-model:show="showAllTags"
      :style="{ height: '70%' }"
    >
      <div class="tags-wrapper">
        <div>
          <div class="tags-title">首页展示</div>
          <div class="pop-tag">
            <span
              class="tag"
              v-for="tag of showTags"
              :key="tag.id"
            >
              <van-tag
                round
                type="primary"
                @click="handleClickOverlayTagItem(tag.id)"
              >
                <span class="header-tag">
                  {{ tag.title }}
                </span>
              </van-tag>
            </span>
          </div>
        </div>
        <div>
          <div class="tags-title">不在首页展示</div>
          <div class="pop-tag">
            <span
              class="tag"
              v-for="tag of hiddenTags"
              :key="tag.id"
            >
              <van-tag
                plain
                round
                @click="handleClickOverlayTagItem(tag.id)"
              >
                <span class="header-tag">
                  {{ tag.title }}
                </span>
              </van-tag>
            </span>
          </div>
        </div>

        <div class="pop-fix-button">
          <van-button
            type="danger"
            @click="handleHideAllTags"
          >
            新增
          </van-button>

          <van-button
            type="primary"
            @click="handleSaveAllTags"
          >
            保存
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-popup
      round
      lock-scroll
      close-on-popstate
      safe-area-inset-bottom
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div>
        新增标签
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { ITagProps } from '../interface'
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

  setup () {
    const router = useRouter()
    const store = useStore()

    // 标签列表
    const tags = computed(() => store.state.tags.data)
    const showTags = computed(() => tags.value.filter((tag: ITagProps) => tag.show))
    const hiddenTags = computed(() => tags.value.filter((tag: ITagProps) => !tag.show))
    // 想法列表
    const ideas = computed(() => store.state.ideas.data)
    const total = computed(() => store.state.ideas.total)

    // 是否显示悬浮按钮
    const display = ref('none')
    // 是否显示遮罩层
    const showAllTags = ref(false)
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
      if (ideas.value.length >= total.value) {
        lists.finished = true
        lists.loading = true
      } else {
        lists.loading = false

        if (allSelected.value) {
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
    const handleShowAllTags = () => {
      showAllTags.value = true
    }
    const handleHideAllTags = () => {
      showAllTags.value = false
    }
    const handleSaveAllTags = () => {
      store.dispatch('tags/updateUserTagsConfigByUserId')
      handleHideAllTags()
    }
    // 点击某个标签
    const handleClickTagItem = (index: number, id: string) => {
      scroll({
        top: 0
      })

      lists.loading = false
      lists.finished = false
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

      lists.loading = false
      lists.finished = false
      tagSelected.fill(false)
      allSelected.value = true
      page.pageIndex = 1

      store.dispatch('ideas/getAllIdea', {
        ...page
      })
    }

    // 遮罩层的标签
    const handleClickOverlayTagItem = (id: string) => {
      store.commit('tags/updateTagShowById', {
        id
      })
    }

    return {
      tags,
      showTags,
      hiddenTags,
      ideas,
      lists,
      display,
      allSelected,
      tagSelected,
      showAllTags,

      handleLoad,
      handleShow,
      handleClickAllTag,
      handleClickTagItem,
      handleShowAllTags,
      handleHideAllTags,
      handleSaveAllTags,
      handleClickFloatButtonItem,
      handleClickOverlayTagItem
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

.tags-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-flow: column;

  padding: 10px 20px;
  height: 100%;

  font-size: 16px;
}

.tags-wrapper > div {
  box-sizing: border-box;
  flex: 2;
  margin: 20px 0;
}

.tags-wrapper .tags-title {
  padding: 10px 0;
}

.pop-tag {
  margin-top: 20px;
}

.pop-tag .tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin: 3px;
}

.tags-wrapper .pop-fix-button {
  flex: 40px 1;
  margin: 20px 0;
}

.pop-fix-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pop-fix-button button:last-child {
  flex: 60% 3;
  margin-left: 10px;
}
</style>
