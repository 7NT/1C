<template>
  <q-page>
    <!-- content -->
    <div>
      <q-splitter
        v-model='splitterModel'
        horizontal
      >
        <template v-slot:before>
          <div class='q-pa-md'>
            <q-card>
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
            </q-card>
          </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-md">
            <q-expansion-item
              default-opened
              dense
              icon='chat'
              label='Messages'
              header-class='chats'
            >
              <q-separator />
              <q-card class='full-width chats'>
                <q-chat-message
                  v-for='chat in chats'
                  :key='chat.id'
                  :text='[chat.text]'
                  :avatar='chat.from.avatar'
                  :stamp='chatDate(chat)'
                  :sent='isSent(chat) ? true : false'
                />
              </q-card>
            </q-expansion-item>
          </div>
        </template>

      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { playerService } from 'src/api'
import moment from 'moment'
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
      user: null,
      chats: [],
      myPlayer: null,
      splitterModel: 50, // start at 50%
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
    ...mapState('jstore', ['players', 'tables']),
    ...mapGetters('jstore', ['getChats'])
  },
  methods: {
    ...mapActions('jstore', [
      'setPlayers',
      'setTables',
      'setPlayer',
      'setTable'
    ]),
    isSent (chat) {
      return chat.from.userId === this.user._id
    },
    chatDate (chat) {
      return moment(chat.createdAt).format('MMM Do, hh:mm:ss')
    },
    onSit (seat) {
      console.log(this.user, seat)
      playerService.patch(this.user._id, seat)
    }
  },
  mounted () {
  },
  created () {
    this.$parent.page = 'Lobby'
    this.user = this.$attrs.user
    this.chats = this.$attrs.chats
  },
  watch: {

  }
}
</script>
