<template>
  <div>
    <df-header></df-header>
    <df-card
      :name="mine.name"
      :description="mine.description" />
    <van-cell-group>
      <van-cell
        center
        clickable
        is-link
        value="个人资料" />
      <van-cell
        center
        clickable
        is-link
        value="我的点赞" />
      <van-cell
        center
        clickable
        is-link
        value="关于" />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { CellGroup, Cell } from 'vant'
import DfCard from '../components/DfCard.vue'
import DfHeader from '../layouts/DfHeader.vue'

export default defineComponent({
  name: 'df-personal',

  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [DfCard.name]: DfCard,
    [DfHeader.name]: DfHeader
  },

  setup () {
    const mine = reactive({
      id: '7',
      name: 'Jobs',
      company: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscingIdea:Lorem ipsum dolor sit amet, consectetur adipiscing'
    })

    return {
      mine
    }
  }
})
</script>
