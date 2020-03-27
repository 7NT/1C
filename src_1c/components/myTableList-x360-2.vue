<template>
  <q-card inline>
    <q-card-title>
      {{ myTable.name }}: {{ state }}
      <div slot="right" class="row items-center">
        <q-icon name="group" /> {{ myTable.players }}
      </div>
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <q-card-actions>
        <div class="row col-12 justify-between">
          <span v-for="n in 4" :key='n'>
            <q-btn @click='sit(n)' :label='pname(n)' icon="event_seat" align='between' />
          </span>
          <div class='col-2'>
            <q-btn flat @click="sit(9)" round dense icon="person_pin" />
          </div>
        </div>
      </q-card-actions>
    </q-card-main>
  </q-card>
</template>

<script>
// import { getUser } from 'src/jb-util/jb-util'
import api from 'src/api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'myTableList',
  props: ['myTable'],

  computed: {
    ...mapState('jstore', ['players']),
    ...mapGetters({
      // Mounts the "safelyStoredNumber" getter to the scope of your component.
    }),
    ...mapActions({
      // Mounts the "safelyStoredNumber" getter to the scope of your component.
    }),
    state: function () {
      console.log('state', this.myTable)
      if (this.myTable.name === '#Lobby') return 'Welcome'
      else {
        switch (this.myTable.state) {
          case 0: return 'Ready'
          case 1: return 'Bidding'
          case 2: return 'Playing'
          case -1: return 'Reviewing'
          default: return 'Waiting'
        }
      }
    }
  },
  methods: {
    pname (n) {
      let userId, user

      try {
        userId = this.myTable.seats[n - 1]
        // if (!userId) return 'SIT...'
        user = this.players.find(p => p.id === userId)
        return user.username
      } catch (err) {
        if (userId) {
          // return getUser(userId)
          // '[Reserved]'
          return api.service('users').get(userId).then((user) => {
            // console.log('user', user)
            return user.username
          })
        } else return 'SIT...'
      }
    },
    sit (sId) {
      if (this.myTable.id < 0 || !this.myTable.seats[sId - 1]) {
        this.$emit('onSit', { tId: this.myTable._id, sId })
      } else {
        this.$q.notify({ type: 'negative', message: 'This seat is taken' })
      }
    }
  }
}
</script>

<style scoped>
  .q-btn {
    min-width:75px;
    height: 32px;
    text-overflow: ellipsis;
    text-transform: none;
  }
</style>
