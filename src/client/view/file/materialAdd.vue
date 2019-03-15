<template>
  <div class="demo-input-size">
    <el-container>
      <el-header>
        <h3>新增视频素材</h3>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="userdata.fileName" placeholder="请输入文件名称">
              <template slot="prepend">文件名称:</template>
            </el-input>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="radio3">
              <el-radio-button label="素材"/>
              <el-radio-button label="制作视频"/>
              <el-radio-button label="压标视频"/>
              <el-radio-button label="成品视频"/>
              <el-radio-button label="企业资质"/>
              <el-radio-button label="免责协议"/>
              <el-radio-button label="其它"/>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-button
          v-loading.fullscreen.lock="fullscreenLoading"
          type="primary "
          @click="onSubmit()"
        >
          提交素材
          <i class="el-icon-upload2 el-icon--right"/>
        </el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { fileS } from '@/api/userData'
export default {
  data() {
    return {
      provinceList: [],
      radio3: '素材',
      fullscreenLoading: false,
      userdata: {
        fileName: '123',
        resource: 1,
        fileType: '',
        fileUrl: ''
      }
    }
  },
  watch: {
    selectProvince(newV, oldV) {
      if (newV !== oldV) {
        console.log()
      }
    },
    selectCity(newV, oldV) {
    },
    selectFlag(newV, oldV) {
      if (newV === 1) {
        this.repressFlag = '压标'
      } else {
        this.repressFlag = '不压标'
      }
    }
  },
  methods: {
    onSubmit() {
      fileS(this.userdata).then(res => {
        console.log(res)
        // this.tableData = res.data.data.list
        // console.log(this.tableData)
      })
    }
  }
}
</script>

<style>
.el-row {
  margin-top: 50px;
  margin-bottom: 50px;
  margin: 10px auto;
}
.el-header,
.el-footer {
  /* background-color: #b3c0d1;
  color: #333; */
  text-align: center;
  line-height: 60px;
}
</style>
