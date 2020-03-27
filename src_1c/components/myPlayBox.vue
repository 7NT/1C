<template>
<<<<<<< HEAD
  <div id="playBox">
    <img
      id="playCard1"
      class="card"
      :src="cardImg(1)"
      :style="zIndex(1)"
    />
    <img
      id="playCard4"
      class="card"
      :src="cardImg(4)"
      :style="zIndex(4)"
    />
    <img
      id="playCard2"
      class="card"
      :src="cardImg(2)"
      :style="zIndex(2)"
    />
    <img
      id="playCard3"
      class="card"
      :src="cardImg(3)"
      :style="zIndex(3)"
    />
  </div>
</template>

<script>
// import jb from "src/jb";

export default {
  name: 'myPlayBox',
  props: ['card4', 'seatX'],
  data () {
    return {}
  },
  methods: {
    cardImg (n) {
      let x = this.seatX[n - 1]
      let c = this.card4.filter(c => c.sId === x)[0] || null
      if (c) return `../statics/cards/${c.card.rank + c.card.suit}.svg`
      else return null
    },
    zIndex (n) {
      let z = 100
      let x = this.seatX[n - 1]
      console.log(this.card4)
      for (n in this.card4) {
        if (this.card4[n].sId === x) break
        z++
      }
      return `z-index:${z}`
    }
  },
  /*
  watch: {
    seatX() {
      console.log("seatX changed", this.card4, this.seatX);
    },
    card4() {
      console.log("card4 changed", this.card4, this.seatX);
    }
  },
  */
  created () {
    // console.log("card4x", this.card4, this.seatX);
    // this.updateCards();
  }
}
</script>

<style scoped>
#playBox {
  position: relative;
  width: 120px;
  height: 160px;
  margin: auto;
  overflow: visible;
}
#playCard1 {
  position: absolute;
  top: 0px;
  left: 30px;
}
#playCard2 {
  position: absolute;
  top: 30px;
  left: 60px;
}
#playCard3 {
  position: absolute;
  bottom: 30px;
  left: 40px;
}
#playCard4 {
  position: absolute;
  top: 40px;
  left: 0px;
}
img.card {
  max-height: 76px;
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
