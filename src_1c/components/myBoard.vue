<template>
<<<<<<< HEAD
  <div class="q-ma-none">
    <q-expansion-item
      dense
      dense-toggle
      icon="menu"
      :label="bi"
      header-class="bg-info text-white"
      default-opened
    >
      <q-table
        dense
        hide-header
        hide-bottom
        separator="cell"
        :data="boardData"
        :columns="columns"
        row-key="name"
        color="primary"
        class="bbox text-caption"
      >
      </q-table>
    </q-expansion-item>
  </div>
=======
  <div>My component</div>
>>>>>>> 92ad6ba6c6f35c0f6ed8d6bf020c86f3dc8f1e3d
</template>

<script>
export default {
<<<<<<< HEAD
  name: 'myBoard',
  props: ['table', 'cc'],
  data: function () {
    return {
      tricks: {
        NS: 0,
        EW: 0
      },
      boardData: [
        { name: 'System:', ns: 'NS: ...', ew: 'EW: ...' },
        { name: 'Trick:', ns: 0, ew: 0 },
        { name: 'Score:', ns: '', ew: '' }
      ],
      columns: [
        { name: 'name', label: '', field: 'name' },
        { name: 'ns', label: '', field: 'ns' },
        { name: 'ew', label: '', field: 'ew' }
      ]
    }
  },
  computed: {
    bi: function () {
      try {
        return this.table.bt + ': ' + this.table.board.bn
      } catch (_) {
        // console.log(err);
      }
      return ''
    },
    myInfo: function () {
      try {
        return this.table.play.info
      } catch (_) {
        // console.log(err);
      }
      return null
    }
  },
  methods: {
    onBT (bt) {
      this.$emit('onBT', bt)
    }
  },
  watch: {
    myInfo () {
      if (this.table.state === 2) {
        this.$data.boardData[1].ns = this.myInfo.NS
        this.$data.boardData[1].ew = this.myInfo.EW
      }
    }
  },
  created () {
    console.log('t', this.table)
  }
}
</script>
<style scoped>
.bbox {
  max-height: 100px;
  min-width: 120px;
}
table thead {
  font-size: small;
}
table tbody {
  font-size: xx-small;
  background-color: white;
}
table td {
  text-align: center;
}
</style>
=======
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>
>>>>>>> 92ad6ba6c6f35c0f6ed8d6bf020c86f3dc8f1e3d
