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
        <el-radio-group v-model="typeRadio">
          <el-radio :label="3" @change="changeRadio('catalog')">目录</el-radio>
          <el-radio :label="6" @change="changeRadio('menu')">菜单</el-radio>
          <el-radio :label="9" @change="changeRadio('button')">按钮</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="el-col-dafine">
        菜单名称：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuName" type="text" placeholder="请输入菜单名称"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="el-col-dafine">
        上级菜单：
      </el-col>
      <el-col :span="12">
        <el-input v-model="menuName" type="text" placeholder="菜单名称" readonly class="cursor-ipt"/>
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
          node-key="id"
          accordion
          @node-click="checkTree"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isCatalog&&isButton">
      <el-col :span="6" class="el-col-dafine">
        菜单URL：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuName" type="text" placeholder="请输入菜单名称"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isButton">
      <el-col :span="6" class="el-col-dafine">
        授权标识：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuName" type="text" placeholder="请输入菜单名称"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isCatalog">
      <el-col :span="6" class="el-col-dafine">
        排序号：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuName" type="text" placeholder="请输入菜单名称"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isCatalog">
      <el-col :span="6" class="el-col-dafine">
        图标：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuName" type="text" placeholder="请输入菜单名称"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="6" class="el-col-dafine">
        <el-button type="warning" @click="closeDialog">返回</el-button>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <el-button type="primary" @click="sureDialog">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    diaData: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msg: '这里显示菜单操作',
      menuName: '',
      typeRadio: 6,
      isAdd: true,
      isEdit: false,
      isRemove: false,
      isCatalog: true,
      isMenu: true,
      isButton: true,
      openTree: false,
      mergeList: [{
        id: 1,
        label: '菜单一级',
        children: [{
          id: 4,
          label: '二级1-1',
          children: [{
            id: 9,
            label: '三级1-1-1'
          }, {
            id: 10,
            label: '三级1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '菜单二级',
        children: [{
          id: 5,
          label: '二级2-1'
        }, {
          id: 6,
          label: '二级2-2'
        }]
      }, {
        id: 3,
        label: '菜单三级',
        children: [{
          id: 7,
          label: '二级3-1'
        }, {
          id: 8,
          label: '二级3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }

    }
  },
  methods: {
    changeRadio(val) {
      if (val === 'catalog') {
        this.isCatalog = true
        this.isMenu = true
        this.isButton = false
      } else if (val === 'menu') {
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
      console.log('跳转到树形菜单界面')
      this.openTree = true
    },
    checkTree(obj) {
      this.openTree = false
      this.menuName = obj.label
      console.log(obj)
    },
    closeDialog() {
      this.$emit('dialogChild')
    },
    sureDialog() {
      this.$emit('dialogChild', '确认回调')
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
.cursor-ipt{
  cursor: pointer;
  background: $gray-color;
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
