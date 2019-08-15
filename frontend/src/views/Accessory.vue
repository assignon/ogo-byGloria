<template>
    <div class="accessory-core">
        
        <v-layout row wrap justify-center align-center class="product-container">
            <v-flex xs11 sm5 md3 lg3 class="product-flex animated zoomIn" v-for="(accessory, i) in accessoryArr" :key="i" :style="{animationDelay: i/10+'s'}">
                <div class="product">
                  <div class="product-src" :style="{backgroundImage: `url(${$store.state.MEDIA_ROOT}/${accessory.fields.product_image})`}" @mouseover="$store.commit('displayIcons')" @mouseout="$store.commit('hideIcons')">
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
                  <p class="mt-2">{{accessory.fields.product_name}}</p>
                  <p class="font-weight-bold">{{accessory.fields.product_price}},00€</p>
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
            accessoryArr: []
        }
    },

    created() {
      
        this.getAccessories()
        console.log(this.accessoryArr);
        
    },

    methods: {

    getAccessories() {

      let self = this
      this.$axios.get(`${this.$store.state.HOST}/product/accessories/`, {

      }).then(response => {

        if(self.accessoryArr.length === 0){
          response.data.forEach(bag => {
            self.accessoryArr.push(bag)
          });
        }

      }).catch(error => {
        console.log(error);
      })

    },

  }
}
</script>

<style scoped rel="stylesheet" type="text/css" src="../styles/productLayout.css"></style>
<style scoped>
.accessory-core {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 400px;
}
</style>