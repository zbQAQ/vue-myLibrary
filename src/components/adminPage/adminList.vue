<template>
	<div class="adminList" v-loading="loading">
		<el-table
      :data="tableData"
			stripe
      size="mini"
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
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="goUpdate(scope.row._id)">编辑</el-button>
          <el-button type="text" @click="deleteOne(scope.row)">删除</el-button>
        </template>
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
	methods: {
    goUpdate(id) {
      this.$router.push({path: '/admin/update', query: {id: id}})
    },
    async fetch() {
      this.loading = true
      const res = await posts.getFavoriteList()
      if(res) {
        this.tableData = res.data
      }
      this.loading = false
    },
    deleteOne(row) {
      this.$confirm('是否确定删除该条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await posts.deleteFavoriteOne(row._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    },
  },
	created() {
    this.fetch()
	}
}
</script>
<style scoped>

</style>