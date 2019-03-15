<template>
  <div class="enroll">
    <el-container>
      <el-header>
        <h3 class="title">素材管理</h3>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input v-model="file" placeholder="请输入文件名称" prefix-icon="el-icon-search"/>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-search" circle @click="searchData()"/>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-plus" circle @click="add()"/>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="createTime" label="创建日期" width="160px"/>
          <el-table-column prop="fileName" label="文件名称" width="150px"/>
          <el-table-column prop="fileState" label="文件状态" width="100px"/>
          <el-table-column prop="fileType" label="文件类型" width="100px"/>
          <el-table-column prop="fileUrl" label="文件链接" width="300px"/>
          <el-table-column prop="id" label="文件id" width="300px"/>
          <el-table-column prop="userName" label="用户" width="120px"/>
          <el-table-column prop="userId" label="用户id" width="100px"/>
          <el-table-column prop="makeFileId" label="makeFileId" width="100px"/>
          <el-table-column prop="repressFileId" label="repressFileId"/>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-col :span="9">
            <pagi-tabs
              :curr-page="currPage"
              :page-size="pageSize"
              :total-count="totalCount"
              :total-page="totalPage"
              @pageChild="pageChildFn"
            />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { fileL } from '@/api/userData'
import pagiTabs from '@/components/pagination'
export default {
  components: {
    pagiTabs
  },
  data() {
    return {
      file: '',
      currPage: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1,
      tableData: []
    }
  },
  watch: {

  },
  created() {
    this.materialData()
  },
  methods: {
    materialData() {
      const obj = {
        currPag: this.currPage,
        pageSize: this.pageSize,
        query: {
          fileName: this.file
        }
      }
      console.log(obj)
      fileL(obj).then(res => {
        this.currPage = res.data.data.currPage
        this.pageSize = res.data.data.pageSize
        this.totalCount = res.data.data.totalCount
        this.totalPage = res.data.data.totalPage
        this.tableData = res.data.data.list
      })
    },
    searchData() {
      this.materialData()
    },
    pageChildFn(currentPage) {
      console.log(currentPage)
      this.currPage = currentPage
      this.materialData()
    },
    add() {
      this.$router.push('materialAdd')
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
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
