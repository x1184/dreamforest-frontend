<template>
  <div>
    <df-header>
      <template #title>
        个人信息
      </template>

      <template #left>
        <van-icon
          name="arrow-left"
          @click="handleGoback"
        />
      </template>
    </df-header>

    <div class="user-container">
      <df-personal-card
        type="createTime"
        :user="user.information"
      ></df-personal-card>
      <div class="user-icon">
        <div>
          <span>
            <van-icon name="discount" />
          </span>
          <span>
            {{ user.information.times.star}}
          </span>
        </div>

        <div>
          <span>
            <van-icon name="like-o" />
          </span>
          <span>
            {{ user.information.times.like }}
          </span>
        </div>

        <div>
          <span>
            <van-icon name="share-o" />
          </span>
          <span>
            {{ user.information.times.share }}
          </span>
        </div>
      </div>

      <div class="user-content">
        <div class="user-introduce">介绍</div>
        <div class="user-description">
          {{ user.information.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import DfHeader from '../../layouts/DfHeader.vue'
import DfPersonalCard from '../../components/DfPersonalCard.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader,
    [DfPersonalCard.name]: DfPersonalCard
  },

  setup () {
    const { params } = useRoute()
    const router = useRouter()
    const store = useStore()

    const user = reactive({
      information: {
        description: '',
        times: {
          star: 0,
          like: 0,
          share: 0
        }
      }
    })

    onMounted(async () => {
      const response = await store.dispatch('user/findUserInfoByUserId', {
        id: params.id
      })

      user.information = response.data
    })

    const handleGoback = () => {
      router.go(-1)
    }

    return {
      user,

      handleGoback
    }
  }
})
</script>

<style>
.user-container {
  margin: 30px;
  text-overflow: wrap;

  font-size: 18px;
}

.user-icon {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin: 10px 0;

  font-size: 16px;
}

.user-icon i {
  margin-right: 5px;

  font-size: 24px;
}

.user-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  margin-top: 20px;
  padding: 5px 10px;
}

.user-introduce {
  flex: 40px 1;
  margin: 0 10px;
}

.user-description {
  flex: 80% 1;
}
</style>
