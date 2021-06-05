<template>
  <div>
    <df-header left-arrow></df-header>
    <df-form></df-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DfForm from '../components/DfForm.vue'
import DfHeader from '../layouts/DfHeader.vue'

export default defineComponent({
  components: {
    [DfForm.name]: DfForm,
    [DfHeader.name]: DfHeader
  }
})
</script>
