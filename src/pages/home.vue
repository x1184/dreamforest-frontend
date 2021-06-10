<template>
  <div>
    <df-header @handleClickRight="handleClickHeaderSettings">
      <template #title>
        <span
          class="tags-container"
          v-for="tag of tags"
          :key="tag.id"
        >
          <van-tag
            round
            type="primary"
            :plain="tag.select ? false : true"
            @click="handleClickTagItem(tag)"
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
          :plain="allTagsSelect"
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
        v-for="item in lists.data"
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
import { defineComponent, reactive, ref } from 'vue'
import { isUndefined } from 'lodash'
import { useRouter } from 'vue-router'

import { IIdeaProps, IPersonalProps, ITagProps } from '../interface'
import DfHeader from '../layouts/DfHeader.vue'
import DfCard from '../components/DfCard.vue'

interface IListProps {
  data: (IIdeaProps & IPersonalProps)[];
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

    // 是否显示悬浮按钮
    const display = ref('none')
    // idea 列表
    const lists = reactive<IListProps>({
      data: [],
      loading: false,
      finished: false
    })
    // 标签列表
    const tags = reactive<ITagProps[]>([{
      id: '1',
      title: '标签1',
      select: true
    }, {
      id: '2',
      title: '标签2',
      select: true
    }, {
      id: '3',
      title: '标签3',
      select: true
    }, {
      id: '4',
      title: '标签4',
      select: true
    }, {
      id: '5',
      title: '标签5',
      select: true
    }])
    const showOverlay = ref(false)
    const allTagsSelect = ref(false)

    // TODO 请求数据
    const handleLoad = () => {
      lists.data = [{
        id: '1',
        title: '我想打造一个关于梦想想法创意交流的社区',
        content: '',
        name: '马云',
        createTime: '2021/06/06 21:21',
        link: '马云',
        times: {
          like: 123,
          view: 123
        },
        tags: []
      }, {
        id: '1',
        title: '我想打造一个关于梦想想法创意交流的社区',
        content: '',
        name: '马云',
        createTime: '2021/06/06 21:21',
        link: '马云',
        times: {
          like: 123,
          view: 123
        },
        tags: [{
          title: '标签1'
        }]
      }]
      lists.loading = true
      lists.finished = true
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
    // 点击标签
    const handleClickTagItem = ({ id }: ITagProps) => {
      const clickTag = tags.find(tag => tag.id === id)
      allTagsSelect.value = true

      if (!isUndefined(clickTag)) {
        clickTag.select = !clickTag.select
      }
    }
    // 点击所有的标签
    const handleClickAllTag = () => {
      allTagsSelect.value = !allTagsSelect.value
      // TODO 发送查询所有想法的请求
    }
    // 点击 headers 右侧的 settings icon
    const handleClickHeaderSettings = () => {
      showOverlay.value = true
    }

    return {
      tags,
      lists,
      display,
      showOverlay,
      allTagsSelect,

      handleLoad,
      handleShow,
      handleClickTagItem,
      handleClickAllTag,
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
