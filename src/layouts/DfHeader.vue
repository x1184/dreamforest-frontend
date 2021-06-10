<template>
  <van-nav-bar
    fixed
    placeholder
    safe-area-inset-top
    :left-arrow="leftArrow"
    :title="title"
    @click-left="handleClickLeft"
    @click-right="handleClickRight"
  >
    <template #title>
      <slot name="title"></slot>
    </template>

    <template #left>
      <slot name="left"></slot>
    </template>

    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NavBar, Icon } from 'vant'

export default defineComponent({
  name: 'df-header',

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },

  props: {
    leftArrow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    handleClickRight: {
      type: Function
    },
    handleClickLeft: {
      type: Function
    }
  }
})
</script>
