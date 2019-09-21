<template>
    <div class="bag-core">
        
        <v-layout row wrap justify-center align-center class="product-container">
            <v-flex xs11 sm5 md3 lg3 class="product-flex animated zoomIn" v-for="(bag, i) in bagsArr" :key="i" :style="{animationDelay: i/10+'s'}">
                <Product
                  :productImage =bag.fields.product_image
                  :productName =bag.fields.product_name
                  :productPrice =bag.fields.product_price
                  :productId =bag.pk
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
            bagsArr: []
        }
    },

    created() {

        this.getBags()
        console.log(this.bagsArr);
        

    },

    mounted(){
        this.$store.commit('showMenus')
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
    min-height: 52vh;
    margin-bottom: 50px;
}

@media only screen and (max-width: 800px){
    .bag-core{
        margin-top: 50px;
    }
}
</style>