<template>
    <div class="bag-core">
        
        <v-layout row wrap justify-center align-center class="product-container">
            <v-flex xs11 sm5 md3 lg3 class="product-flex animated zoomIn" v-for="(bag, i) in bagsArr" :key="i" :style="{animationDelay: i/10+'s'}">
                <div class="product">
                  <div class="product-src" :style="{backgroundImage: `url(${$store.state.MEDIA_ROOT}/${bag.fields.product_image})`}" @mouseover="displayIcons()" @mouseout="hideIcons()">
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
                  <p class="mt-2">{{bag.fields.product_name}}</p>
                  <p class="font-weight-bold">{{bag.fields.product_price}},00€</p>
                </div>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
export default {
    name: 'bag',

    data() {
        return{
            bagsArr: []
        }
    },

    created() {

        this.getBags()
        console.log(this.bagsArr);
        

    },

    methods: {

        getBags() {

            let self = this
            this.$axios.get(`${this.$store.state.HOST}/product/bags/`, {

            }).then(response => {

                if(self.bagsArr.length === 0){
                    response.data.forEach(bag => {
                        self.bagsArr.push(bag)
                    });
                }

            }).catch(error => {
                console.log(error);
                
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
.bag-core {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 400px;
}
</style>