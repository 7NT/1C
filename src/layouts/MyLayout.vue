<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click='leftDrawerOpen = !leftDrawerOpen'
          icon='menu'
          aria-label='Menu'
        />

        <q-toolbar-title>Quasar App {{ this.page }}</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

        <q-btn
          flat
          @click="goTo('signin')"
          v-show='!authenticated'
        >Sign In</q-btn>
        <q-btn
          flat
          @click="goTo('register')"
          v-show='!authenticated'
        >Register</q-btn>
        <q-btn
          flat
          round
          @click="goTo('home')"
          v-show='authenticated'
        >
          <q-icon name='home' />
          <q-tooltip
            anchor='bottom middle'
            self='top middle'
            :offset='[0, 20]'
          >Home</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          icon="mdi-account-search"
          @click="playerList = !playerList"
          aria-label="Player List..."
          v-show="authenticated"
        />
        <q-btn
          flat
          round
          @click="goTo('profile')"
          v-if='authenticated'
        >
          <q-avatar class='gt-xs'>
            <img :src='user.avatar' />
          </q-avatar>
          <q-tooltip
            anchor='bottom middle'
            self='top middle'
            :offset='[0, 20]'
          >Profile</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          @click='signout'
          v-show='authenticated'
        >
          <q-icon name='exit_to_app' />
          <q-tooltip
            anchor='bottom middle'
            self='top middle'
            :offset='[0, 20]'
          >Signout</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model='leftDrawerOpen'
      show-if-above
      bordered
      content-class='bg-grey-2'
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item
          clickable
          tag='a'
          target='_blank'
          href='https://quasar.dev'
        >
          <q-item-section avatar>
            <q-icon name='school' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag='a'
          target='_blank'
          href='https://github.quasar.dev'
        >
          <q-item-section avatar>
            <q-icon name='code' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag='a'
          target='_blank'
          href='https://chat.quasar.dev'
        >
          <q-item-section avatar>
            <q-icon name='chat' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag='a'
          target='_blank'
          href='https://forum.quasar.dev'
        >
          <q-item-section avatar>
            <q-icon name='record_voice_over' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag='a'
          target='_blank'
          href='https://twitter.quasar.dev'
        >
          <q-item-section avatar>
            <q-icon name='rss_feed' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag='a'
          target='_blank'
          href='https://facebook.quasar.dev'
        >
          <q-item-section avatar>
            <q-icon name='public' />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer
      side="right"
      overlay
      bordered
      elevated
      v-model="playerList"
      v-show="authenticated"
      :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null"
      :content-style="{ fontSize: '16px' }"
    >
      <q-toolbar
        inset
        class="bg-info text-white shadow-2"
      >
        <q-btn
          flat
          dense
        >
          <q-icon name="mdi-account-search" />
        </q-btn>
        <q-toolbar-title>Players:</q-toolbar-title>
      </q-toolbar>

      <q-list bordered>
        <q-item
          v-for="p in players"
          :key="p.id"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              color="secondary"
              text-color="white"
            >
              <img :src="p.avatar" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ p.username }}</q-item-label>
            <q-item-label
              caption
              lines="1"
            >@{{ p.tId }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon
              name="chat_bubble"
              color="green"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :user='user'></router-view>
    </q-page-container>

    <q-footer
      elevated
      v-if='authenticated'
    >
      <q-toolbar class='bg-primary text-white rounded-borders'>
        <q-btn
          round
          dense
          flat
          icon='menu'
          class='q-mr-xs'
        />
        <q-avatar class='gt-xs'>
          <img :src='user.avatar' />
        </q-avatar>
        <q-space />
        <div class='full-width'>
          <q-input
            dark
            autofocus
            standout
            v-model='chat'
            @keypress='onChat'
          >
            <template v-slot:append>
              <q-icon
                v-if="chat === ''"
                name='chat'
              />
              <q-icon
                v-else
                name='clear'
                class='cursor-pointer'
                @click="chat = ''"
              />
            </template>
          </q-input>
        </div>
        <q-btn
          flat
          round
          dense
          icon='menu'
          @click='right = !right'
          aria-label='Toggle menu on right side'
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapActions } from 'vuex'
import { userService, chatService, playerService, tableService } from 'src/api'
import auth from 'src/auth'

export default {
  name: 'index',
  components: {},
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      playerList: this.$q.platform.is.desktop,
      splitterModel: 50, // start at 50%
      page: '',
      chats: [],
      chat: null,
      user: null
    }
  },
  computed: {
    ...mapState('jstore', ['chatTo', 'players', 'tables']),
    authenticated () {
      return this.user != null
    }
  },
  methods: {
    ...mapActions('jstore', ['setUser', 'setChats', 'setPlayer', 'setTable', 'setPlayers', 'setTables']),
    openURL,
    goTo (route) {
      if (this.$route.name !== route) this.$router.push({ name: route })
    },
    signout () {
      auth
        .signout()
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'You are now logged out, sign in again to continue to play'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Cannot logout, please check again in a few minutes'
          })
        })
    },
    onServices () {
      userService.on('update', user => {
        this.user = user
      })
      chatService.on('created', chat => {
        // this.chats.unshift(chat)
        this.setChats(chat)
      })
      playerService.find().then(response => {
        this.setPlayers(response.data)
      })
      playerService.on('created', player => {
        this.onPlayer(player)
      })
      playerService.on('patched', player => {
        console.log('player patched', player)
        this.onPlayer(player)
      })
      playerService.on('removed', player => {
        console.log('player removed', player)
        player.state = -1
        this.onPlayer(player)
      })
      tableService.find().then(response => {
        this.setTables(response.data)
        // this.setTables(response.data)
        // let player = players.find(p => p.id === this.user._id)
        // this.updatePlayer(player)
      })
      tableService.on('created', table => {
        this.onTable(table)
      })
      tableService.on('patched', table => {
        this.onTable(table)
      })
      tableService.on('removed', table => {
        console.log('remove', table)
        table.state = -1
        this.onTable(table)
      })
    },
    onChat (event) {
      if (event.key === 'Enter') {
        this.send()
      }
    },
    onPlayer (player) {
      this.setPlayer(player)
    },
    onTable (table) {
      this.setTable(table)
    },
    send () {
      if (this.chat) {
        let _chat = {
          from: {
            userId: this.user._id,
            avatar: this.user.avatar
          },
          to: this.chatTo || '#Lobby',
          text: this.chat
        }

        chatService.create(_chat)
          .then(() => {
            this.chat = ''
          })
      }
    }
  },
  mounted () {
    // Check if there is already a session running
    auth
      .login()
      .then(user => {
        this.$q.notify({
          type: 'positive',
          message: 'Restoring previous session'
        })
      })
      .catch(_ => {
        this.goTo('home')
      })

    // On successful login
    auth.onAuthenticated(user => {
      this.user = user
      this.onServices()
      this.goTo('lobby')
    })

    // On logout
    auth.onLogout(() => {
      this.user = null
      this.goTo('home')
    })
  },
  beforeDestroy () { }
}
</script>
