<template>
  <div class="q-ma-none">
    <div class="tplay column">
      <div class="col">
        <div class="row no-wrap">
          <div class="col-3 items-start">
            <myBoard
              :table="myTable"
              :cc="$data.cc"
              v-on:onBT="onBT"
            ></myBoard>
          </div>
          <div class="col-6 box">
            <div class="column">
              <myHand
                :seatX="seatX[0]"
                :myPlayer="myPlayer"
                :myTable="myTable"
                v-on:onAction="onAction"
                class="myHand justify-start"
              />
            </div>
          </div>
          <div class="col-3 self-start">
            <div
              class="row justify-end"
              v-if="State > 1"
            >
              <myBidBox
                :seatX3="seatX[2]"
                :myTable="myTable"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row no-wrap">
          <div class="col-4 box">
            <div class="column">
              <myHand
                :seatX="seatX[3]"
                :myPlayer="myPlayer"
                :myTable="myTable"
                v-on:onAction="onAction"
                class="myHand justify-end"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="column">
              <q-card
                class="bbox cbox"
                v-if="State === 1"
              >
                <q-card>
                  <myBidBox
                    :seatX3="seatX[2]"
                    :myTable="myTable"
                  />
                </q-card>
              </q-card>
              <q-card
                class="cbox transparent"
                v-if="State === 2"
              >
                <myPlayBox
                  :card4="played4"
                  :seatX="seatX"
                />
              </q-card>
            </div>
          </div>
          <div class="col-4 box">
            <div class="column">
              <myHand
                :seatX="seatX[1]"
                :myPlayer="myPlayer"
                :myTable="myTable"
                v-on:onAction="onAction"
                class="myHand justify-start"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row no-wrap">
          <div class="col-3" />
          <div class="col-6 box">
            <div class="column">
              <myHand
                :seatX="seatX[2]"
                :myPlayer="myPlayer"
                :myTable="myTable"
                v-on:onAction="onAction"
                class="myHand justify-end"
              />
            </div>
          </div>
          <div class="col-3">
            <div
              class="column"
              v-if="myTurn() === 1"
            >
              <div class="col group items-start">
                <q-btn-group
                  dense
                  outline
                  glossy
                  v-for="n of 7"
                  :key="n"
                >
                  <q-fab
                    flat
                    glossy
                    v-if="bidN(n)"
                    :icon="`mdi-numeric-${n}-box-outline`"
                    direction="up"
                    style="width:28px;height:28px;top:0px"
                  >
                    <q-fab-action
                      v-for="s in suits"
                      :key="s.id"
                      icon=""
                      v-show="isBid(n, s.id)"
                      :color="s.color"
                      @click="onBid(`${n}${s.suit}`)"
                    >
                      {{ bidNS(n, s.suit) }}
                    </q-fab-action>
                  </q-fab>
                </q-btn-group>
                <q-separator
                  spaced
                  color="warning"
                />
              </div>
              <div class="col group items-end">
                <q-btn-group
                  dense
                  class="full-width"
                >
                  <q-btn
                    glossy
                    label="X"
                    color="negative"
                    :disable="X"
                    @click="onBid('X')"
                    style="width:20%"
                  />
                  <q-btn
                    glossy
                    label="XX"
                    color="warning"
                    :disable="XX"
                    @click="onBid('XX')"
                    style="width:30%"
                  />
                  <q-btn
                    glaosy
                    label="Pass"
                    color="primary"
                    @click="onBid('P')"
                    style="width:50%"
                  />
                </q-btn-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { api } from 'src/api'
import jb from 'src/jb'
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
      boardInfo: {
        bt: '',
        bn: 0,
        cc: null,
        play: null
      },
      state: 0,
      seatX: [1, 2, 3, 4],
      suits: [
        { id: 1, suit: '♣', color: 'black' },
        { id: 2, suit: '♦', color: 'red' },
        { id: 3, suit: '♥', color: 'red' },
        { id: 4, suit: '♠', color: 'black' },
        { id: 5, suit: 'NT', color: 'warning' }
      ],
      cc: { name: { NS: 'SAYC', EW: 'SAYC' }, card: { NS: '', EW: '' } }
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
    ...mapGetters('jstore', ['getTableById']),
    myTable: {
      get: function () {
        return this.$data.tableData
      },
      set: function (t) {
        console.log('t', t)
        this.$data.tableData = t
        this.State = t.state
        if (t.state === 2) {
          console.log('pi', t.turn, t.play.info.winner, t)
        }
      }
    },
    myTid: {
      get: function () {
        return this.myPlayer.tId
      }
    },
    mySid: {
      get: function () {
        // console.log("p", this.myPlayer);
        return this.myPlayer.sId
      }
    },
    State: {
      get: function () {
        return this.$data.state
      },
      set: function (s) {
        this.$data.state = s
      }
    },
    Turn: {
      get: function () {
        return this.myTable ? this.myTable.turn : 0
      }
    },
    myBid: {
      get: function () {
        return this.myTable.bid
      }
    },
    myPlay: {
      get: function () {
        return this.myTable.play
      }
    },
    X: function () {
      return jb.bidX(this.myBid.info.by, this.Turn)
    },
    XX: function () {
      return jb.bidX(this.myBid.info.X, this.Turn)
    },
    played4: function () {
      let card4 = [null, null, null, null]
      if (this.State > 1) {
        try {
          let l4 = this.myTable.play.data.length
          let n4 = l4 % 4
          if (!n4) n4 = 4
          card4 = this.myTable.play.data.slice(-n4)
          // console.log(l4, n4, this.myTable.play.data);
        } catch (_) {
          // console.log(err);
        }
      }
      return card4
    }
  },
  methods: {
    myTurn () {
      return this.Turn === this.mySid ? this.State : 0
    },
    onBT (bt) {
      switch (bt) {
        case 'MP':
        case 'IMP':
        case 'XIMP':
          this.$data.tableData.bt = bt
          this.$q.notify({
            type: 'positive',
            message: `Board will switch to ${bt} next`
          })
          break
        default:
      }
    },
    onState (s) {
      console.log('t', s, this.myTable, this.$data.boardInfo)
      switch (s) {
        case 0:
          this.$data.boardInfo.bt = this.myTable.bt
          break
        case 1:
          this.$data.boardInfo.bn = this.myTable.board.bn
          break
        case 2:
          this.$data.boardInfo.play = this.myTable.play.info
          break
        default:
        // return
      }
    },
    onBid (bid) {
      // console.log("bid", bid, this.myTable);
      let _bid = this.myBid
      let _turn = this.Turn
      _bid.data.pop()
      _bid.data.push({ seat: _turn, bid: bid })
      _turn = (_turn % 4) + 1
      _bid.data.push({ seat: _turn, bid: '?' })
      api.service('tables').patch(this.myTable._id, { bid: _bid, turn: _turn })
    },
    onAction (data) {
      // console.log("data", data);
      if (data.action === 'sit') {
        if (!data.uId) {
          this.$emit('onSit', { tId: this.myTid, sId: data.sId })
        } else if (data.uId === this.myPlayer.id) {
          this.$q.notify({ type: 'info', message: 'Ready' })
        } else {
          this.$q.notify({ type: 'negative', message: 'This seat is taken' })
        }
      } else if (data.action === 'play') {
        let _play = this.myTable.play || []
        let _played = _play.data.map(x => x.card) || []
        if (!_played.includes(data.card)) {
          _play.data.push(data.play)
          api.service('tables').patch(this.myTable._id, { play: _play })
        }
      }
    },
    bidN (n) {
      try {
        if (n === this.myBid.info.bidN) return this.myBid.info.bidS < 5
        else return n > this.myBid.info.bidN
      } catch (_) {
        // console.log(err);
      }
      return true
    },
    isBid (n, s) {
      try {
        // console.log(n, s, this.myBid);
        let n1 = n * 10 + s
        let n0 = this.myBid.info.bidN * 10 + this.myBid.info.bidS
        return n1 > n0
      } catch (_) {
        // console.log(err);
      }
      return true
    },
    bidNS (n, s) {
      switch (s) {
        case 'C':
          return n + '♣'
        case 'D':
          return n + '♦'
        case 'H':
          return n + '♥'
        case 'S':
          return n + '♠'
        default:
          return n + s
      }
    },
    updateView (v) {
      let v0 = Math.abs(v)
      switch (v0) {
        case 1:
        case 2:
        case 3:
        case 4:
          v = v0 - 3
          break
        default:
          v = 0
      }

      let _seatX = [1, 2, 3, 4]
      for (let x of [0, 1, 2, 3]) {
        let _x = ((v + x) % 4) + 1
        if (_x <= 0) _x += 4
        _seatX[x] = _x
      }
      this.$data.seatX = _seatX
    }
  },
  watch: {
    State: function (s1, s0) {
      // s0++;
      for (let s = s0; s <= s1; s++) {
        this.onState(s)
      }
    },
    mySid: function (s0) {
      this.updateView(s0)
    }
  },
  created () {
    this.myTable = this.getTableById(this.myTid)
    api.service('tables').on('patched', table => {
      if (table._id === this.myTid) {
        this.myTable = table
      }
    })
    this.updateView(this.mySid)
  },
  beforeDestroy () { }
}
</script>

<style scoped>
.q-btn >>> .q-icon {
  /*float: left*/
  align-self: flex-start;
}
.tplay {
  /*border: 1px solid green;*/
  width: 100%;
  height: 100%;
  min-height: 393px;
  background-image: url("../statics/jbnet.jpeg");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
.tplay > div {
  /*border: 1px solid yellow;*/
  align-items: flex-end;
}
.box {
  border: 1px solid blue;
}
.bbox {
  max-height: 131px;
  min-width: 160px;
}
.cbox {
  max-height: 131px;
  max-width: 240px;
  border: 1px solid gray;
  margin: auto;
  overflow-y: visible;
}
.myHand {
  min-height: 100px;
  max-height: 131px;
  min-width: 175px;
}
</style>
