<template>
    <div class="navbar">
        <v-layout column justify-center align-center class="nav-layout">
            <v-flex xs12 sm12 m12 lg12 class="social-flex">
                <div class="socials-cotainer">
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class=""></v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class=""></v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class=""></v-icon></a>
                </div>
            </v-flex>

            <v-flex xs12 sm12 m12 lg12 class="logo-flex">
                <h1 class="display-2 font-weight-bold">Ogo By Gloria</h1>
                <v-btn rounded depressed flat :ripple="false"><v-icon style="border: 1px solid black"></v-icon></v-btn>
            </v-flex>

            <v-flex xs12 sm12 m12 lg12 class="menu-flex">
                <v-bottom-navigation
                 :value="activeBtn"
                 color="deep-purple"
                 style="box-shadow: none;"
                 class="btm-nav"
                 horizontal>
                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Accueille</span>
                            <v-icon
                            style="border: 1px solid black"
                            class=""></v-icon>
                        </v-btn>
                    </router-link>

                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Sacs</span>
                            <v-icon
                            style="border: 1px solid black"
                            class=""></v-icon>
                        </v-btn>
                    </router-link>

                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Accessoires</span>
                            <v-icon
                            style="border: 1px solid black"
                            class=""></v-icon>
                        </v-btn>
                    </router-link>

                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Contact</span>
                            <v-icon
                            style="border: 1px solid black"
                            class=""></v-icon>
                        </v-btn>
                    </router-link>

                    <router-link to="" style="text-decoration: none;">
                        <v-btn :ripple="false" depressed>
                            <span>Connection</span>
                            <v-icon
                            style="border: 1px solid black"
                            class=""></v-icon>
                        </v-btn>
                    </router-link>
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
            activeBtn: 0
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
    border: 1px solid red; 
}

.nav-layout{
    width: 100%;
}

.social-flex{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
}

.socials-cotainer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: auto;
}

.socials-cotainer a{
    width: 30px;
    height: 30px;
    text-decoration: noe;
    border: 1px solid red;
}

.logo-flex{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 70px;
    margin-bottom: 20px;
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
    
</style>