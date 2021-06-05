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
    <template #right>
      <van-icon :name="icon" size="18" />
    </template>

    <template #title>
      <slot></slot>
    </template>
  </van-nav-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NavBar, Icon } from 'vant'
import { useRouter } from 'vue-router'

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
    handleClickRight: {
      type: Function
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    }
  },

  setup () {
    const router = useRouter()

    const handleClickLeft = () => {
      router.back()
    }

    return {
      handleClickLeft
    }
  }
})
</script>
