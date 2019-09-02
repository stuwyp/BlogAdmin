<template>
  <div id="edit">
    <h2>创建文章</h2>
    <h4>文章标题</h4>
    <el-input v-model="title" placeholder="请输入标题" />
    <p class="msg">限XXX个字</p>
    <div class="tag_wrap">
      <span class="tag_text">标签</span>
      <el-tag
        v-for="tag in labels"
        :key="tag"
        class="tag_margin"
        :closable="true"
        :close-trasition="true"
        type="primary"
        @close="handleClose(tag)"
      >{{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <h4>内容简介</h4>
    <el-input v-model="description" placeholder="请输入简介" />
    <p class="msg">限XXX个字</p>
    <h4>文章内容 (Markdown编辑器)</h4>
    <mavon-editor
      v-model="content"
      class="mavon-editor--box"
      :autofocus="false"
      placeholder="博客内容"
      :ishljs="true"
    />

    <el-button @click="onCreate">确定</el-button>
    <el-button @click="goBack">返回</el-button>

  </div>
</template>

<script >
import blog from '@/api/blog'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      title: '',
      description: '',
      content: '',
      atIndex: false,
      labels: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {

    onCreate() {
      blog.createBlog({
        title: this.title,
        content: this.content,
        description: this.description,
        user_id: this.user.id,
        tags: this.labels
      })
        .then(res => {
          // console.log(res)
          this.$message.success('创建成功')
          this.$router.push({ path: `/blog/${res.id}` })
        })
    },
    goBack: function() {
      this.$router.go(-1)
    },
    // element标签组件
    handleClose: function(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1)
    },
    handleInputConfirm: function() {
      const inputValue = this.inputValue
      if (inputValue) {
        if (this.labels.indexOf(this.inputValue) === -1) { this.labels.push(inputValue) } else { this.$message.warning('标签不能重复') }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput: function() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    }
  }
}

</script>

<style lang="less">
  @import "../../assets/base.less";

  #edit, #create {
    margin: 5%;
    padding-bottom: 30px;

    h2 {
      text-align: center;
    }

    .msg {
      text-align: right;
      font-size: 12px;
      color: @textLighterColor;
    }

    .tag_wrap {
      text-align: left;
      padding: 0;
    }
    p{
      margin-bottom: 0;
    }
    .tag_wrap .input-new-tag {
      width: 80px;
      height: 30px;
    }

    .tag_margin {
      margin: 3px;
    }

    .tag_text{
      font-weight: 700;
      padding-right: 10px;
    }

  }

</style>
