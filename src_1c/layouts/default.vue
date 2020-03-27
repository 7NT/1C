<template>
  <q-layout view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>

        <q-btn flat @click="goTo('signin')" v-show="!authenticated">
         Sign In
        </q-btn>
        <q-btn flat @click="goTo('register')" v-show="!authenticated">
          Register
        </q-btn>
        <q-btn flat round @click="goTo('home')" v-show="authenticated">
          <q-icon name="home" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Home</q-tooltip>
        </q-btn>
        <q-btn flat round @click="goTo('lobby')" v-show="authenticated">
          <q-icon name="chat" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Lobby</q-tooltip>
        </q-btn>
        <q-btn flat round @click="right = !right" v-show="authenticated">
          <q-icon name="people" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Players</q-tooltip>
        </q-btn>
        <q-btn flat round @click="goTo('profile')" v-show="authenticated">
          <q-icon name="assignment_ind" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Profile</q-tooltip>
        </q-btn>
        <q-btn flat round @click="signout" v-show="authenticated">
          <q-icon name="exit_to_app" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Signout</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-footer>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn flat round dense icon="menu" aria-label="left menu" />
        <q-toolbar-title>
          <q-input
            color="white"
            inverted-light
            class="fixed-bottom-center chat-message"
            style="z-index: 1001;"
            v-model="chat"
            v-on:keyup.enter="send"
            type="textarea"
            float-label="Enter your message"
            :min-rows="1"
          />
         </q-toolbar-title>
        <q-btn flat round dense icon="menu" @click="right = !right" aria-label="Toggle menu on right side" />
      </q-toolbar>
    </q-layout-footer>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-layout-drawer v-show="authenticated"
      side="right"
      v-model="right"
      :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null"
      :content-style="{fontSize: '16px'}"
    >
      <q-list-header>Player List:</q-list-header>
      <div style="padding: 25px 16px 16px;">
        <q-list highlight>
          <q-item v-for="p in players" :key="p.id">
            <q-item-side :avatar="p.avatar" />
            <q-item-main>
              <q-item-tile label>{{p.username}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile label>Table: #{{p.tId}}</q-item-tile>
              <q-item-tile icon="chat_bubble" color="green" />
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </q-layout-drawer>

    <q-page-container>
      <router-view :myUser="myUser"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import api from 'src/api'
import auth from 'src/auth'

export default {
  name: 'index',
  components: {},
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      right: this.$q.platform.is.desktop,
      myUser: null,
      myRoom: 'Lobby',
      chat: ''
      // chats: []
    }
  },
  computed: {
    authenticated () {
      return this.$data.myUser !== null
    },
    chats: {
      get () { return this.$store.state.jstore.chats },
      set (val) { this.$store.commit('jstore/setChats', val) }
    },
    ...mapState('jstore', ['chatTo', 'players'])
    // ...mapGetters({})
  },
  methods: {
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
      this.$data.myUser = user
      this.$store.commit('jstore/setUser', user)
    },
    send () {
      if (this.$data.chat) {
        let message = {
          from: {
            userId: this.myUser._id,
            avatar: this.myUser.avatar
          },
          to: this.chatTo || '#Lobby',
          text: this.$data.chat
        }
        api.service('chats').create(message).then(() => {
          this.$data.chat = ''
        })
      }
    }
  },
  mounted () {
    // Check if there is already a session running
    auth
      .authenticate()
      .then(user => {
        this.setUser(user)
        this.$q.notify({
          type: 'positive',
          message: 'Restoring previous session'
        })
      })
      .catch(_ => {
        this.setUser(null)
        this.$router.push({ name: 'home' })
      })

    // On successful login
    auth.onAuthenticated(user => {
      this.setUser(user)
      if (user.username) {
        this.$router.push({ name: 'lobby', params: { myUser: user } })
      } else {
        this.$router.push({ name: 'profile', params: { myUser: user } })
      }
    })

    // On logout
    auth.onLogout(() => {
      this.setUser(null)
      this.$router.push({ name: 'home' })
    })

    const _chats = api.service('chats')
    // Get all users and messages
    // Add new messages to the message list
    _chats.on('created', chat => {
      // this.$data.chats.unshift(chat)
      this.chats = chat
    })
  },
  beforeDestroy () {}
}
</script>

<style>
</style>
