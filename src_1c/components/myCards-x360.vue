<template>
  <div class='hand hhand-compact active-hand'>
    <img v-for='(c, i) of cards' :key='`${i}`' class='card responsive' :src='cardN2S(c)' @click='play(0)' />
  </div>
</template>

<script>
export default {
  name: 'myCards',
  props: ['cards'],
  data () {
    return {}
  },
  methods: {
    cardN2S (n) {
      let c = this.getN(n) + this.getSuit(n)
      console.log(n, c)
      return `../statics/cards/${c}.svg`
    },
    getN (n) {
      let _n = n % 13
      switch (_n) {
        case 1: return 'A'
        case 0: return 'K'
        case 12: return 'Q'
        case 11: return 'J'
        default: return _n
      }
    },
    getSuit (n) {
      let _n = Math.floor(n / 13)
      console.log(n, _n)
      switch (_n) {
        case 3: return 'S'
        case 2: return 'H'
        case 1: return 'D'
        case 0: return 'C'
        default: return ''
      }
    },
    play (c) {
      console.log('play', c)
    }
  },
  created () {
    console.log(this.cards)
  }
}
</script>

<style>
  img.card {
    max-width: 50px;
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
    margin: 0;
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
    margin-left: -52px;
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
