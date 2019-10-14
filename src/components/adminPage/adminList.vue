<template>
	<div class="adminList" v-loading="loading">
		<el-table
      :data="tableData"
			stripe
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="Id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="收藏名称">
      </el-table-column>
      <el-table-column
        prop="link"
        label="收藏链接">
      </el-table-column>
      <el-table-column
        prop="cate"
        label="收藏分类">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="收藏时间">
      </el-table-column>
    </el-table>
	</div>
</template>
<script>
import posts from '@/request/requests_admin.js'
export default {
  name: 'adminList',
  data () {
    return {
			msg: 'hello adminList!',
			loading: false,
			tableData: [],
		}
  },
	methods: {},
	async created() {
		this.loading = true
    const res = await posts.getFavoriteList()
    if(res) {
      this.tableData = res.data
    }
		this.loading = false
	}
}
</script>
<style scoped>

</style>