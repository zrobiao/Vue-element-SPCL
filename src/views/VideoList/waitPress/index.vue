<template>
  <div>
    <search-bar
      :show-search="isSearch"
      :show-date="isDate"
      :show-btn="isBtn"
      :send-parent="preParent"
      :pre-options="preOptions"
      :send-data="upData"
      @listenSearch="searchSubData"
      @listenBtn="btnSubmitData"/>
    <!-- <el-row>
      <el-col :span="24" class="btn">
        <el-col v-show="showBtn">
          <el-button type="danger" icon="el-icon-error" @click="orderInvalid">作废订单</el-button>
          <el-button type="warning" icon="el-icon-back" @click="orderBack">订单回退</el-button>
          <el-button type="success" icon="el-icon-upload" @click="videoUpload">上传成品视频</el-button>
          <el-button type="primary" icon="el-icon-circle-check" @click="confirmVideo">客户确认视频</el-button>
          <el-button type="primary" icon="el-icon-download" @click="downloadVideo">下载视频素材</el-button>
        </el-col>
      </el-col>
    </el-row> -->
    <div class="show-container">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55"/>
            <!-- <el-table-column
              prop="orderId"
              label="订单ID"/> -->
            <el-table-column
              prop="orderNo"
              label="订单编号"
              width="180"/>
            <el-table-column
              prop="enterName"
              label="企业名称"
              width="100"/>
            <el-table-column
              prop="enterContact"
              label="企业联系人"
              width="100"/>
            <el-table-column
              prop="enterTel"
              label="企业联系电话"
              width="120"/>
            <el-table-column
              prop="makeFlag"
              label="制作标识"
              width="80">
              <template slot-scope="scoped">
                <el-tag v-show="scoped.row.makeFlag===1">制作</el-tag>
                <el-tag v-show="scoped.row.makeFlag===2">成品</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="repressFlag"
              label="是否压标"
              width="80">
              <template slot-scope="scoped">
                <el-tag v-show="scoped.row.repressFlag===1">是</el-tag>
                <el-tag v-show="scoped.row.repressFlag===2">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="needRemark"
              label="特需说明"
              width="300"/>
            <el-table-column
              prop="orderState"
              label="订单状态">
              <template slot-scope="scope">
                <order-state :order-stus="scope.row.orderState"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="openType"
              label="开通类型"
              width="80">
              <template slot-scope="scoped">
                <el-tag v-show="scoped.row.openType===1">移动</el-tag>
                <el-tag v-show="scoped.row.openType===2">电信</el-tag>
                <el-tag v-show="scoped.row.openType===3">联通</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="openMoney"
              label="资费"
              width="80"/>
            <el-table-column
              prop="createTime"
              label="创建日期"
              width="150"/>
            <el-table-column
              prop="makeMoney"
              label="制作费"
              width="80"/>
            <el-table-column
              prop="agentId"
              label="所属代理商"
              width="150"/>
            <el-table-column
              prop="makeUserName"
              label="视频制作账户"
              width="150"/>
            <el-table-column
              label="操作"
              width="100"
              fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="detailClick(scope.row.orderId)">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <paging-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="订单详情" width="90%" top="5vh">
      <dia-log :dia-info="dialogInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import searchBar from '@/components/search'
import pagingTabs from '@/components/pagination'
import { getWaitYaBiaoList, getOrderInfo } from '@/api/videoList'
import orderState from '../../OrderManage/orderstate'
import diaLog from './dialog'
export default {
  components: {
    pagingTabs,
    searchBar,
    diaLog,
    orderState
  },
  data() {
    return {
      isSearch: true,
      isDate: true,
      isBtn: false,
      showBtn: 'true',
      preParent: '',
      upData: 0,
      preOptions: [
        {
          value: null,
          label: '全部搜索'
        }, {
          value: 'orderNo',
          label: '订单编号'
        }, {
          value: 'enterName',
          label: '企业名称'
        }, {
          value: 'enterContact',
          label: '企业联系人'
        }, {
          value: 'enterTel',
          label: '企业联系电话'
        }, {
          value: 'orderState',
          label: '订单状态',
          children: [{
            value: '4',
            label: '等待压标，制作视频 '
          },
          {
            value: '41',
            label: '等待视频压标,更换视频'
          }]
        }, {
          value: 'openType',
          label: '开通类型',
          children: [{
            value: '1',
            label: '移动'
          }, {
            value: '2',
            label: '电信'
          }, {
            value: '3',
            label: '联通'
          }]
        }], // 设置父级筛选项目
      tableData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 10,
      totalPage: 1,
      // 设置查询项目query
      query: {
        orderNo: null,
        enterName: null,
        enterContact: null,
        enterTel: null,
        orderState: null,
        openType: null,
        minTime: null,
        maxTime: null
      }
    }
  },
  created() {
    this.WaitMakeList()
  },
  methods: {
    // 子组件传输选择项目给父组件

    searchSubData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'orderNo':
          this.query.orderNo = searchMsg
          break
        case 'enterName':
          this.query.enterName = searchMsg
          break
        case 'enterContact':
          this.query.enterContact = searchMsg
          break
        case 'enterTel':
          this.query.enterTel = searchMsg
          break
        case 'orderState':
          this.query.orderState = searchMsg
          break
        case 'openType':
          this.query.openType = searchMsg
          break
        default:this.WaitMakeList()
      }
      this.WaitMakeList()
    },
    btnSubmitData() {},
    WaitMakeList() {
      const obj = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      getWaitYaBiaoList(obj).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const orderData = res.data.data
            this.currPage = orderData.currPage
            this.pageSize = orderData.pageSize
            this.totalCount = orderData.totalCount
            this.totalPage = orderData.totalPage
            this.tableData = orderData.list
            // 以下数据根据查询项进行变换绑定
            this.query.orderNo = null
            this.query.enterName = null
            this.query.enterContact = null
            this.query.enterTel = null
            this.query.openType = null
            this.query.orderState = null
            this.query.minTime = null
            this.query.maxTime = null
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    detailClick(orderId) {
      this.menuDialog = !this.menuDialog
      getOrderInfo(orderId).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const orderData = res.data.data
            this.dialogInfo = orderData
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    orderInvalid: function() {
      alert('作废订单')
    },
    orderBack: function() {},
    videoUpload: function() {},
    confirmVideo: function() {},
    downloadVideo: function() {}
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.show-container{
    margin-top:15px;
    .show-title{
      font-size: 12px;
      padding: 5px 0;
      span{
        color:#409EFF;
      }
    }
  }
  .btn {
    margin-top: 15px;
  }
</style>
