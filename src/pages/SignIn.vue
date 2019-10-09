<template>
  <q-page class="flex flex-center">
    <q-dialog
      v-model="show"
      persistent
    >
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Sign In:</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="email"
            filled
            type="email"
            hint="Email"
          />

          <q-input
            v-model="password"
            filled
            :type="isPwd ? 'password' : 'text'"
            hint="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <a
            class="button button-primary block"
            href="http://localhost:3030/oauth/google"
          >Google</a>
          <a
            class="button button-primary block"
            href="http://localhost:3030/oauth/facebook"
          >Facebook</a>
          <q-btn
            flat
            label="Sign In"
            v-close-popup
            @click="signin('')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import auth from 'src/auth'

export default {
  data () {
    return {
      show: true,
      email: null,
      password: '',
      isPwd: true
    }
  },
  computed: {
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    },
    onHide () {
      // Workaround needed because of timing issues (sequencing of 'hide' and 'ok' events) ...
      setTimeout(() => {
        this.goHome()
      }, 50)
    },
    signin (data) {
      console.log('signin', data)
    },
    isRegistration () {
      return this.$route.name === 'register'
    },
    register (email, password) {
      return auth.register(email, password)
    },
    login (email, password) {
      return auth.login(email, password)
    }
  },
  mounted () {
    this.title = this.isRegistration() ? 'Register' : 'Sign In'
  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">
</style>
