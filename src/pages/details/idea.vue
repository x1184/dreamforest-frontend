<template>
  <div>
    <df-header>
      <template #left>
        <van-icon
          name="arrow-left"
          @click="handleGoback"
        />
      </template>

      <template #right>
        <van-icon name="share-o" />
      </template>
    </df-header>

    <div class="details-container">
      <div>
        <div class="details-title">想法标题</div>
        <div>我想打造一个关于梦想想法创意交流的社区</div>
      </div>
      <div>
        <div class="details-title">想法内容</div>
        <div class="details-content">
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
          我想打造一个关于梦想想法创意交流的社区
        </div>
      </div>
      <div>
        <div class="details-title">
          <span>发起人</span>
          <span class="details-create-time">发布于 2021/06/06 21:21</span>
        </div>
        <div class="details-initiator">
          <div>
            <img
              src="https://img.yzcdn.cn/vant/ipad.jpeg"
              alt="avatar"
            >
          </div>
          <div>
            <div>马云</div>
            <div>ID: 123123</div>
          </div>
        </div>
      </div>
      <div>
        <div class="details-title">趋势</div>
        <div class="details-icon">
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
            <span>
              234
            </span>
          </div>
          <div>
            <span>
              <van-icon name="share-o" />
            </span>
            <span>345</span>
          </div>
        </div>
      </div>
      <div>
        <div class="details-title">标签</div>
        <div>
          <van-tag
            plain
            round
            type="primary"
          >
            <span class="header-tag">
              标签
            </span>
          </van-tag>
        </div>
      </div>
      <div>
        <div class="details-title">状态</div>
        <div class="details-status">
          <div>12</div>
          <div>
            <van-icon name="arrow-left" />
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
          <div>14</div>
        </div>
      </div>
      <div>
        <div class="details-title">关联项目</div>
        <div class="details-project">
          <div>
            梦想森林 -- 逐梦自己的社区
          </div>
        </div>

        <div class="details-project">
          <div>
            梦想森林 -- 逐梦自己的社区
          </div>
        </div>

        <div class="details-project">
          <div>
            梦想森林 -- 逐梦自己的社区
          </div>
        </div>
      </div>
      <div>
        <div>
          <van-button
            block
            plain
            hairline
            color="#00000082"
          >
            关联项目
          </van-button>
        </div>
      </div>

      <van-sticky position="bottom">
        <div class="details-sticky-bottom">
          <div>
            <span>
              <van-icon name="like-o" />
            </span>
            <span>点赞</span>
          </div>

          <div>
            <span>
              <van-icon name="like-o" />
            </span>
            <span>关注</span>
          </div>

          <div
            class="details-comment"
            @click="handleToggleShowPopup"
          >
            <div>
              <hr />
            </div>
            <div>
              <van-button>
                发表
              </van-button>
            </div>
          </div>
        </div>
      </van-sticky>
    </div>

    <van-popup
      round
      close-on-popstate
      position="bottom"
      v-model:show="showPopup"
      :style="{ height: '60%' }"
    >
      <div>
        <div>
          <span>所有评论</span>
          <span>
            <span>发表时间</span>
            <span>
              <van-icon name="descending" />
            </span>
          </span>
        </div>
        <div></div>
        <div>
          <van-field maxlength="50"></van-field>
          <van-button>发表</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import DfHeader from '../../layouts/DfHeader.vue'

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader
  },

  setup () {
    const router = useRouter()
    const { params } = useRoute()
    const showPopup = ref(false)

    const handleGoback = () => {
      router.go(-1)
    }
    const handleToggleShowPopup = () => {
      showPopup.value = !showPopup.value
    }

    return {
      id: params.id,
      showPopup,

      handleGoback,
      handleToggleShowPopup
    }
  }
})
</script>

<style>
.details-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column;

  margin: 10px 20px;

  font-size: 20px;
}

.details-container > div {
  width: 100%;
  margin-bottom: 35px;
}

.details-container > div:last-child {
  width: 100%;
  margin-bottom: 0;
}

.details-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 24px;
  margin-bottom: 10px;
}

.details-create-time {
  font-size: 16px;
  color: #00000082;
}

.details-content {
  max-height: 30vh;
  overflow-y: auto;
}

.details-initiator {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.details-initiator img {
  margin-right: 20px;

  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0.2rem 0.2rem 0.13333rem #88888861;
}

.details-icon {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  font-size: 24px;
}

.details-icon i {
  margin-right: 5px;

  font-size: 28px;
}

.details-status {
  display: flex;
  justify-content: center;
  align-items: center;
}

.details-status > div {
  margin: 0 10px;
}

.details-project {
  margin: 10px 20px;
  padding: 5px 10px;

  border: 1px solid #000000;
  border-radius: 5px;
}

.details-sticky-bottom {
  display: flex;
  align-items: center;

  padding: 5px;

  background-color: #fff;
}

.details-sticky-bottom div:not(.details-comment) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  flex: 1;

  height: 100%;
}

.details-comment {
  flex: 50% 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  padding: 5px;

  border-radius: 5px;

  background-color: #ccc;
}

.details-comment div:first-child {
  flex: 2;
}

.details-comment hr {
  margin-left: 10px;
  margin-top: 5px;
  width: 100%;
}

.header-tag {
  padding: 5px 10px;
}
</style>
