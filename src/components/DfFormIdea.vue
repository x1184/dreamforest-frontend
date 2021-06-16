<template>
  <div>
    <div class="form-idea-container">
      <div>
        <div>想法标题</div>
        <van-field
          autosize
          show-word-limit
          v-model="form.title"
          rows="3"
          name="ideaTitle"
          type="textarea"
          maxlength="50"
          placeholder="一句话概括你的目标或创意"
        />
      </div>

      <div>
        <div>想法内容</div>
        <van-field
          autosize
          show-word-limit
          v-model="form.content"
          rows="6"
          name="ideaContent"
          type="textarea"
          maxlength="500"
          placeholder="然后详细介绍一下吧"
        />
      </div>

      <div>
        <div class="tag-title">
          <span>标签</span>
          <span>
            <van-icon
              name="add-o"
              :size="25"
              @click="handleShowAddTags"
            />
          </span>
        </div>

        <div>
          <van-tag
            round
            type="primary"
            v-for="tag of selectedTags"
            :key="tag.id"
          >
            <span class="tag-item">
              {{ tag.title }}
            </span>
          </van-tag>
        </div>
      </div>

      <div>
        <div>私密</div>
        <div
          class="form-private"
          @click="showPicker = true"
        >
          无私密性
        </div>
      </div>

      <div>
        <div>实现计划</div>
        <div class="form-plan">
          <div>此想法预计/已经在</div>
          <div>
            <span class="plan-age">{{ form.plan[0] }}</span>
            <span>至</span>
            <span class="plan-age">{{ form.plan[1] }}</span>
            <span>实现</span>
          </div>
          <van-slider
            class="form-plan-slider"
            range
            v-model="form.plan"
            :min="1"
            :max="99"
            :step="0.5"
            :bar-height="20"
            @change="handleSliderChange"
          />
        </div>
      </div>
    </div>

    <van-popup
      round
      lock-scroll
      close-on-popstate
      safe-area-inset-bottom
      position="bottom"
      :style="{ height: '50%' }"
      v-model:show="showAddTags"
    >
      <div class="tags-select-container">
        <div>
          <van-button @click="handleClickComplete">
            选好了
          </van-button>
        </div>

        <div class="tags-container">
          <van-checkbox-group v-model="checked">
            <van-cell-group>
              <van-cell
                v-for="(tag, index) of allTags"
                clickable
                :key="tag.id"
                :title="tag.title"
                @click="handleTagToggle(index)"
              >
                <template #right-icon>
                  <van-checkbox
                    :name="tag.id"
                    :ref="el => checkboxRefs[index] = el"
                    @click.stop
                  />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>

    <van-popup
      round
      position="bottom"
      v-model:show="showPicker"
    >
      <van-picker
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="handleConfirmPicker"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'

import { ITagProps } from '../interface'

export default defineComponent({
  name: 'df-form-idea',

  setup () {
    const columns = [
      // 第一列
      {
        values: [{
          text: '匿名发布',
          value: 1
        }, {
          text: '内容私密发布',
          value: 2
        }],
        defaultIndex: 0
      },
      // 第二列
      {
        values: [{
          text: '3天',
          value: 3
        }, {
          text: '一周',
          value: 7
        }, {
          text: '一月',
          value: 30
        }, {
          text: '半年',
          value: 180
        }],
        defaultIndex: 0
      }
    ]

    const store = useStore()

    const allTags = computed<ITagProps[]>(() => store.state.tags.data)

    const showAddTags = ref(false)
    const showPicker = ref(false)
    const checked = ref<string[]>([])
    const checkboxRefs = ref<Element[]>([])
    const selectedTags = ref<ITagProps[]>([])
    const form = reactive({
      title: '',
      content: '',
      private: {
        type: '',
        time: ''
      },
      plan: [1, 99],
      tags: []
    })

    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })

    // 显示弹窗
    const handleShowAddTags = () => {
      showAddTags.value = true
    }
    // 隐藏弹窗
    const handleHideAddTags = () => {
      showAddTags.value = false
    }
    // 点击选好了
    const handleClickComplete = () => {
      selectedTags.value = []

      for (const tag of allTags.value) {
        for (const id of checked.value) {
          if (tag.id === id) {
            selectedTags.value.push(tag)
          }
        }
      }

      form.tags = selectedTags as any

      handleHideAddTags()
    }
    // 更改标签的选择
    const handleTagToggle = (index: number) => {
      checkboxRefs.value[index].toggle()
    }
    const handleConfirmPicker = (value: any) => {
      form.private.type = value[0].value
      form.private.time = value[1].value

      showPicker.value = false
    }
    const handleSliderChange = (value: any) => {
      console.log(value)
    }

    return {
      form,
      allTags,
      checked,
      columns,
      selectedTags,
      showAddTags,
      showPicker,
      checkboxRefs,

      handleClickComplete,
      handleTagToggle,
      handleShowAddTags,
      handleConfirmPicker,
      handleSliderChange
    }
  }
})
</script>

<style>
.form-idea-container {
  margin: 20px;

  font-size: 18px;
}

.form-idea-container > div {
  margin-top: 50px;
}

.form-idea-container > div:first-child {
  margin-top: 0;
}

.form-idea-container .tag-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-idea-container .van-tag {
  margin: 3px 5px;
}

.tag-item {
  padding: 3px 5px;
}

.form-private {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  padding: 10px 20px;

  color: rgba(12, 12, 12, 0.6);

  border: 1px solid black;
  border-radius: 3px;
  background-color: #ccc;
}

.form-plan {
  margin-top: 20px;

  font-size: 14px;
  color: rgba(56, 54, 54, 0.6);
}

.form-plan-slider {
  margin-top: 40px;
}

.plan-age {
  padding: 0 20px;

  border-bottom: 1px solid #ccc;
}
</style>
