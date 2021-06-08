<template>
  <van-card
    centered
    :thumb="thumb"
    @click="handleClick"
  >
    <template #title>
      <van-row>
        <van-col span="8">{{ name }}</van-col>
        <van-col span="8">{{ company }}</van-col>
      </van-row>
    </template>

    <template #desc>
      <van-row>
        <van-col span="6">Idea:</van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          {{ description }}
        </van-col>
      </van-row>
    </template>
  </van-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'df-card',

  props: {
    id: {
      type: [String, Number],
      requried: true
    },
    thumb: {
      type: String,
      default: 'https://img.yzcdn.cn/vant/ipad.jpeg'
    },
    name: {
      type: String,
      required: true
    },
    company: {
      type: String
    },
    description: {
      type: String
    }
  },

  setup ({ id }) {
    const router = useRouter()
    const handleClick = () => {
      console.log('click')
      router.push(`/detail/${id}`)
    }

    return {
      handleClick
    }
  }
})
</script>
