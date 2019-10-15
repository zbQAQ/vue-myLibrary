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
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <h2 class="title">{{$route.name}}页</h2>
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
.title {
  width: 100%;
  line-height: 30px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 15px;
  color: #5d5d5d;
}
</style>