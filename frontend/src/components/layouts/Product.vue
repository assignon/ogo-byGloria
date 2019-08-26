<template>
     <div class="product">
        <div class="product-src" :style="{backgroundImage: `url(${$store.state.MEDIA_ROOT}/${productImage})`}" @mouseover="displayIcons()" @mouseout="hideIcons()">
          <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
              <div v-on="on" :id="productId" class="icon-container animated"><v-icon>fas fa-cart-plus</v-icon></div>
            </template>
            <span>Ajouter au panier</span>
          </v-tooltip>

          <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
             <div v-on="on" :id="productId" @click="$router.push(`/product/${productId}`), $store.commit('productDescription', $route.params.id), $store.commit('relatedProduct', $route.params.id)" class="icon-container animated"><v-icon>fas fa-eye</v-icon></div>
            </template>
            <span>Apercu rapide</span>
          </v-tooltip>

          <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
              <div v-on="on" :id="productId" class="icon-container animated"><v-icon>fas fa-share-alt</v-icon></div>
            </template>
            <span>partager</span>
          </v-tooltip>

          <v-tooltip left color="#000">
            <template v-slot:activator="{ on }">
              <div v-on="on" :id="productId" class="icon-container animated"><v-icon>fas fa-heart</v-icon></div>
            </template>
            <span>Likes: </span>
          </v-tooltip>
          
        </div> 
        <p class="mt-2">{{productName}}</p>
        <p class="font-weight-bold">{{productPrice}},00€</p>
      </div>
</template>

<script>
export default {
    // name: prod,

    // props: {
    //     // productArr: Array,
    //     productImage: Object,
    //     productName: String,
    //     productPrice: String
    // },

    props: [
      'productImage',
      'productName',
      'productPrice',
      'productId'
    ],

    data() {
        return {

        }
    },

    created() {

    },

    methods: {

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


<style scoped>

.product {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.product .product-src {
    width: 100%;
    height: 400px;
    background-position: center;
    background-size: cover;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 100%;
    background-color: #fff;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    display: none;
}

.icon-container:hover .v-icon {
    transform: scale(1.1, 1.1);
    color: #FFCC80;
}

.product .product-src .v-icon {
    /* color: #FB8C00; */
    /* color: transparent; */
    font-size: 20px;
    text-align: center;
}

.product p {
    font-size: 16px;
    text-align: left;
    margin: 0px;
    color: black;
}

</style>