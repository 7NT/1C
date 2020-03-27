<template>
  <q-page padding>
    <!-- content -->
    <q-card>
      <Q-card-title>
        Profile:
      </Q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-list>
          <q-list-header>email: {{myUser.email}}</q-list-header>
          <q-item>
            <q-item-side>
              <q-item-tile avatar>
                <img :src="myUser.avatar" />
              </q-item-tile>
            </q-item-side>
            <q-item>
              <q-item-main>
                <!--
                <q-item-tile label>Username: {{myUser.username}}</q-item-tile>
                <q-item-tile subtitle>Country: {{myUser.country}}</q-item-tile>
                -->
                <q-input v-model="myUser.username" stack-label="Username" />
                <q-select v-model="myUser.country" float-label="Country" :options="countryList" />
              </q-item-main>
            </q-item>
          </q-item>
        </q-list>
      </q-card-main>
      <q-card-separator />
      <q-card-actions align='end'>
        <q-btn push icon='update' label='Update' @click='update' />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import api from 'src/api'

export default {
  name: 'Profile',

  data () {
    return {
      countryList: [
        { label: 'China', value: 'cn' },
        { label: 'United States', value: 'us' }
      ]
    }
  },
  computed: {
    ...mapState('jstore', ['myUser'])
  },
  methods: {
    update () {
      api.service('users').patch(this.myUser._id, this.myUser)
      this.$router.go(-1)
    }
  },
  mounted () {
    // const _players = api.service('players')
  }
}
</script>

<style>
</style>
