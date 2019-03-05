<template>
  <div>
    <search-bar
      :show-enter="isEnter"
      :show-search="isSearch"
      :send-parent="preParent"
      :show-search-btn="isSearchBtn"
      :show-date="isDate"/>
    <div class="show-container">
      <el-row>
        <el-col :span="24" class="dia-Title">
          <el-col v-show="isShow" :span="12">
            <el-button type="success" icon="el-icon-download" @click="downloadMaterial(sendParent,'下载素材')">下载素材</el-button>
            <el-button type="primary" icon="el-icon-setting" @click="makeVideos(sendParent,'制作视频',sendData)">制作视频</el-button>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-table
            ref="parentMenu"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              prop="orderId"
              label="订单ID"/>
            <el-table-column
              prop="orderNo"
              label="视频订单号"
              width="150"/>
            <el-table-column
              prop="createTime"
              label="订单创建日期"
              width="150"/>
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
              width="150"/>
            <el-table-column
              prop="province"
              label="归属省份"
              width="80"/>
            <el-table-column
              prop="city"
              label="归属城市"
              width="80"/>
            <el-table-column
              prop="qq"
              label="联系QQ"
              width="80"/>
            <el-table-column
              prop="weixin"
              label="联系微信"
              width="80"/>
            <el-table-column
              prop="needRemark"
              label="特需说明"
              width="150"/>
            <el-table-column
              prop="agentId"
              label="所属代理商"
              width="100"/>
            <el-table-column
              prop="orderResources"
              label="订单来源"
              width="100"/>
            <el-table-column
              prop="makeUserId"
              label="视频制作人id"
              width="120"/>
            <el-table-column
              prop="orderState"
              label="订单状态"
              width="100"/>
            <el-table-column
              label="历史操作记录"
              width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="end">
      <el-col :span="9">
        <paging-tabs/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import searchBar from './search.vue'
import pagingTabs from '@/components/pagination'
import { getWaitMakeList } from '@/api/videoList'
export default {
  components: {
    pagingTabs,
    searchBar
  },
  data() {
    return {
      searchMsg: '',
      isSearch: true,
      isEnter: true,
      isShow: true,
      isDate: true,
      isSearchBtn: true,
      preParent: '',
      number: 20,
      tableData: []
    }
  },
  created() {
    this.getWaitMakeList()
  },
  methods: {
    getWaitMakeList: function() {
      getWaitMakeList().then(res => {
        const listData = res.waitMakeList
        this.tableData = listData
      })
    },
    downloadMaterial: function() {},
    makeVideos: function() {}
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
.dia-Title {
  margin-top: 0.68rem;
}
// .btn-bottom {
//   margin-left: -9.62rem;
// }
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
</style>

