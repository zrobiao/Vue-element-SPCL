<template>
  <div class="demo-input-size">
    <el-container>
      <el-header>
        <h3>订单列表</h3>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input v-model="order" placeholder="请输入订单号" prefix-icon="el-icon-search"/>
          </el-col>
          <el-col :span="3">
            <el-input v-model="name" placeholder="请输入客户名称" prefix-icon="el-icon-search"/>
          </el-col>
          <el-col :span="3">
            <el-input v-model="tel" placeholder="请输入联系电话" prefix-icon="el-icon-search"/>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-search" circle @click="searchData()"/>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="createTime" label="创建日期" width="160px"/>
          <el-table-column prop="orderNo" label="订单号" width="200px"/>
          <el-table-column prop="enterName" label="集团名称" width="150px"/>
          <el-table-column prop="enterContact" label="联系人" width="100px"/>
          <el-table-column prop="orderState" label="订单状态" width="80px"/>
          <el-table-column prop="makeMoney" label="制作费(元)" width="120px"/>
          <el-table-column prop="makeMoney" label="制作费(元)" width="120px"/>
          <el-table-column prop="makeUserName" label="制作人" width="100px"/>
          <el-table-column prop="wexin" label="微信" width="100px"/>
          <el-table-column prop="repressTime" label="完成时间"/>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { videoL } from '@/api/userData'
export default {
  data() {
    return {
      order: '',
      name: '',
      tel: '',
      tableData: []
    }
  },
  created() {
    // console.log(this.$route)
    // this.userData()
    this.searchData()
  },
  methods: {
    searchData() {
      const obj = {
        currPag: 1,
        pageSize: 10,
        query: {
          orderNo: this.order,
          enterName: this.name,
          enterTel: this.tel
        }
      }
      // console.log(obj)
      videoL(obj).then(res => {
        this.tableData = res.data.data.list
      })
    },
    handleClick() {

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
}
</style>

