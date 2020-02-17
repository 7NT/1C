<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        v-for='chat in chats'
        :key='chat.id'
        :text='[chat.text]'
        :avatar='chat.from.avatar'
        :stamp='chatDate(chat)'
        :sent='isSent(chat) ? true : false'
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'myChat',
  data () {
    return {
      chats: [],
      chat: ''
    }
  },
  methods: {
    isSent (chat) {
      return chat.from.userId === this.user._id
    },
    chatDate (chat) {
      return moment(chat.createdAt).format('MMM Do, hh:mm:ss')
    }
  }
}
</script>
