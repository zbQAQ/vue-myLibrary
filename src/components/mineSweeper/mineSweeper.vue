<template>
  <div class="main" >
    <div class="gameBox" :style="gamesBoxStyle" v-show="isStart">
      <div class="sweeper" :class="{eventNone: gameIsEnd}">
        <div class="row" v-for="(row, rowIndex) of mapArr" :key="rowIndex">
          <div class="mineItem" v-for="(col, colIndex) of row" :key="colIndex" 
            :class="{clickActive: col.isClick, showBoom: col.isBoomShow, boom: (col.isBoom&&isHacker)}"
            @click.left="leftClick(col.lng[0], col.lng[1])"
            @click.right.prevent="rightClick(col.lng[0], col.lng[1])"
          >
            <img v-show="col.isBoomShow&&col.isBoom" src="static/img/boom.png" alt="">
            <img v-show="col.isSign && !col.isClick" src="static/img/flag.png" alt="">
            <p v-show="col.isClick">{{col.val}}</p>
          </div>
        </div>

      </div>
      <div class="gameInfo">
        <p class="time">{{timeStr}}</p>
      </div>
      <div class="gameControl" v-show="isStart">
        <button class="reset" @click="reset">重新设置</button>
        <button class="reStart" @click="reStart">重新开始</button>
        <button class="hacker" @click="hacker">透视模式</button>
      </div>
    </div>
    
    <div class="noneSetting" v-show="!isStart">
      <h2>请先进行游戏设置</h2>
      <p>行数：
        <input type="number" :max="inputRange.rowRange.max" :min="inputRange.rowRange.min" id="rowInput" placeholder="输入游戏格局的行数" v-model="row">
        <span class="inputTip">最大28, 最小10</span>
      </p>
      <p>列数：
        <input type="number" :max="inputRange.colRange.max" :min="inputRange.colRange.min" id="colInput" placeholder="输入游戏格局的列数" v-model="col">
        <span class="inputTip">最大50, 最小10</span>
      </p>
      <p>难度：
        <input type="number" :max="inputRange.diffRange.max" :min="inputRange.diffRange.min" id="diffInput" placeholder="输入游戏难度" v-model="difficulty">
        <span class="inputTip">最大10, 最小1&nbsp;&nbsp;</span>
      </p>
      <p><button type="button" @click="mapInit">开始游戏</button></p>
    </div>

  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'mineSweeper',
  data(){
    return {
      msg: 'this is mineSweeper',
      mapArr: [],
      row: 10,
      col: 10,
      mineStep: 0,
      difficulty: 1,
      itemStyle: 25, //单个mineItem的宽高 是正方形
      gamesBoxStyle: {},
      gameIsEnd: false,
      inputRange: {
        rowRange: {max: 28, min: 10},
        colRange: {max: 50, min: 10},
        diffRange: {max: 10, min: 1},
      },
      isStart: false,
      timeStr: '00:00:00',
      timer: null,
      isHacker: false
    }
  },
  created () {},
  methods: {
    timerStep(flag) {
      let h, m, s, str
      h = m = s = 0
      if(flag) {
        this.timer = setInterval( _ => {
          if(s >= 0) {
            s = s + 1
          }
          if(s >= 60) {
            m = m + 1
            s = 0
          }
          if(m >= 60) {
            h = h + 1
            m = 0
          }
          str = this.fillup(h) + ':' + this.fillup(m) + ':' + this.fillup(s)
          this.timeStr = str
        }, 1000)
      }else {
        window.clearInterval(this.timer)
      }
    },
    fillup(n) {
      if(n < 10) {
        return "0" + n
      }else {
        return n
      }
    },
    mapInit() {
      // debugger
      let inputRange = this.inputRange
      let rowRange = inputRange.rowRange
      let colRange = inputRange.colRange
      let diffRange = inputRange.diffRange

      let row = this.row //行数
      let col = this.col //列数
      this.mineStep = row * col // mineItem总数
      let difficulty = this.difficulty //难度 越大约难
      difficulty = difficulty > 3 ? 3 : difficulty
      let mapArr = this.mapArr

      let tipsStr = ''
      if(row > rowRange.max || row < rowRange.min) {
        tipsStr = '行数'
      }else if(col > colRange.max || col < colRange.min) {
        tipsStr = '列数'
      }else if(difficulty > diffRange.max || difficulty < diffRange.min) {
        tipsStr = '难度'
      }else {
        tipsStr = null
      }
      if(tipsStr === null) {
        this.gamesBoxStyle = { //初始化样式
          width: col * this.itemStyle + 'px',
          height: row * this.itemStyle  + 'px',
          marginTop: ((row * this.itemStyle)/2) * -1  + 'px',
          marginLeft: ((col * this.itemStyle)/2) * -1  + 'px',
        }
        let id = 1
        for(let i = 0; i < row; i++) {
          mapArr.push([])
          for(let j = 0; j < col; j++) {
            let mines = {
              id: id++,
              lng: [i, j], // [y, x]
              isBoom: ((Math.random()*10) < difficulty),
              isBoomShow: false,
              isSign: false,
              isClick: false,
            }
            mapArr[i].push(mines)
          } 
        }
        this.initMine(this.mapArr)
        setTimeout(_ => {
          this.isStart = true
        }, 0)
      }else {
        this.$toast({msg: tipsStr + '不能超过指定范围', type: 'warn', duration: 2000, position: 'bottom'})
        return;
      }
    },
    initMine(map) { //初始化雷区 主要用来计算 周围方块的雷数
      let mapLen = map.length
      for(let r = 0; r < mapLen; r++) {
        for(let c = 0; c < map[r].length; c++) {
          let curItem = map[r][c]
          // debugger
          if(!curItem.isBoom) { //如果不是雷 就计算周围雷区
            let posArr = [
              [r-1, c-1],[r-1, c],[r-1, c+1],[r, c-1],[r, c+1],[r+1, c-1],[r+1, c],[r+1, c+1]
            ]
            let minesNum = 0
            for(let i = 0; i < posArr.length; i++) {
              let _row = posArr[i][0]
              let _col = posArr[i][1]
              
              if( _row >= 0 && _col >= 0 && _row <= this.row-1 && _col <= this.col-1) {
                //计算获取的坐标 在地图区间内
                let curMines = map[_row][_col]
                // console.log('当前是第' + r + '行 第' + c + '个', curItem, curMines)
                if(curMines&&curMines.isBoom) {
                  minesNum++
                }
              }
            }
            curItem.val = minesNum ? minesNum : ''
          }
        }
      }
      this.timerStep(true)
    },
    leftClick(r, c) {
      if(r < 0 || c < 0 || r > this.row-1 || c > this.col-1) {
        return //选中的坐标必须在游戏盘内 否则返回
      }
      let curItem = this.mapArr[r][c]
      if(curItem.isClick || curItem.isSign) {
        return //已经被点击过了或者被标记了
      }
      if(curItem.isBoom) {
        curItem.isBoomShow
        return this.failGame()
      }
      curItem.isClick = true
      this.mineStep--
      if(curItem.val){
        return //如果该格子有数字返回，没有就向四周扩展
      }else {
        this.leftClick(r-1, c)
        this.leftClick(r+1, c)
        this.leftClick(r, c-1)
        this.leftClick(r, c+1)
      }
      // console.log('leftClick', curItem)
    },
    rightClick(r, c) {
      let curItem = this.mapArr[r][c]
      if(curItem.isClick) {
        return
      }
      curItem.isSign = !curItem.isSign
      curItem.isSign === false ? this.mineStep++ : this.mineStep--
      console.log('rightClick', this.mineStep)
    },
    failGame() {
      let map = this.mapArr
      let mapLen = map.length
      let flag = false
      for(let r = 0; r < mapLen; r++) {
        for(let c = 0; c < map[r].length; c++) {
          let curItem = map[r][c]
          if(curItem.isBoom) {
            curItem.isClick = true
            curItem.isBoomShow = true
          }
        }
      }
      this.gameIsEnd = true
      this.timerStep(false)
      alert('你输了！')
    },
    passGame() {
      //加入计时器是为了 先显示旗帜标记 再弹框
      setTimeout(_ => {
        this.gameIsEnd = true
        alert('恭喜你通关了！')
      }, 0)
    },
    watchEndGame() {
      let row = this.row
      let col = this.col
      let map = this.mapArr
      let mapLen = map.length
      let flag = false
      for(let r = 0; r < mapLen; r++) {
        for(let c = 0; c < map[r].length; c++) {
          let curItem = map[r][c]
          if((curItem.isBoom && curItem.isSign) || !curItem.isBoom) {
            flag = true
          }
        }
      }
      if(flag) {
        this.passGame()
      }else {
        this.failGame()
      }
      this.timerStep(false)
    },
    reset() {
      // this.$router.push({path: '/mineSweeper'})
      this.$router.go(0)
    },
    reStart() {
      this.timerStep(false)
      this.timeStr = '00:00:00'
      this.mapArr = []
      this.mapInit()
      this.gameIsEnd = false
    },
    hacker() {
      this.isHacker = !this.isHacker
    }
  },
  computed: {
  },
  watch: {
    mineStep(n, o) {
      if(n <= 0) {
        this.watchEndGame()
      }
    }
  }
} 
</script>

<style scoped>
@import "./mineSweeper.css";
</style>
