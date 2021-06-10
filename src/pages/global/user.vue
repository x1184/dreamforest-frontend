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
      <df-personal-card></df-personal-card>
      <div class="user-icon">
        <div>
          <span>
            <van-icon name="discount" />
          </span>
          <span>123</span>
        </div>
        <div>
          <span>
            <van-icon name="like-o" />
          </span>
          <span>234</span>
        </div>
        <div>
          <span>
            <van-icon name="share-o" />
          </span>
          <span>345</span>
        </div>
      </div>
      <div class="user-content">
        <div class="user-introduce">介绍</div>
        <div class="user-description">
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
          你真的很好
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import DfHeader from '../../layouts/DfHeader.vue'
import DfPersonalCard from '../../components/DfPersonalCard.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader,
    [DfPersonalCard.name]: DfPersonalCard
  },

  setup () {
    const router = useRouter()

    const handleGoback = () => {
      router.go(-1)
    }

    return {
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
