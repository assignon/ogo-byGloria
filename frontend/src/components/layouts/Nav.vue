<template>
    <div class="navbar">

        <v-layout column justify-center align-center class="nav-layout">
            <v-flex xs12 sm12 m12 lg12 class="social-flex">
                <!-- <div class="socials-cotainer">
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-facebook</v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-instagram</v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-twitter</v-icon></a>
                </div> -->
                <div class="sign ml-3 mr-3 mt-3">
                    <router-link to="/signup" style="text-decoration: none;"><p class="signup pl-4 pr-4 pt-1 pb-1 mr-2 font-weight-bold">
                        S'INSCRIR
                    </p></router-link>
                    <p class="signin pl-4 pr-4 pt-1 pb-1 font-weight-bold" @click="$store.commit('showModal', 'loginModal')">SE CONNECTER</p>
                    <a href="" class="social-link ma-2 pl-3" style="text-decoration: none" target="_blank"><v-icon medium class="social-icon">fab fa-instagram</v-icon></a>
                    <!-- <v-btn medium depressed color="#FfCC80" class="signup mr-3">S'INSCRIRE</v-btn>
                    <v-btn medium  outlined  color="" class="signin">SE CONECTER</v-btn> -->
                </div>
            </v-flex>

            <v-flex xs12 sm12 m12 lg12 class="logo-flex">
                <h1 class="display-2 font-weight-bold" style="color: #FB8C00;font-style: italic;">Ogo By Gloria</h1>
                <div class="shopping-container cart-badget animated" @click="showCart()">
                    <v-badge overlap color="#FFA726" class="shopping-badge">
                        <template v-slot:badge>{{$store.state.numberOfProduct}}</template>
                        <v-icon large style="color: #FfCC80;">fas fa-shopping-basket</v-icon>
                    </v-badge>
                </div>
            </v-flex>

            <v-flex xs12 sm12 m12 lg12 class="menu-flex">
                <router-link to="/" style="text-decoration: none;">
                    <div class="menu-item">
                        <span>Accueille</span>
                        <v-icon medium
                        style=""
                        class="">home</v-icon>
                    </div>
                </router-link>
                <router-link to="/bag" style="text-decoration: none;">
                    <div class="menu-item">
                        <span>Sacs</span>
                        <v-icon
                        style="font-size: 18px;"
                        class="">fas fa-shopping-bag</v-icon>
                    </div>
                </router-link>
                <router-link to="/accessory" style="text-decoration: none;">
                    <div class="menu-item">
                        <span>Accessoires</span>
                        <v-icon 
                        style="font-size: 18px;"
                        class=""></v-icon>
                    </div>
                </router-link>
                <router-link to="/about" style="text-decoration: none;">
                    <div class="menu-item">
                        <span>A propos</span>
                        <v-icon 
                        style="font-size: 18px;"
                        class="">fas fa-address-card</v-icon>
                    </div>
                </router-link>
                <router-link to="/contact" style="text-decoration: none;">
                    <div class="menu-item">
                        <span>Contact</span>
                        <v-icon
                        style="font-size: 18px;"
                        class="">fas fa-envelope</v-icon>
                    </div>
                </router-link>
            </v-flex>
        </v-layout>

        <v-layout row justify-space-around align-center style="z-index: 10;" class="scroll-nav-layout animated">
            <v-flex sm2 m2 lg2 class="logo-flex">
                <h1 class="font-weight-bold" style="color: #FB8C00;font-style: italic;">Ogo By Gloria</h1>
            </v-flex>

            <v-flex sm6 m6 lg6 class="menu-flex">
                    <router-link to="/" style="text-decoration: none;">
                        <div class="menu-item">
                            <span>Accueille</span>
                            <v-icon medium
                            style=""
                            class="">home</v-icon>
                        </div>
                    </router-link>

                    <router-link to="/bag" style="text-decoration: none;">
                        <div class="menu-item">
                            <span>Sacs</span>
                            <v-icon
                            style="font-size: 18px;"
                            class="">fas fa-shopping-bag</v-icon>
                        </div>
                    </router-link>

                    <router-link to="/accessory" style="text-decoration: none;">
                        <div class="menu-item">
                            <span>Accessoires</span>
                            <v-icon 
                            style="font-size: 18px;"
                            class=""></v-icon>
                        </div>
                    </router-link>

                    <router-link to="/about" style="text-decoration: none;">
                        <div class="menu-item">
                            <span>A propos</span>
                            <v-icon 
                            style="font-size: 18px;"
                            class="">fas fa-address-card</v-icon>
                        </div>
                    </router-link>

                    <router-link to="/contact" style="text-decoration: none;">
                        <div class="menu-item">
                            <span>Contact</span>
                            <v-icon
                            style="font-size: 18px;"
                            class="">fas fa-envelope</v-icon>
                        </div>
                    </router-link>
            </v-flex>

            <v-flex sm4 md3 ld3 xl3 class="sign-flex">
                    <router-link to="/signup" style="text-decoration: none;"><p class="signup pl-4 pr-4 pt-1 pb-1 font-weight-bold">
                        S'INSCRIR
                    </p></router-link>
                    <p class="signin pl-4 pr-4 pt-1 pb-1 font-weight-bold" @click="$store.commit('showModal', 'loginModal')">SE CONNECTER</p>
                    <div class="shopping-container cart-badget-seconde animated" style="margin-left: 0px;">
                        <v-badge overlap color="#FFA726" class="shopping-badge">
                            <template v-slot:badge>{{$store.state.numberOfProduct}}</template>
                            <v-icon large style="color: #FfCC80;">fas fa-shopping-basket</v-icon>
                        </v-badge>
                    </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    
    name:"navbar",

    data () {
        return {
            activeBtn: 0,
            siteColor: '#FfCC80',
            secondaryNav: false
        }
    },

    created() {
        
        window.addEventListener('scroll', this.menuScrollAnimation)
        this.productNumber()
        
    },

    methods: {

        menuScrollAnimation(){
            let scrollValue = document.documentElement.scrollTop
            let scrollNavLayout = document.querySelector('.scroll-nav-layout')
            if(scrollValue >= 100){
                scrollNavLayout.style.transition = 'opacity 0.5s linear 0.1s'
                scrollNavLayout.style.opacity = scrollValue/150
                scrollNavLayout.classList.add('slideInDown')
            }else if(scrollValue < 100){
                scrollNavLayout.style.opacity = '0'
            }
        },

        // get in the db the count of the products added to the cart 
        productNumber(){
            let self = this
            
            this.$axios.get(`${this.$store.state.HOST}/cart/cart_count/`,{
                params: {
                    shoppingSession: self.$session.get('shoppingSession') //shoppingsession / userId change to real userId when the user is logged
                }
            })
            .then(response => {
                this.$store.state.numberOfProduct = response.data
            }).catch(error => {
                console.log(error);
            })
        },

        async showCart(){
            await this.$store.commit('fetchCartContent', this.$session.get('shoppingSession'))
            this.$store.commit('showModal', 'cartModal')
        }

    }
}
</script>

<style scoped>

.navbar{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

.nav-layout{
    width: 100%;
}

.social-flex{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 30px;
}

.socials-cotainer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: auto;
}

.socials-cotainer a{
    width: 20px;
    height: 30px;
    text-decoration: none;
}


.socials-cotainer a .social-icon:hover{
    color: #FfCC80;
}

.nav-layout .logo-flex{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.scroll-nav-layout .logo-flex{
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
}

.sign{
    width: auto;
    /* height: auto; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.sign .signup, .sign-flex .signup{
    border: 1px solid #FfCC80;
    border-radius: 50px;
    text-align: center;
    color: white;
    background-color: #FfCC80;
    font-size: 15px;
    margin: auto;
    cursor: pointer;
}

.sign .signin, .sign-flex .signin{
    border: 1px solid #FfCC80;
    border-radius: 50px;
    text-align: center;
    color: #FfCC80;
    background-color: #fff;
    font-size: 15px;
    margin: auto;
    cursor: pointer;
}

.sign .signup:hover, .sign-flex .signup:hover{
    transform: scale(0.9,0.9);
}

.sign .signin:hover, .sign-flex .signin:hover{
    transform: scale(0.9,0.9);
}

.sign-flex{
    /* width: 100%; */
    /* height: auto; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.shopping-container{
    width: auto;
    height: auto;
    display: flex;
    justify-content: center; 
    align-items: center;
    cursor: pointer;
    margin-left: 50px;
}

.shopping-container .shopping-badge{
    /* border: 2px solid red; */
    /* border-radius: 100%;
    color: white;
    font-size: 15px;
    text-align: center;
    width: 20px;
    height: 20px;
    /* padding: 10px; */
    /* background-color: #FfCC80; */ 
}

.nav-layout .menu-flex{
    /* width: 100%; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.scroll-nav-layout .menu-flex{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.menu-item{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px
}

.menu-item .v-icon{
    color: #7d7d7d;
}

.menu-flex .menu-item span{
    font-size: 15px;
    color: #7D7D7D;
    text-align: center;
    position: relative;
    left: 5px;
    font-weight: bold;
}

.menu-flex .menu-item:hover span{
    color: #FfCC80;
}

.menu-flex .menu-item:hover .v-icon{
    color: #FfCC80;
}

.scroll-nav-layout{
    width: 100%;
    height: 70px;
    position: fixed;
    background-color: white;
    top: 0px;
    right: 12px;
    z-index: 3;
    opacity: 0;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
    
</style>