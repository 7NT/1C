<template>
<<<<<<< HEAD
  <q-table
    dense
    bordered
    hide-bottom
    separator="cell"
    :data="bData"
    :columns="columns"
    row-key="row"
    class="bbox text-caption"
  >
    <q-tr
      slot="header"
      slot-scope="props"
      :props="props"
    >
      <q-th
        v-for="col in props.cols"
        :key="col.seat"
        :class="vclass(col.seat)"
      >
        {{ col.label }}
        <q-tooltip>{{ pname(col.seat) }}</q-tooltip>
      </q-th>
    </q-tr>
  </q-table>
</template>

<script>
// import jb from "src/jb";

export default {
  name: 'myBidBox',
  props: ['seatX3', 'myTable'],
  data: () => ({
    seats: ['N', 'E', 'S', 'W'],
    bData: []
  }),
  computed: {
    columns: function () {
      let cols = []
      for (let i of [1, 2, 3, 4]) {
        let x = (i + this.seatX3 + 3) % 4
        let c = this.seats[x]
        cols.push({ seat: x + 1, label: c, field: c, align: 'center' })
      }
      return cols
    },
    myBid: function () {
      return this.myTable.bid
    }
  },
  methods: {
    pname (s) {
      let c = this.seats[s - 1]
      return `{ seat: ${s}, label: "${c}", field: "${c}" }`
    },
    vclass (s) {
      return 'col-3 ' + this.vcolor(s)
    },
    vcolor (s) {
      if (this.myBid) {
        s = s % 2
        switch (this.myTable.board.vulN) {
          case 3:
            return 'v1'
          case 1:
            return s === 1 ? 'v1' : 'v0'
          case 2:
            return s === 0 ? 'v1' : 'v0'
          default:
            return 'v0'
        }
      }
    },
    loadBids () {
      if (!this.myBid) return
      let data = []
      let _bid = this.myBid
      try {
        let row = 1
        let rBid = { N: null, E: null, S: null, W: null }
        _bid.data.forEach(bid => {
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
          if (bid.seat === this.seatX3) {
            rBid.row = row
            data.push(rBid)
            rBid = { N: null, E: null, S: null, W: null }
            row++
          }
        })
        if (rBid) {
          rBid.row = row
          data.push(rBid)
        }
        this.$data.bData = data
      } catch (_) {
        // console.log(err);
      }
    }
  },
  watch: {
    seatX3 () {
      // console.log("sid changed");
      this.loadBids()
    },
    myBid () {
      // console.log("bid changed", b0, b1);
      this.loadBids()
    }
  },
  created () {
    this.loadBids()
  }
}
</script>

<style>
.bbox {
  max-height: 130px;
  min-width: 160px;
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
.v0 {
  background-color: blue !important;
}
.v1 {
  background-color: red !important;
}
</style>
=======
  <div>My component</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>
>>>>>>> 92ad6ba6c6f35c0f6ed8d6bf020c86f3dc8f1e3d
