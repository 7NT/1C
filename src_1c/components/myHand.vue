<template>
<<<<<<< HEAD
  <div class="row items-end">
    <div class="column">
      <div class="row self-end no-wrap">
        <q-card
          flat
          v-if="isVisible"
          class="transparent"
        >
          <div class="hand hhand-compact active-hand full-width">
            <img
              v-for="(c, i) of myCards"
              :key="`${i}`"
              :src="cardImg(c)"
              @click="onPlay(c)"
              class="card"
            />
          </div>
        </q-card>
      </div>
      <div class="myplayer">
        <q-btn-group flat>
          <q-btn
            push
            no-caps
            ellipsis
            @click="onSit"
            :label="uname"
            :color="ucolor"
            :icon="flag"
            align="between"
            class="playerbar"
          >
            <q-icon
              :name="playerBut"
              :class="uclass"
            />
          </q-btn>
          <q-btn-dropdown
            split
            v-if="isDeclarer"
            :label="contract"
            color="info"
          >
            <q-list dense>
              <q-item
                clickable
                v-close-menu
                @click="onClaim"
              >
                <q-item-section>
                  <q-item-label label>Claim All</q-item-label>
                  <q-item-label label>Concede All</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import myCards from "src/components/myCards";
// import jb from "src/jb";

export default {
  name: 'myHand',
  props: ['seatX', 'myPlayer', 'myTable'],
  data () {
    return {
      user: null,
      uname: '[SIT...]',
      myCards: []
    }
  },
  components: {
    // myCards
  },
  computed: {
    ...mapGetters('jstore', ['getPlayerById']),

    isVisible () {
      if (this.isDummy) return true
      else return this.seatX === this.myPlayer.sId
    },
    uId () {
      return this.myTable.seats[this.seatX - 1]
    },
    ucolor () {
      if (this.myTable.turn === this.seatX) return 'warning'
      else return this.myPlayer ? 'secondary' : 'positive'
    },
    uclass () {
      return 'rotate-' + (this.seatX - 1) * 90
    },
    flag () {
      return 'us'
    },
    playerBut () {
      return 'navigation'
    },
    isDeclarer () {
      try {
        return this.myTable.bid.info.by === this.seatX
      } catch (_) {
        // console.log(err);
      }
      return false
    },
    isDummy () {
      try {
        if (this.myTable.play.data.length > 0) {
          return (this.myTable.bid.info.by + 2) % 4 === this.seatX % 4
        }
      } catch (_) {
        // console.log(err);
      }
      return false
    },
    contract () {
      return this.myTable.bid.info.contract
    },
    playedCards () {
      try {
        return this.myTable.play.data.map(x => x.card)
      } catch (_) {
        return []
      }
    }
  },
  methods: {
    // ...mapActions("jstore", ["addUser"]),
    onSit () {
      let seat = {
        action: 'sit',
        uId: this.uId,
        sId: this.seatX
      }
      this.$emit('onAction', seat)
    },
    onPlay (n) {
      if (this.isMyPlay()) {
        if (this.cardCheck(n)) {
          this.$emit('onAction', {
            action: 'play',
            play: {
              uId: this.uId,
              sId: this.seatX,
              card: n
            }
          })
          this.updateCards()
        } else {
          this.$q.notify({
            type: 'positive',
            message: 'invalid card...'
          })
        }
      } else {
        console.log('play', 'not your turn')
      }
    },
    cardImg (n52) {
      if (!n52.suit) console.log('error', n52)
      return `../statics/cards/${n52.rank + n52.suit}.svg`
    },
    updatePlayer () {
      if (this.uId) {
        let u = this.getPlayerById(this.uId)
        this.user = u
      }
    },
    updateCards () {
      try {
        let playCards = this.myTable.board.cards[this.seatX - 1]
        let _played = this.playedCards.map(x => x.value)
        if (_played.length) { playCards = playCards.filter(c => !_played.includes(c.value)) }

        this.$data.myCards = playCards
      } catch (err) {
        console.log(err)
        this.$data.myCards = []
      }
    },
    cardCheck (play) {
      let lead = this.myTable.play.info.lead
      if (!lead) return true
      else {
        if (lead.card.suit === play.suit) {
          return true
        } else {
          let _suit = this.$data.myCards.filter(c => c.suit === lead.card.suit)
          console.log(lead.card.suit, _suit)
          return _suit.length === 0
        }
      }
    },
    onClaim () {
      console.log('onClaim')
    },
    isMyPlay () {
      return this.myTable.state === 2 ? this.isMyTurn() : false
    },
    isMyTurn () {
      if (this.myTable.turn === this.seatX) {
        if (this.isDummy) return this.myPlayer.sId === this.myTable.bid.info.by
        else return true
      }
      return false
    }
  },
  watch: {
    user (u) {
      if (u) {
        if (u.state < 0) {
          this.uname = '[' + u.username + ']'
        } else {
          this.uname = u.username
        }
      } else this.uname = '[SIT...]'
      this.$forceUpdate()
    },
    seatX () {
      this.updateCards()
    }
  },
  created () {
    this.updatePlayer()
    this.updateCards()
  }
}
</script>

<style scoped>
.playerbar {
  min-width: 175px;
  height: 32px;
  text-overflow: ellipsis;
}
img.card {
  max-width: 70px;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: initial;
  box-sizing: initial;
}
/*
* A hand is a div containing cards.
*/
.hand {
  padding: 0;
  margin-bottom: 0;
}

.active-hand img.card {
  cursor: pointer;
}

/*
* A horizontal hand, class="hand hhand".  The enitire card is visible.
*/
.hhand {
  display: inline-block;
}
.hhand img.card {
  padding-top: 10px;
}

.hhand.active-hand img.card:hover {
  padding-top: 0px;
  padding-bottom: 10px;
}

/*
* A vertical hand, class="hand vhand".  The enitire card is visible.
*/
.vhand {
  display: block;
}
.vhand img.card {
  padding-right: 10px;
}
.vhand.active-hand img.card:hover {
  padding-right: 0px;
  padding-left: 10px;
}

/*
* A compact horizontal hand.  Only the last card is entirely visible.
*/
.hhand-compact {
  display: inline-block;
}
.hhand-compact img.card:first-child {
  margin-left: 0px;
  padding-top: 10px;
}
.hhand-compact img.card {
  margin-left: -55px;
  margin-bottom: -40px;
  padding-top: 10px;
}
.hhand-compact.active-hand img.card:hover {
  padding-top: 0px;
  padding-bottom: 10px;
}

/*
* A compact vertical hand.  Only the last card is entirely visible.
*/
.vhand-compact {
  display: inline-block;
  vertical-align: top;
}
.vhand-compact img.card:first-child {
  display: block;
  margin-top: 0px;
  padding-right: 10px;
}
.vhand-compact img.card {
  display: block;
  margin-top: -80px;
  padding-right: 10px;
}
.vhand-compact.active-hand img.card:hover,
.active-hand .vhand-compact img.card:hover {
  display: block;
  padding-right: 0px;
  padding-left: 10px;
}

/*
* A fanned hand.  Only the last card is entirely visible.
*/
.fan {
  display: inline-block;
  vertical-align: top;
  position: relative;
  padding-bottom: 1em;
}
.fan img.card {
  position: absolute;
  width: 90px;
}
</style>
=======
  <div>My component</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>
>>>>>>> 92ad6ba6c6f35c0f6ed8d6bf020c86f3dc8f1e3d
