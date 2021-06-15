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
        修改基本信息
      </template>
    </df-header>

    <div>
      <div class="avatar-uploader">
        <van-uploader
          :max-count="1"
          v-model="form.avatar"
        >
          <div>
            点击上传头像
          </div>

          <template #preview-cover="">
            <div class="preview-cover van-ellipsis">
            </div>
          </template>
        </van-uploader>
      </div>

      <van-cell
        center
        title="昵称"
        size="large"
      >
        <van-field
          v-model="form.name"
          :placeholder="user.name || '请输入昵称'"
        />
      </van-cell>

      <van-cell
        title="介绍"
        size="large"
      >
        <van-field
          v-model="form.description"
          rows="10"
          autosize
          type="textarea"
          :placeholder="user.description || '请输入介绍'"
        />
      </van-cell>
    </div>

    <div class="modify-footer-save">
      <van-button @click="handleModify">
        保存
      </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
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
    const form = reactive({
      avatar: [],
      name: '',
      description: ''
    })

    const handleGoback = () => {
      router.go(-1)
    }

    const handleModify = () => {
      if (!form.name) {
        form.name = store.state.user.information.name
      }

      if (!form.description) {
        form.description = store.state.user.information.description
      }

      console.log(105, store.state.user.information)
    }

    return {
      user,
      form,

      handleGoback,
      handleModify
    }
  }
})
</script>

<style>
.van-cell__value {
  flex: 2;
}

.modify-footer-save {
  position: absolute;
  bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
}

.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding: 10px 20px;

  border: 1px dashed #ccc;
  font-size: 20px;
}
</style>
