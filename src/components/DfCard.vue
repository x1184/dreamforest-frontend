<template>
  <div class="df-card-container">
    <div class="df-card-avatar" @click="handleClick">
      <div>
        <img
          :src="avatar"
          alt="avatar"
        >
      </div>

      <div class="df-card-title">
        <div>{{ title }}</div>
        <div class="df-card-name">
          <span>{{ name }}</span>
          发布于 {{ createTime }}
        </div>
      </div>
    </div>

    <div class="df-card-footer">
      <div class="df-card-tags">
        <van-tag
          round
          plain
          color="#000000"
        >
          <span class="df-card-tag-item">标签</span>
        </van-tag>
        <van-tag
          round
          plain
          color="#000000"
          @click="handleToggleTags"
        >
          <span class="df-card-tag-item">...</span>
        </van-tag>
      </div>

      <div class="df-card-icon">
        <div>
          <span>
            <van-icon name="discount" />
          </span>
          <span>{{ times.view }}</span>
        </div>
        <div>
          <span>
            <van-icon name="like-o" />
          </span>
          <span>
            {{ times.like }}
          </span>
        </div>
        <div>
          <span>
            <van-icon name="share-o" />
          </span>
          <span></span>
        </div>
      </div>
    </div>

    <transition name="van-fade">
      <div
        v-show="showTags"
        class="df-card-hidden-tags"
      >
        <van-tag
          round
          plain
          color="#000000"
        >
          <span class="df-card-tag-item">标签</span>
        </van-tag>
        <van-tag
          round
          plain
          color="#000000"
        >
          <span class="df-card-tag-item">...</span>
        </van-tag>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'df-card',

  props: {
    id: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: 'https://img.yzcdn.cn/vant/ipad.jpeg'
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    times: {
      type: Object,
      default: () => ({
        view: 0,
        like: 0
      })
    },
    createTime: {
      type: String,
      required: true
    }
  },

  setup ({ id }) {
    const router = useRouter()

    const showTags = ref(false)

    const handleToggleTags = () => {
      showTags.value = !showTags.value
    }

    const handleClick = () => {
      router.push(`/detail/${id}`)
    }

    return {
      showTags,

      handleToggleTags,
      handleClick
    }
  }
})
</script>

<style>
.df-card-container {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-flow: column;

  margin: 10px 20px;
  padding: 10px;

  font-size: 16px;
  box-shadow: 0.2rem 0.2rem 0.13333rem #88888861;
}

.df-card-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.df-card-avatar img {
  margin: 10px;

  width: 80px;
  height: 80px;

  border-radius: 50%;
  box-shadow: 0.2rem 0.2rem 0.13333rem #88888861;
}

.df-card-name {
  margin-top: 10px;

  font-size: 14px;
  color: #00000082;
}

.df-card-name span {
  color: #000000;
}

.df-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
}

.df-card-tags {
  flex: 1;
}

.df-card-icon {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  flex: 1;
}

.df-card-icon > div {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-left: 5px;
}

.df-card-icon span {
  margin-right: 5px;
}

.df-card-icon i {
  font-size: 24px;
}

.df-card-tags > span {
  margin-left: 10px;
}

.df-card-tag-item {
  padding: 5px 10px;
}

.df-card-hidden-tags {
  margin: 5px 10px;
  width: 100%;
}

.df-card-hidden-tags > span {
  margin-left: 10px;
}
</style>
