<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user: null
    }
  },
  created () {
    console.log('home', this.$router)
    this.user = this.$router.user
  }
}
</script>
