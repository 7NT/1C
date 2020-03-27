<template>
  <div id='playBox' class='column items-center'>
    <div class='col self-center' style='margin-left:-15px'>
      <img class='card responsive' :src='cardN2S(0)' />
    </div>
    <div class='col'>
      <div class='row justify-between'>
        <div class='justify-start' style='margin-top:-25px'>
          <img class='card responsive' :src='cardN2S(3)' />
        </div>
        <div class='justify-end' style='margin-top:-45px'>
          <img class='card responsive' :src='cardN2S(1)' />
        </div>
      </div>
    </div>
    <div class='col self-center' style='margin-top:-60px;margin-right:-15px'>
      <img class='card responsive' :src='cardN2S(2)' />
    </div>
  </div>
</template>

<script>
export default {
  name: 'myPlayBox',
  props: ['card4'],
  data () {
    return {
      cards: [null, null, null, null]
    }
  },
  methods: {
    cardN2S (n) {
      let c = this.card4[n]
      if (c) return `../statics/cards/${c}.svg`
      else return '../statics/cards/Blue_Back.svg'
    }
  }
}
</script>

<style>
  #playBox {
    width: 160px;
    height: 160px;
    margin: auto;
  }
  div {
    border: 1px;
  }
  img.card {
    max-width: 50px;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: initial;
    box-sizing: initial;
  }
</style>
