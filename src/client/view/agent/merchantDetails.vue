<template>
  <div class="enroll">
    <el-container>
      <el-header>
        <h3 class="title">商户详情</h3>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="18">
            <el-tag type="success">商户编号：{{ this.$route.query.id }}</el-tag>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-edit" circle type="primary" @click="uesrEdit()"/>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-back" circle type="primary" @click="goBack()"/>
          </el-col>
          <el-col :span="2">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              :disabled="isEdit"
              type="primary "
              @click="saveData()"
            >
              编辑保存
              <i class="el-icon-upload2 el-icon--right"/>
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="danger"
              @click="resetPW()"
            >
              重置密码
              <i class="el-icon-upload2 el-icon--right"/>
            </el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="curData.createTime" :disabled="true">
              <template slot="prepend">创建时间:</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="curData.username" :disabled="true">
              <template slot="prepend">账户名:</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="userType" :disabled="true">
              <template slot="prepend">账户类型:</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="curData.ninckname" :disabled="isEdit" placeholder="请输入商户昵称">
              <template slot="prepend">商户昵称:</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="curData.mobile" :disabled="isEdit" placeholder="请输入商户电话">
              <template slot="prepend">商户电话:</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="curData.weiXin" :disabled="isEdit" placeholder="请输入商户微信">
              <template slot="prepend">商户微信:</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="curData.weiXinId" :disabled="isEdit" placeholder="请输入商户微信ID">
              <template slot="prepend">商户微信id:</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input v-model="curData.email" :disabled="isEdit" placeholder="请输入商户邮箱">
              <template slot="prepend">商户邮箱:</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="curData.remark" :disabled="isEdit" placeholder="请输入商户备注">
              <template slot="prepend">商户备注:</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="province" :disabled="isEdit" class="input-with-select">
              <template slot="prepend">商户省份:</template>
              <el-select slot="append" v-model="selectProvince" :disabled="isEdit">
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
            <el-input v-model="city" :disabled="isEdit" class="input-with-select">
              <template slot="prepend">商户城市:</template>
              <el-select slot="append" v-model="selectCity" :disabled="isEdit">
                <el-option
                  v-for="item in cityList"
                  :key="item.areacode"
                  :label="item.areaname"
                  :value="item.areacode"
                />
              </el-select>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="curData.address" :disabled="isEdit" placeholder="请输入商户地址">
              <template slot="prepend">商户地址:</template>
            </el-input>
          </el-col>
        </el-row>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import { userDetailed, areaList, modifyInfo, restPass } from '@/api/userData'
import md5 from 'js-md5'
export default {
  data() {
    return {
      isEdit: true,
      curData: [],
      userType: '',
      selectProvince: '',
      selectCity: '',
      provinceList: [],
      cityList: [],
      province: '',
      city: '',
      fullscreenLoading: false
    }
  },
  watch: {
    selectProvince(newV, oldV) {
      if (newV !== oldV) {
        this.setProvinceCH(newV)
        this.getArea(newV, 2)
        this.cityList = []
        this.city = '请选择城市'
      }
    },
    selectCity(newV, oldV) {
      this.setCityCH(newV)
    }
  },
  created() {
    // console.log(this.$route.query.id)
    this.uesrData(this.$route.query.id)
    this.getArea(null, 1)
  },
  methods: {
    uesrData(id) {
      userDetailed(id).then(res => {
        // console.log(res)
        this.curData = res.data.data
        this.setUserType(this.curData.userType)
        this.getArea(this.curData.province, 2)
        this.setProvinceCH(this.curData.province)
      })
    },
    uesrEdit() {
      this.isEdit = false
    },
    goBack() {
      this.$router.push('merchantRule')
    },
    setUserType(_type) {
      // 设置用户类型
      switch (_type) {
        case 1:
          this.userType = '中国移动'
          break
        case 2:
          this.userType = '中国联通'
          break
        case 3:
          this.userType = '中国电信'
          break
        default:
          break
      }
    },
    getArea(_code, _type) {
      // _type=1:设置省份数组  _type=1:设置城市数组
      const obj = {
        areacode: _code
      }
      areaList(obj).then(res => {
        switch (_type) {
          case 1:
            this.provinceList = res.data.data
            // console.log('设置省份列表')
            break
          case 2:
            this.cityList = res.data.data
            console.log(res)
            this.setCityCH(this.curData.city)
            break
          default:
            break
        }
      })
    },
    setProvinceCH(_code) {
      // console.log('获取省份编码中文' + _code)
      for (let index = 0; index < this.provinceList.length; index++) {
        if (_code === this.provinceList[index].areacode) {
          this.province = this.provinceList[index].areaname
        }
      }
    },
    setCityCH(_code) {
      // console.log('获取市区编码中文' + _code)
      for (let index = 0; index < this.cityList.length; index++) {
        if (_code === this.cityList[index].areacode) {
          this.city = this.cityList[index].areaname
        }
      }
    },
    saveData() {
      this.fullscreenLoading = true
      const obj = this.curData
      modifyInfo(obj).then(res => {
        console.log(res)
        this.fullscreenLoading = false
        this.isEdit = true
        this.title('成功', '账户信息更新成功', 'success')
      })
    },
    resetPW() {
      // 重置密码
      const obj = {
        password: md5('123123')
        // id: this.$route.query.id
      }
      restPass(this.$route.query.id, obj).then(res => {
        console.log(res)
      })
    },
    title(_title, _message, _type) {
      if (_type === 'success') {
        this.$notify({
          title: _title,
          message: _message,
          type: _type
        })
      } else {
        this.$notify.error({
          title: _title,
          message: _message
        })
      }
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
