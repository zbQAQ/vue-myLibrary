<template>
  <div class="main">
    
    <div class="login-box">
      <div class="box">
        <h1 class="title">登 录</h1>
        <form action="http://localhost/laravel-blog/api/login" class="login-form" method="post">
          <input type="text" class="username" name="user_name" placeholder="请输入用户名" />
          <input type="text" class="usertype" name="user_type" readonly unselectable="on" value="普通用户" />
          <input type="password" class="password" name="user_pass" placeholder="请输入密码" />

          <input type="submit" class="onsumbit" value="确认登录" />

        </form>
        <p class="example">演示账号：test ，密码：123456</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      msg: 'this is login'
    }
  },
  methods: {
    
  }
}
</script>

<style>
  @import './login.css';
</style>
