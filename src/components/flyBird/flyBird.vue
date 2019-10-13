<template>
  <div class="flyBirdMain" ref="main">
    <!-- <h1>{{msg}}</h1> -->
    
    <!-- <div class="block"  :style="{left: left + 'px'}"></div> -->


    <div class="gamebox" ref="gamebox" :style="{width: gameBoxW + 'px', height: gameBoxH + 'px'}" @click="wantFly">

      <div class="gameBg">

        <!-- <div class="cloud"></div> -->
        <!-- <div class="cloud"></div> -->
        <!-- <div class="cloud"></div> -->
        <!-- 云朵镜像 -->
        <!-- <div class="cloud"></div> -->
        <!-- <div class="cloud"></div> -->
        <!-- <div class="cloud"></div> -->

        <!-- <div class="ground"></div> -->


      </div>

      <div class="gameStart" v-show="!gameStart" @click="start">

        <h1>点 击 屏 幕 开 始 游 戏</h1>

      </div>

      <div class="myBird" ref="myBird" :style="{top: bird.y + 'px', animationDuration: bird.flyAnimation + 's'}"></div>
      
      <!-- <div class="pipeGrounp">
        <div class="pipe pipeU"></div>
        <div class="pipe pipeD"></div>
      </div> -->


      <div class="ground"></div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'flyBird',
  data() {
    return {
      msg: 'this is flyBird',
      gameStart: false,
      gameBoxW: 450,
      gameBoxH: 750,
      gameOver: false,
      bird: {
        y: 200,
        speedY: 0.64,
        flyAnimation: 0
      },
      pipe: {
        x: 450,
        speed: -6
      },
      mainTimer: null, //主要控制 bird的 飞起落下动画
      pipeTimer: null //控制 管子的移动 

    }
  },
  methods: {
    gameInit() {
      let that = this
      let myBird = that.$refs['myBird']
      that.bird.flyAnimation = 0.4
      // debugger
      this.mainTimer = setInterval(_ => {
        if(!that.gameOver) {

          that.bird.y += that.bird.speedY
          that.bird.speedY += 0.4
          if(that.bird.speedY > 12) {
            that.bird.speedY = 12
          }
          if(that.bird.y >= 592 || that.bird.y < 0) {
            that.gameOver = true
          }


        }
      }, 1000/60)
    },
    wantFly() {
      // console.log('wantFly')
      this.bird.speedY = -6
    },
    createPipeDom() {
      let pipeGrounp = document.createElement('div')
      let pipeU = document.createElement('div')
      let pipeD = document.createElement('div')
      pipeGrounp.className = 'pipeGrounp'
      pipeU.className = 'pipe pipeU'
      pipeD.className = 'pipe pipeD'

      let randomH = parseInt((Math.random() * 301) + 50)

      // 301 + 50 是两个管子相加的总高度 不能超过也不能少
      // 50是管子的最小高度
      // console.log(randomH, 'randomH')

      pipeU.style.height = randomH + 'px'
      pipeD.style.height = (451 - randomH)  + 'px'

      pipeGrounp.appendChild(pipeU)
      pipeGrounp.appendChild(pipeD)

      return pipeGrounp
    },
    pipeMove(pipeGrounp) {
      let that = this
      let myBirdDom = this.$refs['myBird']
      this.pipeTimer = setInterval(_ => {
        that.pipe.x += that.pipe.speed
        pipeGrounp.style.left =  that.pipe.x + 'px'

        let pipeUpDom = pipeGrounp.children[0]
        let pipeDownDom = pipeGrounp.children[1]

        let isCollisionUp = that.collisionMonitoring(myBirdDom, pipeUpDom)
        let isCollisionDown = that.collisionMonitoring(myBirdDom, pipeDownDom)


        
        // console.log(isCollisionUp, isCollisionDown)
        if(isCollisionUp || isCollisionDown) {
          that.gameOver = true
        }

          // that.collisionMonitoring(pipeGrounp)
        // console.log(pipeGrounp, this.$refs['myBird'])
        // 碰撞检测 两个div是否相交

        //碰撞检测有个小问题就是 管道口和管道的身体大小不一致 暂时先用 管道的身体为准


      }, 1000/60)
    },
    initPipe() {
      this.$nextTick(_ => {
        let pipeGrounpDom = this.createPipeDom()
        this.$refs.pipeGrounp = pipeGrounpDom
        this.$refs['gamebox'].appendChild(pipeGrounpDom)
        this.pipeMove(pipeGrounpDom)
      })
    },
    collisionMonitoring(div1, div2) {
      
      var div1Left = div1.offsetLeft
      var div1Right = div1Left + div1.offsetWidth
      var div1Top = div1.offsetTop
      var div1Bottom = div1Top + div1.offsetHeight

      var div2Left = div2.parentNode.offsetLeft //特殊处理 管道获取父节点的left
      var div2Right = div2Left + div2.offsetWidth
      var div2Top = div2.offsetTop
      var div2Bottom = div2Top + div2.offsetHeight
       if (div2Right < div1Left || div1Right < div2Left || div2Bottom < div1Top || div1Bottom < div2Top) {
          return false
        } else {
          return true
        }
    },
    start() {
      this.$nextTick(_ => {
        this.gameStart = true
        this.gameOver = false
        this.gameInit()
        this.initPipe()
      })
    },
    gameover() {
      alert('you lose')

      clearInterval(this.mainTimer)
      clearInterval(this.pipeTimer)
      this.gameStart = false
      //游戏结束 bird回到初始状态
      this.bird = {
        y: 200,
        speedY: 0.64,
        flyAnimation: 0
      }
      this.pipe = {
        x: 450,
        speed: -6
      }
      //清空柱子
      this.$refs['gamebox'].removeChild(this.$refs['pipeGrounp'])

    }
  },
  mounted() {},
  watch: {
    'pipe.x': {
      handler(val, oldVal)  {
        if(val <= -80) {

          clearInterval(this.pipeTimer)
          this.pipeTimer = null
          this.pipe.x = 450

          this.$refs['gamebox'].removeChild(this.$refs['pipeGrounp'])
          let pipeGrounpDom = this.createPipeDom()
          this.$refs.pipeGrounp = pipeGrounpDom
          this.$refs['gamebox'].appendChild(pipeGrounpDom)
          this.pipeMove(pipeGrounpDom)

        }
      }
    },
    gameOver: {
      handler(val, oldVal) {
        if(val) {
          this.gameover()
          //游戏结束  点重新开始 初始化pipe 初始化mybird 
        }
      }
    }
  }
}
</script>

<style>
@import './flyBird.css';
</style>
