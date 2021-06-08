<template>
  <div>
    <df-header icon="setting-o" @handleClickRight="handleClickHeaderSettings">
      <div class="tags-container">
        <van-tag
          type="primary"
          v-for="tag of tags"
          :plain="tag.show ? false : true"
          :key="tag.id"
          @click="handleClickTagItem(tag)"
        >标签</van-tag>
      </div>
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
        :thumb="item.thumb"
        :company="item.company"
        :description="item.description"></df-card>
    </van-list>

    <!-- 悬浮按钮 -->
    <div class="fixed">
      <span class="idea" :style="{ display }">
        <van-tag @click="handleClickFloatButtonItem('idea')">
          想法
        </van-tag>
        <van-tag @click="handleClickFloatButtonItem('project')">
          项目
        </van-tag>
      </span>

      <van-button hairline round type="primary" @click="handleShow">
        <template #icon>
          <van-icon name="plus" />
        </template>
      </van-button>
    </div>

    <!-- 遮罩层 -->
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block" />
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { isUndefined } from 'lodash'
import { useRouter } from 'vue-router'
import DfHeader from '../layouts/DfHeader.vue'

import DfCard from '../components/DfCard.vue'

interface IListItemProps {
  id: string | number;
  thumb?: string;
  name: string;
  company?: string;
  description?: string;
}

interface IListProps {
  data: IListItemProps[];
  loading: boolean;
  finished: boolean;
}

interface ITagItemProps {
  id: string | number;
  label: string;
  show: boolean;
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
    const tags = reactive<ITagItemProps[]>([])
    // 显示遮罩层
    const showOverlay = ref(false)

    // 显示悬浮按钮
    const handleShow = () => {
      display.value = 'block'
    }

    // TODO 请求数据
    const handleLoad = () => {
      lists.data = []
      lists.loading = true
      lists.finished = true
    }

    // 点击事件
    // ===================================
    // 点击悬浮按钮
    const handleClickFloatButtonItem = (type: string) => {
      router.push(`/form/${type}`)
    }
    // 点击标签
    const handleClickTagItem = ({ id }: ITagItemProps) => {
      const clickTag = tags.find(tag => tag.id === id)

      if (!isUndefined(clickTag)) {
        clickTag.show = !clickTag.show
      }
    }
    // 点击 headers 右侧的 settings icon
    const handleClickHeaderSettings = () => {
      console.log(215, 1)
      showOverlay.value = true

      console.log(217, showOverlay.value)
    }

    return {
      tags,
      lists,
      display,
      showOverlay,
      handleLoad,
      handleShow,
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
  display: none;
  font-size: 20px;
}

.tags-container {
  width: 100%;
  overflow-x: auto;
}
</style>
