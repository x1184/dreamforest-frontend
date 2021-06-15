<template>
  <div>
    <df-header>
      <template #left>
        <van-icon
          name="arrow-left"
          @click="handleGoback"
        />
      </template>

      <template #title>
        个人信息
      </template>

      <template #right>
        <van-button
          size="small"
          @click="handleModify"
        >
          修改
        </van-button>
      </template>
    </df-header>

    <div>
      <df-personal-card
        type="createTime"
        :user="user"
      ></df-personal-card>

      <van-cell-group>
        <van-cell title="手机号">
          <span>{{ user.phone }}</span>
          <template #right-icon>
            <van-icon
              name="edit"
              size="25px"
            />
          </template>
        </van-cell>

        <van-cell title="邮箱">
          <span>{{ user.email }}</span>
          <template #right-icon>
            <van-icon
              name="edit"
              size="25px"
            />
          </template>
        </van-cell>

        <van-cell title="密码">
          <template #right-icon>
            <van-icon
              name="edit"
              size="25px"
            />
          </template>
        </van-cell>

        <van-cell
          title="介绍"
          :value="user.description"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import DfHeader from '../../layouts/DfHeader.vue'
import DfPersonalCard from '../../components/DfPersonalCard.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader,
    [DfPersonalCard.name]: DfPersonalCard
  },

  setup () {
    const router = useRouter()
    const store = useStore()

    const user = computed(() => store.state.user.information)

    const handleGoback = () => {
      router.go(-1)
    }

    const handleModify = () => {
      router.push('/modify')
    }

    return {
      user,
      handleGoback,
      handleModify
    }
  }
})
</script>
