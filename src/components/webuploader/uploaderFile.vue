<template>
  <div class="page">
    <el-row v-show="upType===1">
      <el-col :span="24">
        <h3>1、格式</h3>
        <p>视频格式：mpeg,vob,mp4,avi,mpg,wmv,mov,mkv；</p>
        <p>图片格式： jpg ，jpeg ，gif ，png ，bmp。</p>
        <p>分辨率：最低640*480，时长不低于30秒</p>
        <h3>2、 内容</h3>
        <p>视频及图片内容信息需真实有效，不得宣传虚假信息。内容不涉及计黄、赌、毒及违法，违规，涉政的敏感内容。内容不涉及辱骂谩骂、造谣传谣、版权侵犯、垃圾广告、邪教传播等内容。
        内容不能出现模糊、音视频不同步、扭曲、不合理裁剪或改变片源比例等情况。</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div id="filePicker">选择文件</div>
      </el-col>
    </el-row>
    <div class="file-panel">
      <h2>文件列表</h2>
      <div class="file-list">
        <ul v-for="file in fileList" :class="`file-${file.id}`" :key="file.name" class="file-item">
          <li :icon="fileCategory(file.ext)" class="file-type"/>
          <li class="file-name">{{ file.name }}</li>
          <li class="file-size">{{ fileSize(file.size) }}</li>
          <li class="file-status">上传中...</li>
          <li class="file-operate">
            <a title="开始" @click="resume(file)"><i class="iconfont icon-control-play"/></a>
            <a title="暂停" @click="stop(file)"><i class="iconfont icon-video-pause"/></a>
            <a title="移除" @click="remove(file)"><i class="iconfont icon-close-big"/></a>
          </li>
          <li class="progress"/>
        </ul>
        <div v-if="!fileList.length" class="no-file"><i class="iconfont icon-empty-file"/> 暂无待上传文件</div>
      </div>
    </div>
    <vue-upload
      ref="uploader"
      :url="upFileUrl"
      :accept="fileType"
      upload-button="#filePicker"
      multiple
      @fileChange="fileChange"
      @progress="onProgress"
      @success="onSuccess"
      @error="onError"/>
  </div>
</template>
<script>
import vueUpload from './index'
import $ from 'jquery'
import { UpVideoFileMerge } from '@/api/videoList'
// import api from '@/assets/js/api'
export default {
  components: {
    vueUpload
  },
  props: {
    upType: {
      type: Number,
      default: 0
    },
    upHintmsg: {
      type: String,
      default: '操作成功'
    }
  },
  data() {
    return {
      fileList: [],
      upFileUrl: process.env.BASE_API + '/upload/upload',
      guid: null,
      fileType: 'video'
    }
  },
  computed: {
    uploader() {
      return this.$refs.uploader
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    fileChange(file) {
      if (!file.size) return
      this.fileList.push(file)
    },
    onProgress(file, percent) {
      $(`.file-${file.id} .progress`).css('width', percent * 100 + '%')
      $(`.file-${file.id} .file-status`).html((percent * 100).toFixed(2) + '%')
    },
    onSuccess(guid, file, response) {
      const params = {
        guid: guid,
        fileName: file.name,
        uploadType: this.upType
      }
      if (this.upType === 0) {
        return this.$message.error('请设置文件上传类型！')
      }
      UpVideoFileMerge(params).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const BackData = res.data.data
            this.$confirm('文件上传成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              this.remove(file)
              this.$emit('uploadeBackFn', BackData)
            })
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onError(error) {
      this.$message.error(error)
    },
    resume(file) {
      this.uploader.upload(file)
    },
    stop(file) {
      this.uploader.stop(file)
    },
    remove(file) {
      // 取消并中断文件上传
      this.uploader.cancelFile(file)
      // 在队列中移除文件
      this.uploader.removeFile(file, true)
      // 在ui上移除
      const index = this.fileList.findIndex(ele => ele.id === file.id)
      this.fileList.splice(index, 1)
    },
    fileSize(size) {
      return this.upFile.Base.formatSize(size)
    },
    fileCategory(ext) {
      let type = ''
      const typeMap = {
        image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
        video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
        text: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
      }
      Object.keys(typeMap).forEach((_type) => {
        const extensions = typeMap[_type]
        if (extensions.indexOf(ext) > -1) {
          type = _type
        }
      })
      return type
    }
  }
}
</script>

<style lang="scss">
    $h-row: 50px;
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .infotitle{
      color:#409EFF;
      padding: 12px 0;
    }
  }
    .file-panel {
        width: 840px;
        margin-top: 10px;
        box-shadow: 0 2px 12px 1px rgba(0, 0, 0, 0.1);
        > h2 {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            border-radius: 4px 4px 0 0;
            border-bottom: 1px solid #ccc;
            background-color: #fff;
        }
        .file-list {
            position: relative;
            height: 360px;
            overflow-y: auto;
            background-color: rgb(250, 250, 250);
        }
        .file-item {
            position: relative;
            height: $h-row;
            line-height: $h-row;
            padding: 0 10px;
            border-bottom: 1px solid #ccc;
            background-color: #fff;
            z-index: 1;
            > li {
                display: inline-block;
            }
        }
        .file-type {
            width: 24px;
            height: 24px;
            vertical-align: -5px;
        }
        .file-name {
            width: 40%;
            margin-left: 10px;
        }
        .file-size {
            width: 20%;
        }
        .file-status {
            width: 20%;
        }
        .file-operate {
            width: 10%;
            > a {
                padding: 10px 5px;
                cursor: pointer;
                color: #666;
                &:hover {
                    color: #ff4081;
                }
            }
        }
        .file-type[icon=text] {
            background: url(../../assets/images/text-icon.png);
        }
        .file-type[icon=video] {
            background: url(../../assets/images/video-icon.png);
        }
        .file-type[icon=image] {
            background: url(../../assets/images/image-icon.png);
        }
        .progress {
            position: absolute;
            top: 0;
            left: 0;
            height: $h-row - 1;
            width: 0;
            background-color: #E2EDFE;
            z-index: -1;
        }
        .no-file {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
        }
    }
</style>
