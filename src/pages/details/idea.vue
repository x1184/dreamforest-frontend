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
        <div>{{ idea.information.title }}</div>
      </div>

      <div>
        <div class="details-title">想法内容</div>
        <div class="details-content">
          {{ idea.information.content }}
        </div>
      </div>

      <div>
        <div class="details-title">
          <span>发起人</span>
          <span class="details-create-time">发布于 {{ idea.information.createTime }}</span>
        </div>
        <div class="details-initiator">
          <div>
            <img
              :src="idea.information.initiator?.avatar"
              alt="avatar"
            >
          </div>
          <div>
            <div>{{ idea.information.initiator?.name }}</div>
            <div>ID: {{ idea.information.initiator?.showId }}</div>
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
            <span>
              {{ idea.information.times?.view }}
            </span>
          </div>
          <div>
            <span>
              <van-icon name="like-o" />
            </span>
            <span>
              {{ idea.information.times?.like }}
            </span>
          </div>
          <div>
            <span>
              <van-icon name="share-o" />
            </span>
            <span>
              {{ idea.information.times?.share }}
            </span>
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
            v-for="tag of tags.information"
            :key="tag.id"
          >
            <span class="header-tag">
              {{ tag.title }}
            </span>
          </van-tag>
        </div>
      </div>

      <div>
        <div class="details-title">状态</div>
        <div class="details-status">
          <div>{{ idea.information.plan?.startTime }}</div>
          <div>
            <van-icon name="arrow-left" />
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
          <div>{{ idea.information.plan?.endTime }}</div>
        </div>
      </div>

      <div>
        <div class="details-title">关联项目</div>
        <div
          class="details-project"
          v-for="project of projects.information"
          :key="project.id"
          @click="handleGoProjectDetail(`${project.id}`)"
        >
          <div>
            {{ project.title }}
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
            @click="handleGoAddProject"
          >
            关联项目
          </van-button>
        </div>
      </div>

      <van-sticky position="bottom">
        <div class="details-sticky-bottom">
          <div @click="handleClickLike">
            <span>
              <van-icon :name="idea.information.isLike ? 'like' : 'like-o'" />
            </span>
            <span>点赞</span>
          </div>

          <div @click="handleClickStar">
            <span>
              <van-icon :name="idea.information.isStar ? 'star' : 'star-o'" />
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
      <div class="detail-container">
        <div class="detail-comment-title">
          <span>所有评论</span>
          <span class="detail-comment-time">
            <span>发表时间</span>
            <span>
              <van-icon
                :name="pages.sort ? 'descending' : 'ascending'"
                @click="handleSortClick"
              />
            </span>
          </span>
        </div>
        <van-list
          v-model:loading="comments.loading"
          class="comment-container"
          finished-text="没有更多了"
          :finished="comments.finished"
          @load="handleLoadComment"
        >
          <div
            v-for="comment of comments.information"
            :key="comment.id"
            class="comment-detail"
          >
            <div class="avatar">
              <img
                :src="comment.user?.avatar"
                alt="avatar"
              >
            </div>

            <div class="comment-content">
              <div>
                {{ comment.user?.name }}
              </div>
              <div>
                {{ comment.title }}
              </div>
              <div>
                <span>发表于</span>
                <span>{{ comment.createTime }}</span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="detail-submit-container">
        <van-field
          v-model="comment.title"
          maxlength="50"
        ></van-field>
        <van-button @click="addCommentByUserIdAndIdeaId">发表</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { IIdeaProps, ITagProps, IProjectProps, ICommentProps } from '../../interface'

import DfHeader from '../../layouts/DfHeader.vue'

interface IIdeaInformationProps {
  information: IIdeaProps;
}
interface ITagsInformationProps {
  information: ITagProps[];
}
interface IProjectsInformationProps {
  information: IProjectProps[];
}
interface ICommentsInformationProps {
  information: ICommentProps[];
  total: number;
  loading: boolean;
  finished: boolean;
}

export default defineComponent({
  components: {
    [DfHeader.name]: DfHeader
  },

  setup () {
    const { params } = useRoute()
    const router = useRouter()
    const store = useStore()

    const showPopup = ref(false)
    const comment = reactive({
      title: ''
    })
    const idea = reactive<IIdeaInformationProps>({
      information: {
        title: '',
        content: ''
      }
    })
    const tags = reactive<ITagsInformationProps>({
      information: []
    })
    const projects = reactive<IProjectsInformationProps>({
      information: []
    })
    const comments = reactive<ICommentsInformationProps>({
      information: [],
      total: 1,
      loading: false,
      finished: false
    })
    const pages = reactive({
      pageIndex: 1,
      pageSize: 10,
      sort: 0
    })

    onMounted(async () => {
      const response = await store.dispatch('ideas/getIdeaDetailById', {
        id: params.id
      })

      idea.information = response.idea
      tags.information = response.tags
      projects.information = response.projects
    })

    // 加载
    const handleLoadComment = async () => {
      const response = await store.dispatch('ideas/findCommentByIdeaId', {
        ...pages,
        id: params.id
      })

      if (response) {
        for (const comment of response.comments) {
          comments.information.push(comment)
        }
        comments.total = response.total
        pages.pageIndex += 1
      }

      comments.loading = false

      if (comments.information.length >= comments.total) {
        comments.finished = true
        comments.loading = true
      }
    }
    // 退回
    const handleGoback = () => {
      router.go(-1)
    }
    // 前往项目详情
    const handleGoProjectDetail = (id: string) => {
      router.push(`/project/${id}`)
    }
    // 关联项目
    const handleGoAddProject = () => {
      router.push('/form/project')
    }
    const handleToggleShowPopup = async () => {
      showPopup.value = !showPopup.value
      if (!showPopup.value) {
        comments.finished = false
        comments.loading = false
        comments.total = 1
        comments.information = []
        pages.pageIndex = 1
      }
    }
    // 发表评论
    const addCommentByUserIdAndIdeaId = async () => {
      const response = await store.dispatch('ideas/addCommentByUserIdAndIdeaId', {
        ...comment,
        projectId: params.id
      })

      if (response.code === 200) {
        comment.title = ''
      }
    }
    // 点赞
    const handleClickLike = async () => {
      if (!idea.information.isLike) {
        const response = await store.dispatch('ideas/addLike', {
          id: params.id
        })

        if (response.code === 200) {
          idea.information.isLike = true
        }
      }
    }
    // 关注
    const handleClickStar = async () => {
      if (!idea.information.isStar) {
        const response = await store.dispatch('ideas/addStar', {
          id: params.id
        })

        if (response.code === 200) {
          idea.information.isStar = true
        }
      }
    }
    // 切换顺序
    const handleSortClick = async () => {
      pages.sort = 1
      pages.pageIndex = 1
      handleLoadComment()
    }

    return {
      idea,
      tags,
      pages,
      comment,
      projects,
      comments,
      showPopup,

      handleGoback,
      handleSortClick,
      handleClickLike,
      handleClickStar,
      handleLoadComment,
      handleGoProjectDetail,
      handleToggleShowPopup,
      addCommentByUserIdAndIdeaId,
      handleGoAddProject
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

.detail-container {
  position: relative;

  margin: 5px 10px;
  margin-top: 30px;
  font-size: 24px;
}

.detail-comment-time {
  display: flex;
  align-items: center;
}

.detail-container i {
  margin-left: 10px;
  font-size: 30px;
}

.detail-comment-title {
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;

  background: white;
}

.detail-container .comment-detail {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-top: 20px;

  font-size: 16px;
}

.detail-container .comment-detail img {
  margin-right: 10px;

  width: 70px;
  height: 70px;

  border-radius: 50%;
}

.comment-container {
  margin-bottom: 70px;
}

.comment-content {
  flex: 1;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;

  padding: 5px 10px;

  border: 1px solid #ccc;
}

.comment-content div {
  margin-top: 10px;
}

.comment-content div:first-child {
  margin-top: 0px;
}

.detail-submit-container {
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
}

.detail-submit-container div:first-child {
  flex: 4;
}

.detail-submit-container div:last-child {
  flex: 1;
}
</style>
