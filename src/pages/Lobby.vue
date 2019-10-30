<template>
  <q-page>
    <!-- content -->
    <q-splitter
      v-model='splitterModel'
      horizontal
      stype='height: 400px'
    >
      <template v-slot:before>
        <div class='q-pa-md'>
          <q-tabs
            v-model='roomId'
            align='left'
            dense
            no-caps
            inline-label
            indicator-color='yellow'
            class='bg-secondary text-white shadow-2'
          >
            <q-tab
              v-for='r in rooms'
              :key='r.name'
              :name='r.name'
              :icon='r.icon'
              :label='r.name'
              :disable='!r.open'
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model='roomId'
            animated
          >
            <q-tab-panel name='Lobby'>
              <q-list
                dense
                bordered
                separator
              >
                <myTableList
                  v-for='t in tables'
                  :key='t.id'
                  :myTable='t'
                  v-on:onSit='onSit'
                />
              </q-list>
            </q-tab-panel>

            <q-tab-panel name='My Table'>
              <myTablePlay
                :myPlayer='myPlayer'
                v-on:onSit='onSit'
                class='myTable'
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </template>

      <template v-slot:after>
        <div class='q-pa-md'>
          <div class='full-width'>
            <q-chat-message
              v-for="chat in getChats('#Lobby')"
              :key='chat.id'
              :text='[chat.text]'
              :avatar='chat.from.avatar'
              :stamp='chatDate(chat)'
              :sent='isSent(chat) ? true : false'
            />
          </div>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import api from 'src/api'
import myTableList from 'src/components/myTableList'
import myTablePlay from 'src/components/myTablePlay'

export default {
  name: 'Lobby',
  components: {
    myTableList,
    myTablePlay
  },
  data () {
    return {
      splitterModel: 50, // start at 50%
      user: null,
      myPlayer: null,
      roomId: 'Lobby',
      rooms: [
        {
          name: 'Lobby',
          value: 0,
          icon: 'people',
          open: true
        },
        {
          name: 'My Table',
          value: 1,
          icon: 'portrait',
          open: false
        },
        {
          name: 'Tourney',
          value: 2,
          icon: 'person_add',
          open: false
        },
        {
          name: 'Team Game',
          value: 4,
          icon: 'group_add',
          open: false
        }
      ],
      mix: ['MP', 'IMP', 'XIMP'],
      myBT: null
    }
  },
  computed: {
    ...mapState('jstore', ['players', 'tables', 'chats']),
    ...mapGetters('jstore', ['getChats'])
  },
  methods: {
    ...mapActions('jstore', [
      'setPlayers',
      'setTables',
      'setPlayer',
      'setTable',
      'setChats'
    ]),
    onSit (seat) {
      api.service('players').patch(this.user._id, seat)
    }
  },
  created () {
    this.$parent.page = 'Lobby'
    this.user = this.$attrs.user
  }
}
</script>
