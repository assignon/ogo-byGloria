<template>
    <div class="cart-content-core animated" id="cartModal">
        <v-layout column justify-center align-center class="cart-content-layout" v-if="$store.state.cartContent.length != 0">
            <v-flex xs12 sm12 md12 lg12 xl12 class="cart-header-flex mb-5">
                <div class="cart-title mb-3">
                    <h3 class="font-weight-bold animated fadeInUp">Votre panier</h3>
                    <v-divider style="width:60%"></v-divider>
                </div>
                <div class="close-cart" @click="$store.commit('hideModal', {modalId:'cartModal',top: '-550px'}), $store.state.cartContent.length = 0, $store.state.productSum.length = 0"><v-icon small>fas fa-times</v-icon></div>
            </v-flex>

            <v-flex xs12 sm12 md12 lg12 xl12 class="cart-content-flex">
                <div class="cart-content-container animated" v-for="(product, i) in $store.state.cartContent" :key="i">
                    <div class="cart-content animated bounceIn" :style="{animationDelay: `${i*200}`}">
                        <div class="img-name">
                            <div class="tables" style="width: 15%;"><div class="product-img animated zoomIn" :style="{backgroundImage: `url(${$store.state.MEDIA_ROOT}/${product.fields.image})`}"></div></div>
                            <div class="tables" style="width: 70%;"><p style="" class="mt-5 font-weight-bold">{{product.fields.name}}</p></div>
                        </div>
                        <div class="tables" style="width: 10%;"><p style="" class="mt-5 font-weight-bold">€{{product.fields.price}}</p></div>
                        <div class="tables" style="width: 20%;"><ProductQtyCtrl :productQty=product.fields.quantity /></div>
                        <div class="tables mr-5" style="width: 20%;justify-content: flex-end;"><p class="font-weight-bold mt-5">€{{product.fields.price*product.fields.quantity}}</p></div>
                        <div class="tables" style="width: 10%;" :id="product.pk" @click="delProduct()"><v-icon class="del-product" small>fas fa-times</v-icon></div>
                    </div>
                    <v-divider style="width:80%"></v-divider>
                </div>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl12 class="total-flex mt-1 mb-5">
                <h4>Total:</h4>
                <h3 class="total-price font-weight-bold pl-2 animated">€{{$store.state.productTotal}}</h3>
            </v-flex>

            <v-flex xs12 sm12 md12 lg12 xl12 class="cart-footer-flex pt-3 pb-3">
                <router-link to="/order" style="text-decoration: none;" class=""><v-btn depressed medium height="40" color="#FFCC80" @click="$store.commit('hideModal', {modalId:'cartModal',top: '-550px'})">Commander</v-btn></router-link>
            </v-flex>
        </v-layout>

        <v-layout column justify-center align-center class="cart-content-layout" v-else>
            <v-flex xs12 sm12 md12 lg12 xl12 class="cart-header-flex mb-5">
                <div class="cart-title mb-3">
                    <h3 class="font-weight-bold animated fadeInUp">Votre panier</h3>
                    <v-divider style="width:60%"></v-divider>
                </div>
                <div class="close-cart" @click="$store.commit('hideModal', {modalId:'cartModal',top: '-550px'})"><v-icon small>fas fa-times</v-icon></div>
            </v-flex>

            <div class="cart-empty"><h3 class="font-weight-bold animated fadeInUp">Votre panier est vide pour l'instant</h3></div>
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
             cartcontent: true //false ? cart is empty : cart is't empty
        }
    },

    created() {

    },

    methods:{

        delProduct(){
            let self = this
            let product = event.currentTarget.parentNode.parentNode
            let productId = event.currentTarget.id
            let produtPrie = event.currentTarget.parentNode.childNodes[4].childNodes[0].textContent //return the prive with €
            let getPrice = produtPrie.slice(1, produtPrie.length) //return the price without the getPrice €
            let totalPrice = document.querySelector('.total-price')

            product.classList.add('bounceOutLeft')
            totalPrice.classList.add('rubberBand')
            this.$store.state.productTotal = this.$store.state.productTotal - getPrice
            setTimeout(function(){
                product.style.display = 'none'
                totalPrice.classList.remove('rubberBand')
            }, 700)

            if(this.$store.state.productTotal == 0){
                self.$store.state.cartContent.length = 0
            }

            //remove in db
            this.$axios.get(`${this.$store.state.HOST}/cart/remove_to_cart/`, {
                params: {
                    productId: productId,
                    userId: self.$session.get('shoppingSession')
                }
            }).then(response => {
                self.$store.state.numberOfProduct -= 1
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })

        }

    }
}
</script>

<style scoped>
    
.cart-content-core{
    width: 55%;
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
    right: 20%;
    top: -550px;
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
    padding-top: 70px;
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
    position: relative;
    bottom: 10px;
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
    overflow-x: hidden;
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

.img-name{
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}

.img-name .tables{
    /* width: 50%; */
    /* height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: auto; */
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
}

.total-flex{
    width: 75%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.del-product{
    cursor: pointer;
}

.del-product:hover{
    color: red;
}

.total-flex h3{
    /* color: #FFA726; */
}

.total-flex h4{
    /* color: #FFA726; */
}

.cart-footer-flex{
    width: 90%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
}

.cart-footer-flex .v-btn{
    text-transform: capitalize;
    font-size: 17px;
    font-weight: bold;
    color: white;
}

.cart-empty{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

@media only screen and (max-width: 500px){
     .cart-content-core{
        width: 100%;
        right: 0px;
    }

   .img-name{
        flex-direction: column;
        width: 40%;
        align-items: center;
    }
}

</style>