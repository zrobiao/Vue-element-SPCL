<template>
  <div class="demo-input-size">
    <el-container>
      <el-header>
        <h3>新增视频订单</h3>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="userdata.enterName" placeholder="请输入账户名称">
              <template slot="prepend">账户名:</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="userdata.enterContact" placeholder="请输入联系人">
              <template slot="prepend">企业联系人:</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="userdata.nterTel" placeholder="请输入电话号码">
              <template slot="prepend">电话号码:</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="userdata.weixin" placeholder="请输入微信号码">
              <template slot="prepend">微信号码:</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="userdata.qq" placeholder="请输入QQ号码">
              <template slot="prepend">QQ号码:</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="userdata.opreaBz" placeholder="请输入备注">
              <template slot="prepend">测试备注:</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="userdata.needRemark" placeholder="请输入特需说明">
              <template slot="prepend">特需说明:</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="userdata.openMoney" placeholder="请输入制作费用">
              <template slot="prepend">制作费用:</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="province" class="input-with-select">
              <template slot="prepend">商户省份:</template>
              <el-select slot="append" v-model="selectProvince">
                <el-option
                  v-for="item in provinceList"
                  :key="item.areacode"
                  :label="item.areaname"
                  :value="item.areacode"
                />
              </el-select>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="city" class="input-with-select">
              <template slot="prepend">商户城市:</template>
              <el-select slot="append" v-model="selectCity">
                <el-option
                  v-for="item in cityList"
                  :key="item.areacode"
                  :label="item.areaname"
                  :value="item.areacode"
                />
              </el-select>
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <el-input v-model="repressFlag" class="input-with-select">
              <template slot="prepend">是否压标:</template>
              <el-select slot="append" v-model="selectFlag">
                <el-option label="不压标" value="1"/>
                <el-option label="压标" value="2"/>
              </el-select>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="makeFlag" class="input-with-select">
              <template slot="prepend">是否成品:</template>
              <el-select slot="append" v-model="userdata.makeFlag">
                <el-option label="非成品" value="1"/>
                <el-option label="成品" value="2"/>
              </el-select>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="openType" class="input-with-select">
              <template slot="prepend">开通类型选择:</template>
              <el-select slot="append" v-model="userdata.openType">
                <el-option label="中国移动" value="1"/>
                <el-option label="中国联通" value="2"/>
                <el-option label="中国电信" value="3"/>
              </el-select>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="userdata.changeFileId">
              <template slot="prepend">文件id:</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="userdata.setVideoId">
              <template slot="prepend">视频id:</template>
            </el-input>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-button
          v-loading.fullscreen.lock="fullscreenLoading"
          type="primary "
          @click="onSubmit()"
        >
          提交订单
          <i class="el-icon-upload2 el-icon--right"/>
        </el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { videoC } from '@/api/userData'
export default {
  data() {
    return {
      provinceList: [],
      cityList: [],
      province: '',
      city: '',
      selectProvince: '',
      selectCity: '',
      radio: '1',
      repressFlag: '',
      makeFlag: '',
      openType: '',
      selectFlag: '1',
      fullscreenLoading: false,
      userdata: {
        enterName: '',
        enterContact: '',
        enterTel: '',
        province: '',
        city: '',
        weixin: '',
        needRemark: '',
        makeFlag: 1,
        repressFlag: 1,
        openType: 1,
        openMoney: '',
        opreaBz: '',
        qq: '',
        changeFileId: '',
        setVideoId: '',
        fileInfos: [
          {
            fileName: '',
            resource: 1, // 文件来源
            fileType: '', // 文件类型
            fileUrl: ''
          }
        ]
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
      console.log(this.userdata)
      videoC(this.userdata).then(res => {
        console.log(res)
        this.tableData = res.data.data.list
        console.log(this.tableData)
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
