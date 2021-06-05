<template>
  <div>
    <df-header left-arrow></df-header>
    {{ id }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import DfHeader from '../layouts/DfHeader.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader
  },

  setup () {
    const { params } = useRoute()

    return {
      id: params.id
    }
  }
})
</script>
