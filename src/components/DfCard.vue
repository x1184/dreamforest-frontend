<template>
  <div class="df-card-container">
    <div
      class="df-card-avatar"
      @click="handleClick"
    >
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
          v-show="cardTags.length"
        >
          <span class="df-card-tag-item">{{ cardTags.length ? cardTags[0].title : '' }}</span>
        </van-tag>
        <van-tag
          round
          plain
          color="#000000"
          @click="handleToggleTags"
          v-show="cardTags.length > 1"
        >
          <span class="df-card-tag-item">...</span>
        </van-tag>
      </div>

      <div class="df-card-icon">
        <div v-show="type.includes('comment')">
          <span>
            <van-icon name="chat-o" />
          </span>
          <span>{{ times.comment }}</span>
        </div>

        <div v-show="type.includes('view')">
          <span>
            <van-icon name="discount" />
          </span>
          <span>{{ times.view }}</span>
        </div>

        <div v-show="type.includes('like')">
          <span>
            <van-icon name="like-o" />
          </span>
          <span>
            {{ times.like }}
          </span>
        </div>

        <div v-show="type.includes('share')">
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
          v-for="tag of cardTags"
          :key="tag.id"
        >
          <span class="df-card-tag-item">{{ tag.title }}</span>
        </van-tag>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ITagProps } from '../interface'

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
    },
    tags: {
      type: Array,
      required: true
    },
    type: {
      type: Array,
      required: true
    }
  },

  setup ({ id, tags }) {
    const router = useRouter()

    const showTags = ref(false)
    const cardTags: ITagProps[] = tags as ITagProps[]

    const handleToggleTags = () => {
      showTags.value = !showTags.value
    }

    const handleClick = () => {
      router.push(`/idea/${id}`)
    }

    return {
      showTags,
      cardTags,

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

  margin: 10px;
  padding: 10px 5px;

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
  justify-content: flex-end;
  align-items: center;

  flex: 1;
}

.df-card-icon > div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.df-card-icon span {
  margin-right: 5px;
}

.df-card-icon i {
  font-size: 24px;
}

.df-card-tags {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.df-card-tags > span {
  margin-left: 3px;
}

.df-card-tag-item {
  padding: 5px 10px;
}

.df-card-hidden-tags {
  margin: 5px 0;
  width: 100%;
}

.df-card-hidden-tags > span {
  margin-top: 5px;
  margin-left: 3px;
}
</style>
