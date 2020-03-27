<template>
  <q-page>
    <!-- content -->
    <div>
      <q-btn-toggle dense push glossy no-wrap no-caps v-model='roomId' toggle-color='info' :options='rooms' @input='room' />
    </div>

    <div class='column' v-if='myUser'>
      <div v-show='roomId==0' class='tables'>
        <q-collapsible icon='person' label='Table Lists' opened class='full-width'>
          <q-card inline v-for='t in tables' :key='t.id'>
            <myTableList :myTable='t' v-on:onSit='onSit' />
          </q-card>
        </q-collapsible>
      </div>
      <div v-show='roomId==1'>
        <q-collapsible v-if='myTid' :avatar='myAvatar' :label="'My Table'" opened class='full-width'>
          <myTablePlay :myPlayer='myPlayer' v-on:onSit='onSit' class='myTable' />
        </q-collapsible>
      </div>
      <q-collapsible icon='chat' label='Messages' opened class='chats'>
        <div class='full-width'>
          <q-chat-message v-for='chat in Chats()' :key='chat.id'
            :text='[chat.text]'
            :avatar='chat.from.avatar'
            :stamp='chatDate(chat)'
            :sent='isSent(chat) ? true : false'
          />
        </div>
       </q-collapsible>
    </div>
  </q-page>
</template>

<script>
// import { Events } from 'quasar'
import { mapState } from 'vuex'
import moment from 'moment'
import api from 'src/api'
import myTableList from 'src/components/myTableList'
import myTablePlay from 'src/components/myTablePlay'

export default {
  name: 'lobby',
  props: ['myUser'],

  components: {
    myTableList,
    myTablePlay
  },
  data () {
    return {
      playerData: null,
      roomId: 0,
      rooms: [
        { label: 'Lobby', value: 0 },
        { label: 'My Table', value: 1 }
        // {label: 'Tourney', value: 2},
        // {label: 'Team Game', value: 4}
      ]
    }
  },
  computed: {
    ...mapState('jstore', ['chats']),
    myPlayer: {
      get: function () {
        return this.$data.playerData
      },
      set: function (player) {
        this.$data.playerData = player
      }
    },
    myAvatar: function () {
      return this.myUser.avatar
    },
    myTid: function () {
      try {
        return this.myPlayer.tId
      } catch (err) {}
      return null
    },
    mySid: function () {
      try {
        return this.myPlayer.sId
      } catch (err) {}
      return 0
    },
    chatTo: {
      get () { return this.$store.state.jstore.chatTo },
      set (rId) { this.$store.dispatch('jstore/setChatTo', rId) }
    },
    tables: {
      get () { return this.$store.state.jstore.tables },
      set (tables) { this.$store.dispatch('jstore/setTables', tables) }
    },
    table: {
      get (table) { return this.tables.find(t => t._id === table._id) },
      set (table) { this.$store.commit('jstore/setTable', table) }
    },
    players: {
      get () { return this.$store.state.jstore.players },
      set (players) {
        this.$store.dispatch('jstore/setPlayers', players)
        this.myPlayer = this.players.find(p => p.id === this.myUser._id)
      }
    },
    player: {
      get (uid) { return this.players.find(p => p.id === uid) },
      set (player) {
        this.$store.commit('jstore/setPlayer', player)
        if (player.state >= 0 && player.id === this.myUser._id) this.myPlayer = player
      }
    }
  },
  methods: {
    isSent (chat) {
      return (chat.from.userId === this.myUser._id)
    },
    Chats () {
      let _chats
      if (this.roomId > 0) {
        _chats = this.chats.filter(m => m.to === `#${this.myTid}`)
      } else {
        _chats = this.chats.filter(m => m.to === '#Lobby')
      }
      return _chats
    },
    chatDate (chat) {
      return moment(chat.createdAt).format('MMM Do, hh:mm:ss')
    },
    room () {
      // console.log(this.roomId)
    },
    onSit (seat) {
      api.service('players').patch(this.myUser._id, seat)
    }
  },
  mounted () {
    // console.log('myUser', this.myUser)
    const _players = api.service('players')
    const _tables = api.service('tables')

    _players.find()
      .then((response) => {
        this.players = response.data
      })
    _players.on('created', player => {
      this.player = player
    })
    _players.on('patched', player => {
      this.player = player
    })
    _players.on('removed', player => {
      player.state = -1
      this.player = player
    })
    _tables.find()
      .then((response) => {
        this.tables = response.data
      })
    _tables.on('created', table => {
      this.table = table
    })
    _tables.on('patched', table => {
      this.table = table
    })
    _tables.on('removed', table => {
      table.state = -1
      this.table = table
    })
  },
  watch: {
    myTid: function (newId) {
      this.chatTo = `#${newId || 'Lobby'}`
      this.$data.roomId = newId ? 1 : 0
    },
    mySid: function (newId) {
      if (newId > 0) this.$data.roomId = 1
    }
  },
  beforeDestroy () {
  }
}
</script>

<style>
  .tables {
    max-width: 75vh;
  }
  .myTable {
    min-height: 393px;
    height: 50vh;
  }
</style>
