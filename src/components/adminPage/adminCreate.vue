<template>
	<div class="adminCreate">
		<el-form ref="form" :model="form" :rules="rules" label-width="80px" v-loading="loading">
      <el-form-item label="收藏名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="收藏链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="收藏分类" prop="cate">
        <el-input v-model="form.cate"></el-input>
      </el-form-item>
      <el-form-item label="收藏时间" prop="createTime">
        <el-date-picker 
          value-format="yyyy-MM-dd" 
          type="date" 
          placeholder="选择日期" 
          v-model="form.createTime" 
          style="width: 100%;"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>
<script>
import posts from '@/request/requests_admin.js'
import { formatDate } from '@/components/tools/formatDate/formatDate.js' //时间格式化工具
export default {
  name: 'adminCreate',
  data () {
    return {
      msg: 'hello adminCreate!',
      loading: false,
      form: {
        name: 'test' + Math.random().toFixed(2),
        link: 'test' + Math.random().toFixed(2),
        cate: 'test' + Math.random().toFixed(2),
        createTime: '',
      },
      rules: {
        name: [
          { required: false, message: '请输入收藏项名称', trigger: 'blur' },
        ],
        link: [
          { required: true, message: '请输入收藏项链接', trigger: 'blur' },
        ],
        cate: [
          { required: true, message: '请输入收藏项类别', trigger: 'blur' },
        ],
        createTime: [
          { required: true, message: '请选择收藏项时间', trigger: 'blur' },
        ],
      }
		}
  },
	methods: {
    onSubmit() {
       this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          const result = await posts.createOneFavorite(this.form)

          this.loading = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {
    this.form.createTime = formatDate(new Date(), 'yyyy-MM-dd')
  }
}
</script>
<style scoped>

</style>