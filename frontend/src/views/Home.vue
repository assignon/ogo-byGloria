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

    <!-- <Product v-for="(product, i) in this.$store.state.allProducts" :key="i"
      :productImage = productImage
      productName = product.fields.product_name
      productPrice = product.fields.product_price
    /> -->

  <v-layout row wrap justify-center align-center class="product-container">
    <v-flex xs12 sm6 md3 lg3 class="product-flex mt-5" v-for="(product, i) in this.$store.state.allProducts" :key="i">
      <div class="product">
        <div class="product-src" :style="{backgroundImage: `url(${$store.state.MEDIA_ROOT}/${product.fields.product_image})`}" @mouseover="displayIcons()" @mouseout="hideIcons()">
          <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
              <div v-on="on" class="icon-container animated"><v-icon>fas fa-cart-plus</v-icon></div>
            </template>
            <span>Ajouter au panier</span>
          </v-tooltip>

          <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
              <div v-on="on"  class="icon-container animated"><v-icon>fas fa-share-alt</v-icon></div>
            </template>
            <span>partager</span>
          </v-tooltip>

          <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
              <div v-on="on"  class="icon-container animated"><v-icon>fas fa-heart</v-icon></div>
            </template>
            <span>Likes: </span>
          </v-tooltip>

           <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
              <div v-on="on"  class="icon-container animated"><v-icon>fas fa-eye</v-icon></div>
            </template>
            <span>Apercu rapide</span>
          </v-tooltip>
          
        </div> 
        <p class="mt-2">{{product.fields.product_name}}</p>
        <p class="font-weight-bold">{{product.fields.product_price}},00€</p>
      </div>
    </v-flex>
  </v-layout>

  </div>

</template>

<script>
// import HelloWorld from '../components/HelloWorld';
import Product from '../components/layouts/Product';

export default {

  components: {
    'Product': Product
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

      let self = this
      this.$axios.get(`${this.$store.state.HOST}/product/all_products/`, {

      }).then(response => {

        if(self.$store.state.allProducts.length === 0){
          response.data.forEach(product => {
            self.$store.commit('storeproducts', product)
          });
        }
  
      }).catch(err => {
        console.log(err)
      })

    },

    displayIcons() {

      let currentProduct = event.currentTarget.children
      let iconContainer = document.querySelectorAll('.icon-container')
      
      for(let i=0; i<currentProduct.length; i++){
        currentProduct[i].style.display = 'flex'
        currentProduct[i].classList.remove('bounceOut')
        currentProduct[i].classList.add('bounceIn')
        currentProduct[i].style.animationDelay = `${i/20}s`
      }

    },

    hideIcons (){

      let currentProduct = event.currentTarget.children
      
      for(let i=0; i<currentProduct.length; i++){
        currentProduct[i].classList.remove('bounceIn')
        currentProduct[i].classList.add('bounceOut')
        currentProduct[i].style.animationDelay = `${i/100}s`
      }

      
    }

  }

}
</script>

<style scoped rel="stylesheet" type="text/css" src="../styles/productLayout.css"></style>
<style scoped>

.home-core{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  z-index: 1;
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
