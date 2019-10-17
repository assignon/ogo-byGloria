<template>
    <v-navigation-drawer
              v-model="drawer"
              fixed
              top
              right
              height="100vh"
              width="45%"
              temporary
              class="cart-drawer"
    >
<!--        <div class="cart-content-core animated" id="cartModal">-->
            <v-layout align-center class="cart-content-layout" column justify-center v-if="$store.state.cartContent.length != 0">
                <v-flex class="cart-header-flex mb-5" lg12 md12 sm12 xl12 xs12>
                    <div class="cart-title mb-3">
                        <h3 class="font-weight-bold animated fadeInUp">Votre panier</h3>
                        <v-divider color="#000" style="width:10%;margin-left: 30px;"></v-divider>
                    </div>
                    <div
                            @click="!drawer,alert(),
                             $store.state.cartContent.length = 0,
                             $store.state.productSum.length = 0"
                            class="close-cart"
                    >
                        <v-icon small>fas fa-times</v-icon>
                    </div>
                </v-flex>

                <v-flex class="cart-content-flex" lg12 md12 sm12 xl12 xs12>
                    <div :key="i" class="cart-content-container animated" v-for="(product, i) in $store.state.cartContent">
                        <div :style="{animationDelay: `${i*200}`}" class="cart-content animated bounceIn">
                            <div class="img-name">
                                <div class="tables" style="width: 15%;">
                                    <div
                                            :style="{backgroundImage: `url(${$store.state.MEDIA_ROOT}/${product.fields.image})`}"
                                            class="product-img animated zoomIn"
                                    >
                                    </div>
                                </div>
                                <div class="tables" style="width: 70%;"><p class="mt-5 font-weight-bold" style="">
                                    {{product.fields.name}}</p></div>
                            </div>
                            <div class="tables" style="width: 10%;"><p class="mt-5 font-weight-bold" style="">
                                €{{product.fields.price}}</p></div>
                            <div class="tables" style="width: 20%;">
                                <ProductQtyCtrl
                                        :productQty=product.fields.quantity
                                        @updateProductQty="updateQty(product.fields.price, product.pk)"
                                />
                            </div>
                            <div class="tables mr-5" style="width: 20%;justify-content: flex-end;">
                                <p :id="product.pk" class="qty-price font-weight-bold mt-5">€{{product.fields.price*product.fields.quantity}}</p>
                            </div>
                            <div
                                    :id="product.pk"
                                    @click="delProduct(product.pk)"
                                    class="tables"
                                    style="width: 10%;"
                            >
                                <v-icon class="del-product" small>fas fa-times</v-icon>
                            </div>
                        </div>
                        <v-divider style="width:80%" color="#eee" class="mt-3 mb-3"></v-divider>

                    </div>
                </v-flex>
                <v-flex class="total-flex mt-1 mb-5" lg12 md12 sm12 xl12 xs12>
                    <h4>Total:</h4>
                    <h3 class="total-price font-weight-bold pl-2 animated">
                        <span>€</span>
                        <span class="products-total-price">{{$store.state.productTotal}}</span>
                    </h3>
                </v-flex>

                <v-flex class="cart-footer-flex pt-3 pb-3" lg12 md12 sm12 xl12 xs12>
                    <router-link
                            class=""
                            style="text-decoration: none;"
                            to="/order"
                    >
                        <v-btn
                                @click="$store.commit('hideModal', {modalId:'cartModal',top: '-550px'})"
                                color="#FFCC80"
                                depressed
                                height="40"
                                medium
                        >
                            Commander
                        </v-btn>
                    </router-link>
                </v-flex>
            </v-layout>

            <v-layout align-center class="cart-content-layout" column justify-center v-else>
                <v-flex class="cart-header-flex mb-5" lg12 md12 sm12 xl12 xs12>
                    <div class="cart-title mb-3">
                        <h3 class="font-weight-bold animated fadeInUp">Votre panier</h3>
                        <v-divider color="#000" style="width:10%;margin-left: 30px;"></v-divider>
                    </div>
                    <div
                            @click="$store.commit('hideModal', {modalId:'cartModal',top: '-550px'})"
                            class="close-cart"
                    >
                        <v-icon small>fas fa-times</v-icon>
                    </div>
                </v-flex>

                <div class="cart-empty">
                    <h3 class="font-weight-bold animated fadeInUp">
                        Votre panier est vide pour l'instant
                    </h3>
                </div>
            </v-layout>
<!--        </div>-->
    </v-navigation-drawer>
</template>

<script>
    import ProductQtyCtrl from '../../components/layouts/ProductQtyCtrl';

    export default {
        name: 'cartContent',

        props: ['drawer'],

        components: {
            'ProductQtyCtrl': ProductQtyCtrl
        },

        data() {
            return {
                cartcontent: true, //false ? cart is empty : cart is't empty
                group: null
                // drawer: false
                // newQty: 1
            }
        },

        watch: {
            group () {
                this.drawer = false
            },
        },

        created() {
            window.addEventListener('click', function(e){
                if(e.target.className != 'cart-drawer'){
                    // alert(e.target.className)
                }
            })
        },

        methods: {

            delProduct(id) {
                let self = this
                let product = event.currentTarget.parentNode.parentNode
                let productId = event.currentTarget.id
                let produtPrice = event.currentTarget.parentNode.childNodes[4].childNodes[0].textContent //return the prive with €
                let getPrice = produtPrice.slice(1, produtPrice.length) //return the price without €
                let totalPrice = document.querySelector('.total-price')
                let productstotalPrice = document.querySelector(".products-total-price")
                let qtyPrice = document.getElementById(id).textContent

                product.classList.add('bounceOutLeft')
                totalPrice.classList.add('rubberBand')
                productstotalPrice.textContent = parseInt(productstotalPrice.textContent) - parseInt(qtyPrice.slice(1, qtyPrice.length))
                setTimeout(function () {
                    product.style.display = 'none'
                    totalPrice.classList.remove('rubberBand')
                }, 700)

                if (productstotalPrice.textContent == 0) {
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

            },

            //update product qty in db
            updateQty(price, id) {
                let qty = event.currentTarget.parentNode.childNodes[1].textContent
                let qtyPrice = document.getElementById(id)
                let totalPrice = document.querySelector(".products-total-price") // get current total price html element

                let userid
                if(this.$session.get('auth')){
                  userid = this.$session.get('userId')
                }else{
                  userid = this.$session.get('shoppingSession')
                }

                if(event.currentTarget.id == 'plus'){
                    qty++
                    let newPrice = qty*price
                    qtyPrice.textContent = '€'+newPrice
                    totalPrice.textContent = parseInt(totalPrice.textContent) + price
                    this.$store.commit('updateCart', {newQty: qty, productId: id, userId: userid})
                }else{
                    if(qty > 1){
                        qty--
                        let newPrice = qty*price
                        qtyPrice.textContent = '€'+newPrice
                        totalPrice.textContent = parseInt(totalPrice.textContent) - price
                        this.$store.commit('updateCart', {newQty: qty, productId: id, userId: userid})
                    }
                }
            }

        }
    }
</script>

<style scoped>

    .cart-content-core {
        width: 100%;
        height: auto;
        /*max-height: 500px;*/
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        /*border-radius: 3px;*/
        /*box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);*/
        /*position: fixed;*/
        /*margin: auto;*/
        /*right: 20%;*/
        /*top: -550px;*/
        border: 1px solid blue;
        z-index: 10;
    }

    .cart-drawer{
        /*width: 100%;*/
        /* height: auto; */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        /*padding-left: 20px;*/
        top: 0px;
        z-index: 10;
        margin: 0px;
        padding: 0px;
    }

    .cart-content-layout {
        width: 570px;
        height: auto;
    }

    .cart-header-flex {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .cart-title {
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 50px;
    }

    .cart-title h3 {
        text-align: center;
        margin-left: 30px;
    }

    .close-cart {
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        bottom: 10px;
    }

    .close-cart:hover .v-icon {
        color: red;
        transform: scale(1.1, 1.1);
    }

    .cart-content-flex {
        width: 100%;
        height: auto;
        /*max-height: 400px;*/
        /*overflow-y: scroll;*/
        /*overflow-x: hidden;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .cart-content-container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .cart-content {
        width: 95%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: auto;

    }

    .img-name {
        width: 50%;
        height: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }

    .img-name .tables {
        /* width: 50%; */
        /* height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: auto; */
    }

    .tables {
        width: 20%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: auto;
    }

    .product-img {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 50px;
        height: 50px;
        border-radius: 3px;
    }

    .total-flex {
        width: 75%;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .del-product {
        cursor: pointer;
    }

    .del-product:hover {
        color: red;
    }

    .total-flex h3 {
        /* color: #FFA726; */
    }

    .total-flex h4 {
        /* color: #FFA726; */
    }

    .cart-footer-flex {
        width: 90%;
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .cart-footer-flex .v-btn {
        text-transform: capitalize;
        font-size: 17px;
        font-weight: bold;
        color: white;
    }

    .cart-empty {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    @media only screen and (max-width: 500px) {
        .cart-content-core {
            width: 100%;
            right: 0px;
        }

        .img-name {
            flex-direction: column;
            width: 40%;
            align-items: center;
        }
    }

</style>