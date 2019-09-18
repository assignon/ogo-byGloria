<template>
    <div class="cart-content-core" id="cartModal">
        <v-layout column justify-center align-center class="cart-content-layout">
            <v-flex xs12 sm12 md12 lg12 xl12 class="cart-header-flex mb-5">
                <div class="cart-title mt-5 mb-4">
                    <h3 class="font-weight-bold mt-5 animated fadeInUp">Votre panier</h3>
                    <v-divider style="width:60%"></v-divider>
                </div>
                <div class="close-cart" @click="$store.commit('hideModal', 'cartModal'), $store.state.cartContent.length = 0"><v-icon small>fas fa-times</v-icon></div>
            </v-flex>

            <v-flex xs12 sm12 md12 lg12 xl12 class="cart-content-flex">
                <div class="cart-content-container" v-for="(product, i) in $store.state.cartContent" :key="i">
                    <div class="cart-content animated bounceIn" :style="{animationDelay: `${i*200}`}">
                        <div class="tables" style="width: 10%;"><div class="product-img animated zoomIn" :style="{backgroundImage: `url(${$store.state.HOST}${product.fields.image})`}"></div></div>
                        <div class="tables" style="width: 40%;"><p style="" class="mt-5 font-weight-bold">{{product.fields.name}}</p></div>
                        <div class="tables" style="width: 15%;"><ProductQtyCtrl :productQty=product.fields.quantity /></div>
                        <div class="tables" style="width: 15%;"><p class="font-weight-bold mt-5">€{{product.fields.price*product.fields.quantity}}</p></div>
                        <div class="tables" style="width: 10%;"><v-icon small>fas fa-times</v-icon></div>
                    </div>
                    <v-divider style="width:80%"></v-divider>
                </div>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 class="">
                <h3></h3>
            </v-flex>

            <v-flex xs12 sm12 md12 lg12 xl12 class="cart-footer-flex">
                <router-link to="/purchase" style="text-decoration: none;"><v-btn depressed medium>Passez a la caisse</v-btn></router-link>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import ProductQtyCtrl from '../../components/layouts/ProductQtyCtrl';
export default {
    name: 'cartContent',

    components: {
        'ProductQtyCtrl': ProductQtyCtrl
    },

    data() {
        return {

        }
    },

    created() {

    },

    methods:{

    }
}
</script>

<style scoped>
    
.cart-content-core{
    width: 60%;
    height: auto;
    max-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    position: fixed;
    margin: auto;
    right: 25%;
    top: -400px;
    z-index: 6;
}

.cart-content-layout{
    width: 100%;
    height: auto;
}

.cart-header-flex{
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.cart-title{
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cart-title h3{
    text-align: center;
    margin-left: 30px;
}

.close-cart{
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.close-cart:hover .v-icon{
    color: red;
    transform: scale(1.1,1.1);
}

.cart-content-flex{
    width: 100%;
    height: auto;
    max-height: 400px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cart-content-container{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cart-content{
    width: 95%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: auto;
}

.tables{
    width: 20%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
}

.product-img{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid blue;
}

.cart-footer-flex{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
}

.cart-footer-flex .v-btn{
    padding: 0px;
    min-width: 0px;
    height: 50px;
    text-transform: capitalize;
    font-size: 17px;
    font-weight: bold;
    margin: 0px;
}

</style>