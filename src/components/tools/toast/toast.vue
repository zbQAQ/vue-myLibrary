<template>
  <transition
    name="toast"
    mode="in-out"
    enter-active-class="animated fadeIn "
    leave-active-class="animated fadeOut "
    :duration="{ enter: 300, leave: 400 }"
  >
  <div class="toastBox" v-show="showToast" :class="position">
    <div class="toast">
      <img src="static/img/success.png" v-show="type === 'success'" alt>
      <img src="static/img/warn.png" v-show="type === 'warn'" alt>
      <span class="text">{{msg}}</span>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'toast',
  props: {
    msg: String,
    type: {
      validator: function (value) {
        // 值必须是这些字符串中的一个
        return ['success', 'warn', 'none'].indexOf(value) !== -1
      },
      default:'success'
    },
    duration: {
      type: Number,
      default: 3000
    },
    position: {
      type: String,
      default: 'middle'
    }
  },
  data() {
    return {
      showToast: false
    }
  }
}
</script>
<style scoped>
.toastBox {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
.toastBox.top {
  top: 10%;
}
.toastBox.middle {
  top: 40%;
  transform: translate(-50%, -50%)
}
.toastBox.bottom {
  top: 85%;
}
.toastBox .toast {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 8px;
  padding: 8px;
}
.toastBox .toast .text {
  margin-left: 5px;
}
</style>

