<template>
  <div>
    <df-header></df-header>
    <df-personal-card></df-personal-card>
    <van-cell-group>
      <van-cell
        center
        clickable
        is-link
        value="个人信息"
        @click="handleCellClick('/personal')"
      />
      <van-cell
        center
        clickable
        is-link
        value="我的点赞"
        @click="handleCellClick('/my-like')"
      />
      <van-cell
        center
        clickable
        is-link
        value="关于"
        @click="handleCellClick('/about')"
      />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

import DfPersonalCard from '../components/DfPersonalCard.vue'
import DfHeader from '../layouts/DfHeader.vue'

export default defineComponent({
  name: 'df-personal',

  components: {
    [DfPersonalCard.name]: DfPersonalCard,
    [DfHeader.name]: DfHeader
  },

  setup () {
    const router = useRouter()

    const mine = reactive({
      id: '7',
      name: 'Jobs',
      createTime: '2021/06/06 21:21',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscingIdea:Lorem ipsum dolor sit amet, consectetur adipiscing'
    })

    const handleCellClick = (path: string) => {
      router.push(path)
    }

    return {
      mine,

      handleCellClick
    }
  }
})
</script>
