<template>
  <div class="merchantRule">
    <h3 class="title">商户资料管理
      <!-- <el-button type="primary" width="150" fixed="right">资料编辑</el-button> -->
    </h3>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-input v-model="inputUsername" placeholder="请输入登陆账户" prefix-icon="el-icon-search"/>
      </el-col>
      <el-col :span="3">
        <el-input v-model="inputNinckname" placeholder="请输入用户名称" prefix-icon="el-icon-search"/>
      </el-col>
      <el-col :span="3">
        <el-input v-model="inputMobile" placeholder="请输入手机号码" prefix-icon="el-icon-search"/>
      </el-col>
      <el-col :span="1">
        <el-button icon="el-icon-search" circle @click="agentData()"/>
      </el-col>
      <el-col :span="1">
        <el-button icon="el-icon-plus" circle @click="dialogFormVisible = true"/>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createTime" label="创建日期" width="200px"/>
      <el-table-column prop="username" label="登陆账户"/>
      <el-table-column prop="ninckname" label="用户昵称"/>
      <el-table-column prop="city" label="省份-城市"/>
      <el-table-column prop="weiXin" label="微信号"/>
      <el-table-column prop="mobile" label="联系电话"/>
      <el-table-column prop="userType" label="用户类型"/>
      <el-table-column prop="remark" label="备注"/>
      <!-- <el-table-column label="是否禁用">
        <template slot-scope="scope">
          <el-radio v-model="status" label="0">启用</el-radio>
          <el-radio v-model="status" label="1">禁用</el-radio>
        </template>
      </el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="remark" label="备注">
        <el-button type="primary" icon="el-icon-edit" circle/>
      </el-table-column>-->
    </el-table>

    <el-row type="flex" justify="end">
      <el-col :span="3">
        <pagi-tabs
          :curr-page="currPage"
          :page-size="pageSize"
          :total-count="totalCount"
          :total-page="totalPage"
          @pageChild="pageChildFn"
        />
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新增子账户">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="登陆账户" width="100px">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="登陆密码">
          <el-input v-model="form.password"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户昵称">
          <el-input v-model="form.ninckname"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮箱">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="电话号码">
          <el-input v-model="form.mobile"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="微信">
          <el-input v-model="form.weiXin"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所在区域">
          <el-select v-model="form.region" placeholder="请选择所在城市">
            <el-option
              v-for="item in provinceList"
              :key="item.areacode"
              :label="item.areaname"
              :value="item.areacode"
            />
          </el-select>
          <el-select v-model="form.region" placeholder="请选择所在省份"/>
          <el-select v-model="form.region" placeholder="请选择所在街道"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户类型">
          <el-radio-group v-model="radio2">
            <el-radio :label="1">移动</el-radio>
            <el-radio :label="2">联通</el-radio>
            <el-radio :label="3">电信</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否启用账号">
          <el-radio-group v-model="radio3">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注">
          <el-input v-model="form.remark"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="资质文件">
          <el-input v-model="form.passwo"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAgent()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserData, agentList, createInfo, areaList, userDetailed } from '@/api/userData'
import webuploader from 'webuploader'
import md5 from 'js-md5'
import pagiTabs from '@/components/pagination'
export default {
  components: {
    pagiTabs
  },
  data() {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      radio: '1',
      tableData: [],
      curData: [],
      radio2: 1,
      radio3: 1,
      currPage: 1,
      pageSize: 3,
      totalCount: 5,
      totalPage: 1,
      form: {
        username: '',
        password: '',
        type: [],
        resource: '',
        desc: '',
        status: 0,
        email: null,
        mobile: null,
        remark: null,
        userType: 3,
        ninckname: null,
        weiXin: null,
        weiXinId: null,
        address: null,
        province: null,
        city: null,
        enterpriseZhizi: null
      },
      formLabelWidth: '120px',
      webupload: null,
      provinceList: [],
      inputUsername: null,
      inputNinckname: null,
      inputMobile: null
    }
  },
  created() {
    // console.log(this.$route)
    // this.userData()
    this.agentData()
    this.getArea()
  },
  mounted() {
    // this.test()
  },
  methods: {
    initData: function() {
      this.webupload = webuploader.create(null) // 实例webuploader
    },
    // 查看方法
    handleClick(row) {
      // this.curData = row
      // console.log(row.userId)
      // this.dialogVisible = true
      // const obj = {
      //   id:
      // }
      userDetailed(row.userId).then(res => {
      })
      this.$router.push({
        path: 'merchantDetails',
        query: {
          id: row.userId
        }
      })
    },
    // 对话框关闭毁掉
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
      console.log(this.curData)
    },

    // 对话框内按钮方法
    dialogBtn(value) {
      this.curData = []
      console.log(this.curData)
      this.dialogVisible = false
    },

    // 当前登陆账户的信息
    userData() {
      // console.log(t)
      getUserData().then(res => {
        // console.log(res)
      })
    },

    // 获取账户列表
    agentData() {
      const obj = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        query: {
          username: this.inputUsername,
          ninckname: this.inputNinckname,
          mobile: this.inputMobile
        }
      }
      // console.log(obj)
      agentList(obj).then(res => {
        console.log(res)
        this.currPage = res.data.data.currPage
        this.pageSize = res.data.data.pageSize
        this.totalCount = res.data.data.totalCount
        this.totalPage = res.data.data.totalPage
        this.tableData = res.data.data.list
      })
    },

    // 添加子账户
    addAgent() {
      this.form.password = md5(this.form.password)
      const obj = this.form
      createInfo(obj).then(res => {
        // console.log(res)
        if (res.data.opreaState) {
          this.title('成功', '添加子账户成功', 'success')
        } else {
          this.title('失败', res.data.msg, 'error')
        }
      })
    },
    getArea() {
      const obj = {
        areacode: '210000'
      }
      areaList(obj).then(res => {
        this.provinceList = res.data.data
        // console.log(this.provinceList)
      })
    },
    pageChildFn(currentPage) {
      console.log(currentPage)
      this.currPage = currentPage
      this.agentData()
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
</style>
