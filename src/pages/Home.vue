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
    this.$parent.page = 'Home'
    this.user = this.$router.user
  }
}
</script>
