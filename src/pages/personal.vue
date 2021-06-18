<template>
  <div>
    <df-personal-card
      :user="user"
      type="createTime"
    ></df-personal-card>

    <van-cell-group>
      <van-cell
        center
        clickable
        is-link
        value="个人信息"
        @click="handleCellClick('/mine')"
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
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import DfPersonalCard from '../components/DfPersonalCard.vue'

export default defineComponent({
  name: 'df-personal',

  components: {
    [DfPersonalCard.name]: DfPersonalCard
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const user = computed(() => store.state.user.information)

    onMounted(() => {
      store.dispatch('user/findUserInfoByToken')
    })

    const handleCellClick = (path: string) => {
      router.push(path)
    }

    return {
      user,

      handleCellClick
    }
  }
})
</script>
