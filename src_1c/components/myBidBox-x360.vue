<template>
  <q-table
    dense
    hide-bottom
    separator='cell'
    :data='bData'
    :columns='columns'
    row-key='row'
    class='bbox'
  >
    <q-tr slot='header' slot-scope='props' :props='props'>
      <q-th class='col-3' :bgcolor='vul_color(col.seat)' v-for='col in props.cols' :key='col.seat'>
        {{ props.cols[col.seat - 1].label }}
        <q-tooltip> {{ colName(col.seat) }} </q-tooltip>
      </q-th>
    </q-tr>
  </q-table>
</template>

<script>
export default {
  name: 'myBidBox',
  props: ['myPlayer', 'myBid'],
  data: () => ({
    seats: [ 'N', 'E', 'S', 'W' ],
    bData: []
  }),
  computed: {
    // view Id
    columns: function () {
      let cols = []
      let i
      for (i of [0, 1, 2, 3]) {
        let x = this.seatX(i) - 1
        let c = this.seats[x]
        cols.push({ seat: i + 1, label: c, field: c, align: 'center' })
      }
      return cols
    }
  },
  watch: {
    myPlayer () {
      this.loadBids()
    },
    myBid () {
      this.loadBids()
    }
  },
  methods: {
    vId () {
      let x = Math.abs(this.myPlayer.sId)
      if (x < 1 || x > 4) x = 3
      return x
    },
    seatX (s) {
      return (this.vId() + s) % 4 + 1
    },
    colName (s) {
      let c = this.seats[s - 1]
      return `{ seat: ${s}, label: '${c}', field: '${c}' }`
    },
    vul_color (s) {
      if (this.myBid) {
        switch (this.myBid.board.vulN) {
          case 0: return 'blue'
          case 3: return 'red'
          case 1: {
            if (s % 2 === 1) return 'red'
            else return 'blue'
          }
          case 2: {
            if (s % 2 === 1) return 'blue'
            else return 'red'
          }
          default: return null
        }
      }
    },
    loadBids () {
      console.log('loadbids', this.myBid)
      if (!this.myBid) return
      let turn = 0
      let data = []
      let _bid = this.myBid
      try {
        let row = 1
        let rBid = { N: null, E: null, S: null, W: null }
        _bid.bids.forEach(bid => {
          switch (bid.seat) {
            case 1: {
              rBid.N = bid.bid
              break
            }
            case 2: {
              rBid.E = bid.bid
              break
            }
            case 3: {
              rBid.S = bid.bid
              break
            }
            case 4: {
              rBid.W = bid.bid
              break
            }
            default:
          }
          if (bid.seat === this.vId()) {
            rBid.row = row
            data.push(rBid)
            rBid = { N: null, E: null, S: null, W: null }
            row++
          }
          if (bid.bid === '?') turn = bid.seat
        })
        if (rBid) {
          rBid.row = row
          data.push(rBid)
        }
        this.$data.bData = data
      } catch (err) {}
      if (turn) this.$emit('onTurn', { action: 'bid', turn, bid: _bid })
    }
  },
  created () {
    this.loadBids()
  }
}
</script>

<style>
 .bbox {
    min-width: 160px;
    min-height: 160px;
  }
  table thead {
    font-size: medium;
  }
  table tbody {
    font-size: xx-small;
    background-color: white;
  }
  table td {
    text-align: center;
  }
</style>
