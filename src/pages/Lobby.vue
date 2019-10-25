<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  name: 'Lobby',
  data () {
    return {
      user: null
    }
  },
  created () {
    this.user = this.$attrs.user
    console.log('lobby', this.user)
  }
}
</script>
