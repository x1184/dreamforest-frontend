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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { IIdeaProps, IPersonalProps } from '../../interface'
import DfHeader from '../../layouts/DfHeader.vue'
import DfCard from '../../components/DfCard.vue'

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

    // idea 列表
    const lists = reactive<IListProps>({
      data: [],
      loading: false,
      finished: false
    })

    const handleGoback = () => {
      router.go(-1)
    }

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

    return {
      lists,

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
