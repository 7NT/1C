<template>
  <q-item
    dense
    clickable
  >
    <q-item-section>
      <q-item-label
        overline
        class='bg-warning'
      >
        {{ myTable.name }}: {{ myTable.info || state }}
      </q-item-label>
      <q-item-label>
        <q-btn-group
          push
          v-for='n in 4'
          :key='n'
        >
          <q-btn
            push
            glassy
            ripple
            no-caps
            no-wrap
            @click='sit(n)'
            :label='username(n)'
            icon='event_seat'
            :color='scolor(n)'
            style='width:100px'
          >
            <q-tooltip>{{ sname[n - 1] }}</q-tooltip>
          </q-btn>
          <!--
          <q-separator
            vertical
            inset
          />
          -->
        </q-btn-group>
        <q-btn
          flat
          @click='sit(9)'
          round
          dense
          icon='person_pin'
        />
      </q-item-label>
    </q-item-section>

    <q-item-section
      side
      top
    >
      <q-badge
        color='info'
        :label='myTable.players'
      />
    </q-item-section>
  </q-item>
</template>

<script>
import { userService } from 'src/api'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'myTableList',
  props: ['myTable'],

  data () {
    return {
      sname: ['North', 'East', 'South', 'West'],
      uname: [null, null, null, null]
    }
  },
  computed: {
    ...mapGetters('jstore', ['getPlayerById']),
    state: function () {
      if (this.myTable.name === '#Lobby') return 'Welcome'
      else {
        switch (this.myTable.state) {
          case 0:
            return 'Ready'
          case 1:
            return 'Bidding'
          case 2:
            return 'Playing'
          case -1:
            return 'Reviewing'
          default:
            return 'Waiting'
        }
      }
    }
  },
  methods: {
    ...mapActions('jstore', ['addUser']),
    getPlayers () {
      for (let n in [0, 1, 2, 3]) {
        let uid = this.myTable.seats[n]
        if (uid) this.getPlayer(n, uid)
      }
    },
    getPlayer (n, uid) {
      let user = this.getPlayerById(uid)
      if (!user) user = this.findUser(n, uid)
      if (user) {
        if (user.state >= 0) this.uname[n] = user.username
        else this.uname[n] = `[${user.username}]`
      }
    },
    findUser (n, uid) {
      userService.get(uid)
        .then(user => {
          if (user) {
            user.state = -1
            this.uname[n] = `[${user.username}]`
            this.addUser(user)
            // this.$forceUpdate()
          }
        })
    },
    username (n) {
      return this.uname[n - 1] || 'SIT...'
    },
    scolor (n) {
      let userId = this.myTable.seats[n - 1]
      return userId ? 'info' : 'positive'
    },
    sit (sId) {
      if (!this.myTable.seats[sId - 1]) {
        this.$emit('onSit', { tId: this.myTable._id, sId })
      } else {
        this.$q.notify({ type: 'negative', message: 'This seat is taken' })
      }
    }
  },
  created () {
    this.getPlayers()
  }
}
</script>

<style scoped>
.q-btn {
  min-width: 75px;
  height: 32px;
  text-overflow: ellipsis;
  text-transform: none;
}
</style>
