<template>
  <van-tabbar
    fixed
    route
    placeholder
    safe-area-inset-bottom
    v-model="active"
    @change="handleChange"
  >
    <van-tabbar-item
      replace
      v-for="item of tabbar"
      :key="item.name"
      :name="item.name"
      :icon="item.icon"
      :to="item.path"
    >
      {{item.label}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant'

export default defineComponent({
  name: 'df-footer',

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  setup() {
    const active = ref('Explore')
    const tabbar = reactive([{
      name: 'Explore',
      label: '发现',
      path: '/explore'
    }, {
      name: 'Star',
      label: '关注',
      path: '/star'
    }, {
      name: 'Mine',
      label: '我的',
      path: '/personal'
    }])

    // TODO jump to router
    const handleChange = (index: string) => {
      console.log(51, 'df-footer', active)
    }

    return {
      active,
      tabbar,
      handleChange
    }
  }
})
</script>
