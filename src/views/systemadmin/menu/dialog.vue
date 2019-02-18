<template>
  <div>
    <el-row>
      <el-col :span="24" class="dia-Title">
        <p v-if="diaData == '新增'" class="dia-title-add">{{ diaData }}</p>
        <p v-if="diaData == '修改'" class="dia-title-edit">{{ diaData }}</p>
        <p v-if="diaData == '删除'" class="dia-title-remove">{{ diaData }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="el-col-dafine">
        菜单类型：
      </el-col>
      <el-col :span="16">
        <el-radio-group v-model="menuInfo.type">
          <el-radio :label="0" @change="changeRadio('catalog')">目录</el-radio>
          <el-radio :label="1" @change="changeRadio('menu')">菜单</el-radio>
          <el-radio :label="2" @change="changeRadio('button')">按钮</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="el-col-dafine">
        菜单名称：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuInfo.name" type="text" placeholder="请输入菜单名称"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="el-col-dafine">
        上级菜单：
      </el-col>
      <el-col :span="12">
        <el-input v-model="pareMenuName" :disabled="true" type="text" placeholder="选择上级菜单"/>
      </el-col>
      <el-col :span="4" class="el-col-dafine">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="openMenu"/>
      </el-col>
    </el-row>
    <el-row v-show="openTree">
      <el-col :span="24">
        <el-tree
          :data="mergeList"
          :props="defaultProps"
          node-key="menuId"
          accordion
          @node-click="checkTree"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isCatalog&&isButton">
      <el-col :span="6" class="el-col-dafine">
        菜单URL：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuInfo.url" type="text" placeholder="请输入菜单url"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isButton">
      <el-col :span="6" class="el-col-dafine">
        授权标识：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuInfo.perms" type="text" placeholder="多个逗号分隔，例如perssion:menu:list,perssion:menu:info"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isCatalog">
      <el-col :span="6" class="el-col-dafine">
        排序号：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuInfo.orderNum" type="text" placeholder="请输入菜单排序号"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isCatalog">
      <el-col :span="6" class="el-col-dafine">
        图标：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuInfo.icon" type="text" placeholder="请输入icon名称，例如：fa fa-address-book"/>
        <a href="http://www.fontawesome.com.cn/faicons/" target="_blank">点击获取图标，例：fa fa-address-book</a>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="6" class="el-col-dafine">
        <el-button type="warning" @click="closeDialog">返回</el-button>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <el-button type="primary" @click="sureDialog()">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getSelectList } from '@/api/sysadmin'
export default {
  props: {
    diaData: {
      type: String,
      default: ''
    },
    menuInfo: {
      type: Object,
      default: () => {
        return { type: 0, parentId: -1 }
      }
    }
  },
  data() {
    return {
      msg: '这里显示菜单操作',
      isAdd: true,
      isEdit: false,
      isRemove: false,
      isCatalog: true,
      isMenu: true,
      isButton: true,
      openTree: false,
      pareMenuName: this.menuInfo.parentName == null ? '一级菜单' : this.menuInfo.parentName,
      mergeList: [],
      defaultProps: {
        children: 'list',
        label: 'name'
      }

    }
  },
  created() {
    console.log(this.menuInfo.parentId)
  },
  methods: {
    changeRadio(type) {
      if (type === 'catalog') {
        this.isCatalog = true
        this.isMenu = true
        this.isButton = false
      } else if (type === 'menu') {
        this.isCatalog = true
        this.isMenu = true
        this.isButton = true
      } else {
        this.isCatalog = false
        this.isMenu = true
        this.isButton = true
      }
    },
    openMenu() {
      getSelectList().then(res => {
        this.mergeList = res.menuList
        console.log(this.mergeList)
      })
      this.openTree = true
    },
    checkTree(obj) {
      this.openTree = false
      this.menuInfo.parentId = obj.parentId
      this.pareMenuName = obj.name
    },
    closeDialog() {
      this.openTree = false
      this.$emit('dialogChild')
    },
    sureDialog() {
      this.openTree = false
      if (this.diaData === '新增') {
        this.$emit('dialogChild', 0, this.menuInfo)
      } else if (this.diaData === '修改') {
        this.$emit('dialogChild', 1, this.menuInfo)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$primary-color:#409EFF;
$warning-color:#E6A23C;
$danger-color:#F56C6C;
$gray-color:#909399;

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.dia-Title{
  p{
    padding:0 0 12px;
  text-align: center;
  font-size:16px;
  margin-top:-20px;
  }
  .dia-title-add{
  color:$primary-color;
  border-bottom:1px solid $primary-color;
  }
  .dia-title-edit{
  color:$warning-color;
  border-bottom:1px solid $warning-color;
  }
  .dia-title-remove{
  color:$danger-color;
  border-bottom:1px solid $danger-color;
  }
  }
  .el-col-dafine{
    text-align: right;
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    padding-right: 20px;
  }
</style>
