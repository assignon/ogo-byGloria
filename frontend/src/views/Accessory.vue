<template>
    <div class="accessory-core">
        
        <v-layout row wrap justify-center align-center class="product-container">
            <v-flex xs11 sm5 md3 lg3 class="product-flex animated zoomIn" v-for="(accessory, i) in accessoryArr" :key="i" :style="{animationDelay: i/10+'s'}">
                <Product
                  :productImage =accessory.fields.product_image
                  :productName =accessory.fields.product_name
                  :productPrice =accessory.fields.product_price
                  :productId =accessory.pk
                />
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
import Product from '../components/layouts/Product';
export default {
    name: 'bag',

    components: {
      'Product': Product
    },

    data() {
        return{
            accessoryArr: []
        }
    },

    created() {
      
        this.getAccessories()
        console.log(this.accessoryArr);
        
    },

    mounted(){
        this.$store.commit('showMenus')
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
    min-height: 52vh;
    margin-bottom: 50px;
}
</style>