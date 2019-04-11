<template>
  <div class="main" >
    
    <div class="gameBox" :style="gamesBoxStyle" v-show="isStart">
      <div class="sweeper" >
        <div class="row" v-for="(row, rowIndex) of mapArr" :key="rowIndex">
          <div class="mineItem" v-for="(col, colIndex) of row" :key="colIndex" >
            <p v-show="col.isBoom">1</p>
          </div>
        </div>

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
        <span class="inputTip">最大60, 最小10</span>
      </p>
      <p>难度：
        <input type="number" :max="inputRange.diffRange.max" :min="inputRange.diffRange.min" id="diffInput" placeholder="输入游戏难度" v-model="difficulty">
        <span class="inputTip" style="margin-right: 9px;">最大10, 最小1 </span>
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
      difficulty: 1,
      itemStyle: 25, //单个mineItem的宽高 是正方形
      gamesBoxStyle: {},
      inputRange: {
        rowRange: {max: 28, min: 10},
        colRange: {max: 60, min: 10},
        diffRange: {max: 10, min: 1},
      },
      isStart: false
    }
  },
  created () {},
  methods: {
    mapInit() {
      // debugger
      let inputRange = this.inputRange
      let rowRange = inputRange.rowRange
      let colRange = inputRange.colRange
      let diffRange = inputRange.diffRange


      let row = this.row //行数
      let col = this.col //列数
      let minesTotal = row * col // mineItem总数
      let difficulty = this.difficulty //难度 越大约难
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
        for(let i = 0; i < row; i++) {
          mapArr.push([])
          for(let j = 0; j < col; j++) {
            let id = 0
            let mines = {
              id: id++,
              lng: [i, j], // [y, x]
              isBoom: (Math.random() > difficulty),
              issign: false,
              isClick: false,
            }
            mapArr[i].push(mines)
          } 
        }
        setTimeout(_ => {this.isStart = true}, 0)
      }else {
        this.$toast({msg: tipsStr + '不能超过指定范围', type: 'warn', duration: 2000, position: 'bottom'})
        return;
      }
    }
  },
  computed: {
  },
} 
</script>

<style scoped>
@import "./mineSweeper.css";
</style>
