<template>
  <div class="main-content">
    <search-bar
      :show-search="isSearch"
      :show-date="isDate"
      :show-btn="isBtn"
      :send-parent="preParent"
      :pre-options="preOptions"
      :send-data="upData"
      @listenSearch="searchSubData"
      @listenBtn="btnSubmitData"/>
    <div class="show-container">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="orderNo"
              label="订单号"/>
            <el-table-column
              prop="enterName"
              label="企业名称"/>
            <el-table-column
              prop="opreaResource"
              label="视频类型">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.opreaResource ===1" type="primary" disable-transitions>素材</el-tag>
                <el-tag v-show="scope.row.opreaResource ===2" type="primary" disable-transitions>制作视频</el-tag>
                <el-tag v-show="scope.row.opreaResource ===3" type="primary" disable-transitions>压标视频</el-tag>
                <el-tag v-show="scope.row.opreaResource ===4" type="primary" disable-transitions>成品视频</el-tag>
                <el-tag v-show="scope.row.opreaResource ===5" type="primary" disable-transitions>企业资质</el-tag>
                <el-tag v-show="scope.row.opreaResource ===6" type="primary" disable-transitions>免责协议</el-tag>
                <el-tag v-show="scope.row.opreaResource ===7" type="primary" disable-transitions>其它</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="repressTime"
              label="压标时间"/>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="playVideo(scope.row.fileId)">播放</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="end">
      <el-col :span="9">
        <paging-tabs :page-size="pageSize" :curr-page="currPage" :total-page="totalPage" :total-count="totalCount"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import searchBar from '@/components/search'
import pagingTabs from '@/components/pagination'
import {
  getFinishPressVideoList
  // getFinishVideoListInfo
} from '@/api/videoList'
export default {
  components: {
    searchBar,
    pagingTabs
  },
  data() {
    return {
      isSearch: true,
      isDate: true,
      isBtn: false,
      preParent: '',
      upData: 0,
      preOptions: [{
        value: null,
        label: '全部搜索'
      }, {
        value: 'orderNo',
        label: '订单编号'
      }, {
        value: 'enterName',
        label: '企业名称'
      }, {
        value: 'fileName',
        label: '文件名称'
      }], // 设置父级筛选项目
      tableData: [],
      pageSize: 10,
      currPage: 1,
      totalPage: 0,
      totalCount: 0,
      // 设置查询项目query
      query: {
        orderNo: null,
        enterName: null,
        fileName: null,
        startDate: null,
        endDate: null
      }
    }
  },
  computed: {

  },
  created() {
    this.finishYaBiaoList()
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
        case 'fileName':
          this.query.fileName = searchMsg
          break
        default:this.finishYaBiaoList()
      }
      this.finishYaBiaoList()
    },
    btnSubmitData() {},
    finishYaBiaoList() {
      const obj = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      getFinishPressVideoList(obj).then(res => {
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
    playVideo(fileId) {
      // getFinishVideoListInfo(fileId).then(res => {
      console.log('开始播放视频')
      // console.log(res)
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-content{
  margin:10px;
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
}
</style>
