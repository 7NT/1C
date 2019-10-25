<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
// import router from '../router'

export default {
  name: 'Profile',
  data () {
    return {
      user: null
    }
  },
  created () {
    this.user = this.$router.user
    console.log('profile', this.$router)
  }
}
</script>
