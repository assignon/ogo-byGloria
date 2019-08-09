<template>

  <div class="home-core mt-5">

    <v-carousel cycle hide-delimiter-background hide-arrows-background show-arrows-on-hover interval=5000 height=500 class="home-slider">
      <v-carousel-item
        v-for="(img,i) in sliderImgs"
        :key="i"
       >
        <div
            :style="{backgroundImage: `url(${img.src})`}"
            class="home-slider-imgs"
        ><h3 class="font-weight-bold display-2 animated slideInUp" :style="{animationDelay:'0.2s'}">{{img.name}}</h3></div>
      </v-carousel-item>
  </v-carousel>

  <div class="products">

  </div>

  </div>

</template>

<script>
// import HelloWorld from '../components/HelloWorld';

export default {
  components: {
  },

  data() {

    return {

      sliderImgs: [

       {name: "Boucles d'oreilles en cauris", src: require('../assets/slider/prod1.jpeg')},
       {name: 'Pochette Hope', src: require('../assets/slider/prod2.jpeg')},
       {name: 'Pochette Inayah', src: require('../assets/slider/prod3.jpeg')},
       {name: 'Pochette Hilary', src: require('../assets/slider/prod4.jpeg')},
       {name: 'Pochette Hilary', src: require('../assets/slider/prod5.jpeg')}

      ]

    }

  },

  created(){
    this.getProducts()
  },

  methods: {

    getProducts() {

      this.$axios.get(`${this.$store.state.HOST}/product/products/`, {

      }).then(response => {
        console.log(response.data);
        
      }).catch(err => {
        console.log(err)
      })

    }

  }

};
</script>

<style scoped>

.home-core{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
}

.home-core .home-slider{
  width: 90%;
  border-radius: 5px;
}

.home-slider-imgs{
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.home-slider-imgs h3{
  text-align: left;
  color: #FfCC80;
  margin-left: 50px;
  margin-bottom: 50px;
}
  
</style>
