<template>
  <div>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DfFooter from './layouts/DfFooter.vue'

export default defineComponent({
  components: {
    [DfFooter.name]: DfFooter
  }
})
</script>
