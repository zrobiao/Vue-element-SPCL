<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p class="dia-title">{{ diaData }}</p>
        <!-- <p class="dia-title">{{ diaData }}</p> -->
        <!-- <p class="dia-title">{{ diaData }}</p> -->
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
    <el-row v-show="isMenu&&isCatalog">
      <el-col :span="6" class="el-col-dafine">
        菜单名称：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuName" type="text" placeholder="请输入菜单名称"/>
      </el-col>
    </el-row>
    <el-row v-show="isMenu&&isCatalog">
      <el-col :span="6" class="el-col-dafine">
        上级菜单：
      </el-col>
      <el-col :span="16">
        <el-input v-model="menuName" type="text" placeholder="请输入菜单名称"/>
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
        <el-button type="warning">返回</el-button>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <el-button type="primary">确认</el-button>
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
      isButton: true
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
    }
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
.dia-title{
  color:#409EFF;
  padding:0 0 12px;
  text-align: center;
  font-size:16px;
  border-bottom:1px solid#409EFF;
  margin-top:-20px;
  }
  .el-col-dafine{
    text-align: right;
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    padding-right: 20px;
  }
</style>
