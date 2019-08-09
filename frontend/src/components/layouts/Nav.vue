<template>
    <div class="navbar">
        <v-layout column justify-center align-center class="nav-layout">
            <v-flex xs12 sm12 m12 lg12 class="social-flex">
                <div class="socials-cotainer">
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-facebook</v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-instagram</v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-twitter</v-icon></a>
                </div>
                <div class="sign ml-3 mr-3">
                    <p class="signup pl-4 pr-4 pt-1 pb-1 mr-2 font-weight-bold">
                        S'INSCRIR
                    </p>
                    <p class="signin pl-4 pr-4 pt-1 pb-1 font-weight-bold">SE CONNECTER</p>
                    <!-- <v-btn medium depressed color="#FfCC80" class="signup mr-3">S'INSCRIRE</v-btn>
                    <v-btn medium  outlined  color="" class="signin">SE CONECTER</v-btn> -->
                </div>
            </v-flex>

            <v-flex xs12 sm12 m12 lg12 class="logo-flex">
                <h1 class="display-2 font-weight-bold">Ogo By Gloria</h1>
                <div class="shopping-container">
                    <v-badge overlap color="#FFA726" class="shopping-badge">
                        <template v-slot:badge>0</template>
                        <v-icon large style="color: #FfCC80;">fas fa-shopping-basket</v-icon>
                    </v-badge>
                </div>
            </v-flex>

            <v-flex xs12 sm12 m12 lg12 class="menu-flex">
                <v-bottom-navigation :value="activeBtn"
                 color="#FfCC80"
                 style="box-shadow: none;color: #FfCC80; background-color: transparent"
                 class="btm-nav"
                 horizontal>
                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Accueille</span>
                            <v-icon medium
                            style=""
                            class="">home</v-icon>
                        </v-btn>
                    </router-link>

                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Sacs</span>
                            <v-icon
                            style="font-size: 20px;"
                            class="">fas fa-shopping-bag</v-icon>
                        </v-btn>
                    </router-link>

                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Accessoires</span>
                            <v-icon 
                            style="font-size: 20px;"
                            class=""></v-icon>
                        </v-btn>
                    </router-link>

                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Contact</span>
                            <v-icon
                            style="font-size: 20px;"
                            class="">fas fa-envelope</v-icon>
                        </v-btn>
                    </router-link>

                    <!-- <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <p>Profile</p>
                            <v-icon
                            style="border: 1px solid black"
                            class=""></v-icon>
                        </v-btn>
                    </router-link> -->
                 </v-bottom-navigation>
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
            siteColor: '#FfCC80'
        }
    },

    created() {

    },

    methods: {

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

.sign{
    width: auto;
    /* height: auto; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.logo-flex{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
}

.sign .signup{
    border: 1px solid #FfCC80;
    border-radius: 50px;
    text-align: center;
    color: white;
    background-color: #FfCC80;
    font-size: 15px;
    margin: auto;
    cursor: pointer;
}

.sign .signin{
    border: 1px solid #FfCC80;
    border-radius: 50px;
    text-align: center;
    color: #FfCC80;
    background-color: #fff;
    font-size: 15px;
    margin: auto;
    cursor: pointer;
}

.sign .signup:hover{
    transform: scale(0.9,0.9);
}

.sign .signin:hover{
    transform: scale(0.9,0.9);
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

.menu-flex{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-flex .btm-nav{
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-flex .btm-nav span{
    font-size: 16px;
    /* color: black; */
    text-align: center;
    position: relative;
    right: 10px;
}
    
</style>