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
          @click="goTo('chat')"
          v-show='authenticated'
        >
          <q-icon name='chat' />
          <q-tooltip
            anchor='bottom middle'
            self='top middle'
            :offset='[0, 20]'
          >Chat</q-tooltip>
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

    <q-footer
      elevated
      v-if='authenticated'
    >
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

    <q-page-container>
      <router-view :user='user'></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import api from 'src/api'
import auth from 'src/auth'

export default {
  name: 'index',
  components: {},
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      page: '',
      user: null,
      chats: [],
      chat: ''
    }
  },
  computed: {
    ...mapState('jstore', ['chatTo', 'players']),
    authenticated () {
      return this.user != null
    }
  },
  methods: {
    ...mapActions('jstore', ['setUser']),
    openURL,
    goTo (route) {
      this.$router.push({ name: route })
    },
    signout () {
      auth
        .signout()
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'You are now logged out, sign in again to continue to work'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Cannot logout, please check again in a few minutes'
          })
        })
    },
    setUser (user) {
      this.$data.user = user
      // this.$store.commit("jstore/setUser", user);
      // this.setUser(user);
    },
    onChat (event) {
      if (event.key === 'Enter') {
        this.send()
      }
    },
    send () {
      if (this.$data.chat) {
        let _chat = {
          from: {
            userId: this.user._id,
            avatar: this.user.avatar
          },
          to: this.chatTo || '#Lobby',
          text: this.$data.chat
        }
        api
          .service('chats')
          .create(_chat)
          .then(() => {
            this.$data.chat = ''
          })
      }
    },
    isSent (chat) {
      return chat.from.userId === this.user._id
    },
    chatDate (chat) {
      return moment(chat.createdAt).format('MMM Do, hh:mm:ss')
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
      console.log('onAuthenticated', user)
      this.user = user
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
