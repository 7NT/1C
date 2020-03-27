<template>
  <div class='tplay column'>
    <div class='col'>
      <div class='row no-wrap'>
        <div class='col-4 self-start'>
          <div class='row justify-start'>
            <myBoard :boardInfo='myBoardInfo' v-on:onBT='onBT'></myBoard>
          </div>
        </div>
        <div class='col-4 box'>
          <div class='column'>
            <myHand :myPlayer='myPlayer' :myHand='myHand(1)' :myPlay='myPlay' :turn='turn' v-on:onHand='onHand' class='myHand justify-start' />
          </div>
        </div>
        <div class='col-4 self-start'>
          <div class='row justify-end' v-if='state>1'>
            <myBidBox :myPlayer='myPlayer' :myBid='myBid' />
          </div>
        </div>
      </div>
    </div>
    <div class='col'>
      <div class='row no-wrap'>
        <div class='col-4 box'>
          <div class='column'>
            <myHand :myPlayer='myPlayer' :myHand='myHand(4)' :myPlay='myPlay' :turn='turn' v-on:onHand='onHand' class='myHand justify-end' />
          </div>
        </div>
        <div class='col-4'>
          <div class='column'>
            <q-card class='bbox cbox' v-show='state===1'>
              <q-card-media>
                <myBidBox :myPlayer='myPlayer' :myBid='myBid' v-on:onTurn='onTurn' />
              </q-card-media>
            </q-card>
            <q-card class='bbox cbox' v-if='state===2 && myPlay'>
              <q-card-media>
                <myPlayBox :card4='played4' />
              </q-card-media>
            </q-card>
          </div>
        </div>
        <div class='col-4 box'>
          <div class='column'>
            <myHand :myPlayer='myPlayer' :myHand='myHand(2)' :myPlay='myPlay' :turn='turn' v-on:onHand='onHand' class='myHand justify-start' />
          </div>
        </div>
      </div>
    </div>
    <div class='col'>
      <div class='row no-wrap'>
        <div class='col-4'>
        </div>
        <div class='col-4 box'>
          <div class='column'>
            <myHand :myPlayer='myPlayer' :myHand='myHand(3)' :myPlay='myPlay' :turn='turn' v-on:onHand='onHand' class='myHand justify-end' />
          </div>
        </div>
        <div class='col-4'>
          <q-popover v-if='state===1' v-model='bTurn' class='popover'>
            <div class='row group'>
              <q-btn-group v-for='n of 7' :key='n'>
                <q-fab v-if='bidN(n)' flat direction='up' :icon='`filter_${n}`' style='width:28px;height:28px;top:0px'>
                  <q-fab-action v-for='s in suits' :key='s.id' v-show='isBid(n,s.id)' :color='s.color' icon='' @click='bid(`${n}${s.suit}`)'>
                    {{getNSuit(n, s)}}
                  </q-fab-action>
                </q-fab>
              </q-btn-group>
            </div>
            <div class='row group'>
              <q-btn-group style='width: 100px'>
                <q-btn push label='X' color='negative' dense v-close-overlay style='min-width: 50px' :disable='X' @click="bid('X')" />
                <q-btn push label='XX' color='warning' dense v-close-overlay style='min-width: 60px' :disable='XX' @click="bid('XX')" />
                <q-btn push label='Pass' color='primary' dense v-close-overlay style='min-width: 100px' @click="bid('P')" />
              </q-btn-group>
            </div>
          </q-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from 'src/api'
import myBoard from 'src/components/myBoard'
import myHand from 'src/components/myHand'
import myBidBox from 'src/components/myBidBox'
import myPlayBox from 'src/components/myPlayBox'

export default {
  name: 'myTablePlay',
  props: ['myPlayer'],
  data: function () {
    return {
      tableData: null,
      boardData: null,
      boardInfo: null,
      bidData: null,
      playData: null,
      stateData: 0,
      turn: 0,
      bTurn: false,
      suits: [
        { id: 1, suit: 'C', color: 'black' },
        { id: 2, suit: 'D', color: 'red' },
        { id: 3, suit: 'H', color: 'red' },
        { id: 4, suit: 'S', color: 'black' },
        { id: 5, suit: 'NT', color: 'warning' }
      ],
      ccSystem: { name: { NS: 'SAYC', EW: 'SAYC' }, card: { NS: '', EW: '' } }
    }
  },
  components: {
    myBoard,
    myHand,
    myBidBox,
    myPlayBox
  },
  computed: {
    ...mapState('jstore', ['players', 'tables']),
    // ...mapGetters( ),
    myTable: {
      get: function () {
        return this.$data.tableData
      },
      set: function (t) { this.$data.tableData = t }
    },
    state: {
      get: function () {
        try {
          return this.myTable.state
        } catch (err) {}
        return 0
      },
      set: function (s) {
        // this.$data.stateData = s
      }
    },
    myTid: function () {
      return this.myPlayer.tId
    },
    mySid: function () {
      return this.myPlayer.sId
    },
    boardId: function () {
      return this.myTable.boardId
    },
    bidId: function () {
      return this.myTable.bidId
    },
    playId: function () {
      return this.myTable.playId
    },
    myBoard: {
      get: function () { return this.$data.boardData },
      set: function (b) { this.$data.boardData = b }
    },
    myBid: {
      get: function () { return this.$data.bidData },
      set: function (b) {
        console.log('bids', b)
        this.$data.bidData = b
      }
    },
    myPlay: {
      get: function () { return this.$data.playData },
      set: function (p) {
        console.log('plays', p)
        this.$data.playData = p
      }
    },
    myBoardInfo: {
      get: function () { return this.$data.boardInfo }
    },
    dealer: function () {
      try {
        return ((this.myBoard.bn - 1) % 4) + 1
      } catch (err) {}
      return 0
    },
    X: function () {
      if (this.state !== 1) return
      try {
        if (this.myBid.data.by < 1) return true
        else return (this.myBid.data.by - this.turn) % 2 === 0
      } catch (err) {}
      return true
    },
    XX: function () {
      if (this.state !== 1) return
      try {
        if (this.myBid.data.X < 1) return true
        else return (this.myBid.data.X - this.turn) % 2 === 0
      } catch (err) {}
      return true
    },
    played4: function () {
      let card4 = [null, null, null, null]
      if (this.state > 1) {
        try {
          let n = this.myPlay.plays.length % 4 || 4
          let played = this.myPlay.plays.slice(-n)
          let x0 = this.seatX(1)
          played.forEach(c => {
            let x = (c.seatX - x0)
            if (x <= 0) x += 4
            card4[x] = c.card
          })
        } catch (err) {}
      }
      console.log('card4', card4)
      return card4
    }
  },
  methods: {
    myHand (n) {
      return {
        uId: this.uId(n),
        sId: n,
        seatX: this.seatX(n),
        cards: this.cards(n)
      }
    },
    uId (n) {
      try {
        let x = this.seatX(n)
        return this.myTable.seats[x - 1]
      } catch (err) {}
      return null
    },
    seatX: function (x) {
      try {
        let x0 = Math.abs(this.mySid)
        switch (x0) {
          case 1:
          case 2:
          case 3:
          case 4:
            return (x0 + x) % 4 + 1
          // default: return x
        }
      } catch (err) {}
      return x
    },
    seatY: function (y) {
      let y0 = (y + Math.abs(this.mySid) - 3) % 4
      if (y0 <= 0) y0 += 4
      return y0
    },
    async loadBoard () {
      console.log('loadboard', this.boardId)
      let _id = this.boardId
      if (_id) {
        let _board = await api.service('boards').get(_id)
        this.$data.boardInfo = {
          bt: this.myTable.bt,
          bn: _board.bn,
          cc: this.ccSystem.name,
          trick: { NS: 0, EW: 0 }
        }
        this.myBoard = _board
      }
    },
    async loadBids () {
      let _id = this.bidId
      console.log('loadBid', _id)
      if (_id) {
        let _bids = await api.service('bids').get(_id)
        this.myBid = _bids
        api.service('bids').on('patched', bids => {
          console.log('bid patched', bids._id === _id)
          if (bids._id === _id) this.myBid = bids
        })
      }
    },
    async loadPlays () {
      let _id = this.playId
      console.log('loadPlays', _id)
      if (_id) {
        let _play = await api.service('plays').get(_id)
        _play.plays = _play.plays || []
        this.myPlay = _play
        this.$data.turn = _play.turn
        api.service('plays').on('patched', play => {
          if (play._id === _id) this.myPlay = play
        })
      }
    },
    cards (s) {
      let x = this.seatX(s)
      try {
        let _cards = this.myBoard.cards
        let x0 = [x - 1] * 13
        return _cards.slice(x0, x0 + 13).sort((a, b) => a - b)
      } catch (err) {}
      return null
    },
    onState (s) {
      console.log('onState', s)
      switch (s) {
        case 0:
          this.myBoard = null
          this.myBid = null
          this.myPlay = null
          api.service('bids').removeAllListeners('Ready')
          api.service('plays').removeAllListeners('Ready')
          break
        case 1:
          this.loadBoard()
          this.loadBids()
          break
        case 2:
          this.loadPlays()
          break
        default:
          // return
      }
    },
    onBT (bt) {
      switch (bt) {
        case 'MP':
        case 'IMP':
        case 'XIMP':
          this.$data.tableData.bt = bt
          this.$q.notify({ type: 'positive', message: `Board will switch to ${bt} next` })
          break
        default:
      }
    },
    onHand (data) {
      console.log('data', data)
      if (data.action === 'sit') {
        if (!data.uId) {
          this.$emit('onSit', { tId: this.myTid, sId: data.sId })
        } else if (data.uId === this.myPlayer.id) {
          this.$q.notify({ type: 'info', message: 'Ready' })
        } else {
          this.$q.notify({ type: 'negative', message: 'This seat is taken' })
        }
      } else if (data.action === 'play') {
        let _plays = this.myPlay.plays || []
        if (!_plays.includes(data.card)) {
          _plays.push(data.play)
          this.$data.playData.plays = _plays
          api.service('plays').patch(this.playId, this.$data.playData)
        }
      }
    },
    onTurn (data) {
      if (data.action === 'bid') {
        console.log('onturn', data)
        this.$data.bidData = data.bid
        this.$data.turn = data.turn
        this.$data.bTurn = this.mySid === data.turn
      }
    },
    bid (bid) {
      console.log('bid', bid)
      let _data = this.myBid
      _data.bids.pop()
      _data.bids.push({ 'seat': this.$data.turn, 'bid': bid })
      _data.bids.push({ 'seat': this.$data.turn % 4 + 1, 'bid': '?' })
      this.$data.bidData.bids = _data.bids
      api.service('bids').patch(this.bidId, this.$data.bidData)
    },
    bidN (n) {
      try {
        if (n === this.myBid.data.bidN) return this.myBid.data.bidS < 5
        else return n > this.myBid.data.bidN
      } catch (err) {}
      return true
    },
    isBid (n, s) {
      try {
        if (n === this.myBid.data.bidN) return s > this.myBid.data.bidS
      } catch (err) {}
      return true
    },
    getNSuit (n, s) {
      switch (s.suit) {
        case 'C': return n + '♣'
        case 'D': return n + '♦'
        case 'H': return n + '♥'
        case 'S': return n + '♠'
        default: return n + s.suit
      }
    }
  },
  watch: {
    myTid: function (newId) {
      // console.log('watch', newTid)
      // this.$data.roomId = newId
    },
    mySid: function (sId) {
      // let x = this.played4
      // console.log(x)
    },
    state: function (s1, s0) {
      s0++
      for (let s = s0; s <= s1; s++) {
        this.onState(s)
      }
    }
  },
  created () {
    this.onState(0)
    let _table = this.tables.find(t => t._id === this.myTid)
    this.myTable = _table
    api.service('tables').on('patched', table => {
      if (table._id === this.myTid) {
        this.myTable = table
      }
    })
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>
.q-btn >>> .q-icon {
  /*float: left*/
  align-self: flex-start;

}
.tplay {
  border: 1px solid green;
  width: 100%;
  height: 100%;
  min-height: 393px;
  background-image: url('../statics/img/jb-bg.jpeg');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
.tplay > div {
  border: 1px solid yellow;
  align-items: flex-end;
}
.box {
  border: 1px solid blue;
}
.bbox {
  min-height: 160px;
  min-width: 160px;
}
.cbox {
  max-height: 200px;
  max-width: 240px;
  border: 1px solid red;
  margin: auto;
  overflow-y: auto;
}
.popover {
  overflow: visible;
}
.popover >>> .q-btn-fab {
  height: 28px;
  width: 28px;
}
.myHand {
  min-height: 100px;
  max-height: 131px;
  min-width: 175px;
}

</style>
