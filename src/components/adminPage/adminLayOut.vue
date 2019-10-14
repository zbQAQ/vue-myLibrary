<template>
	<div class="adminLayOut">
		<el-container style="height: 100%">
      <el-header height="80px"></el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            style="height: 100%;"
            default-active="1-1"
            :default-openeds="['1']">
            <el-submenu index="1">
              <span slot="title">收藏夹管理</span>
              <el-menu-item index="1-1" @click="clickRouter('/admin/list')">列表</el-menu-item>
              <el-menu-item index="1-2" @click="clickRouter('/admin/create')">创建</el-menu-item>
              <el-menu-item index="1-3" @click="clickRouter('/admin/update')">编辑</el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
	</div>
</template>
<script>
export default {
  name: 'adminLayOut',
  data () {
    return {
			msg: 'hello adminLayOut!'
		}
  },
	methods: {
    clickRouter(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style scoped>
.adminLayOut {
  height: calc(100vh - 30px);
}
</style>