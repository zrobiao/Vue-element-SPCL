<template>
  <div class="enroll">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公司名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="所在城市">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="省份" value="shanghai"/>
          <el-option label="城市" value="beijing"/>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>-->
      <el-form-item label="是否押标">
        <el-switch v-model="form.delivery"/>
      </el-form-item>
      <el-form-item label="电话类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="移动" name="type"/>
          <el-checkbox label="联通" name="type"/>
          <el-checkbox label="电信" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊">
        <el-radio-group v-model="form.resource">
          <el-radio label="特1"/>
          <el-radio label="特2"/>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="活动形式">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        phone: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
