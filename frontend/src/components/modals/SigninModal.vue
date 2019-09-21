<template>
    <div class="signin-core animated" id="loginModal">
        <v-layout column justify-center align-center class="login-form-layout">
            <v-flex  xs10 sm10 md10 lg10 xlg10 class="close-flex"><v-icon class="pa-3 close" @click="$store.commit('hideModal', {modalId:'loginModal',top: '-400px'})">fas fa-times</v-icon></v-flex>
            <v-flex xs10 sm10 md10 lg10 xlg10 class="password-forgot-flex">
                <div class="return-cotainer pl-3"><v-icon class="" large @click="backToLogin()">fas fa-angle-left</v-icon></div>
                <p class="pass-recovery-msg animated">{{passwordRcoveryMsg}}</p>
                <v-form class="pass-recovery-form">
                    <v-text-field
                      label="Email"
                      placeholder=" "
                      outlined
                      :rules='emailRules'
                      v-model="passwordRecoveryEmail"
                      class="password-email animated"
                    ></v-text-field>
                    <div class="submit-container"><v-btn depressed medium height="50" color="#FFCC80" class="white--text" @click="passwordRecover() ">Envoyer</v-btn></div>
                </v-form>
            </v-flex>

            <v-flex xs10 sm10 md10 lg10 xlg10 class="login-form-flex animated">
                <!-- <div class="return-cotainer pl-3" v-if="passwordForgot"><v-icon class="" large @click="backToLogin()">fas fa-angle-left</v-icon></div> -->
                <h3 class="login-head animated" @click="$store.commit('hideModal', {modalId:'loginModal',top: '-400px'})">Connectez-vous ou <router-link to="/signup" style="color: #2962FF;font-size: 15px; cursor: pointer;">Creer un compte</router-link></h3>
                <v-divider style="width:50%;" class="mb-5"></v-divider>
                <v-form class="login-form">
                    <v-text-field
                      label="Email"
                      placeholder=" "
                      outlined
                      :rules="emailRules"
                      v-model="email"
                      class="login-email animated"
                    ></v-text-field>

                    <v-text-field
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        name="input-10-2"
                        placeholder=" "
                        label="Mot de passe"
                        hint="8 carateres minimal"
                        value=""
                        outlined
                        v-model="password"
                        class="input-group--focused login-password animated"
                        @click:append="show = !show"
                    ></v-text-field>

                    <div class="password-forgot-container">
                        <p @click="forgotPassword()">Mot de passe oublie?</p>
                        <v-btn depressed medium height="50" color="#FFCC80" class="white--text">Connection</v-btn>
                    </div>
                </v-form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    
    name: 'signinModal',

    data(){
        return{

            passwordForgot: false,
            show: false,
            password: 'Password',
            rules: {
                required: value => !!value || 'Champs obligatoires',
                min: v => v.length >= 8 || '8 carateres minimal',
                emailMatch: () => ("L'email et le mot de passe que vous avez entrés ne correspondent pas")
            },
            emailRules: [
                v => !!v || 'E-mail est requis',
                v => /.+@.+/.test(v) || "L'email doit être valide",
             ],
            passwordRecoveryEmail: '',
            email: '',
            password: '',
            passwordRcoveryMsg: 'Entrez votre email'

        }
    },

    created(){

    },

    methods: {

        forgotPassword(){
            
            let self = this
            let loginFlex = document.querySelector('.login-form-flex')
            loginFlex.classList.add('zoomOut')

            let passwordforget = document.querySelector('.password-forgot-flex')

            setTimeout(function(){
                loginFlex.style.display = 'none'
                passwordforget.style.display = 'flex'
                passwordforget.classList.add('zoomUp')
                loginFlex.classList.remove('zoomOut')
            }, 400)
    
        },

        backToLogin(){
            let self = this

            let passwordforget = document.querySelector('.password-forgot-flex')
            passwordforget.classList.remove('zoomUp')

            passwordforget.classList.add('zoomOut')
            passwordforget.style.display = 'none'

            let loginFlex = document.querySelector('.login-form-flex')
            loginFlex.style.display = 'flex'
            loginFlex.classList.add('zoomIn')

            setTimeout(function(){
                loginFlex.classList.remove('zoomIn')
            }, 400)
        },

    }

}
</script>

<style scoped>
    
    .signin-core{
        width: 50%;
        height: auto;
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

    .login-form-layout{
        width: 100%;
    }

    .close-flex{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .close-flex .close{
        cursor: pointer;
        font-size: 20px;
    }

    .close-flex .close:hover{
        transform: scale(1.1,1.1);
        color: red;
    }

    .password-forgot-flex{
        width: 100%;
        height: auto;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 30px;
        padding-bottom: 30px;
        z-index: 10;
    }

    .return-cotainer{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        bottom: 30px;
    }

    .pass-recovery-form{
        width: 80%;
        height: auto;
    }

    .pass-recovery-msg{
        font-size: 16px;
        text-align: center;
    }

    .submit-container{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: -20px;
    }

    .submit-container .v-btn{
        padding: 0px;
        min-width: 0px;
        height: 50px;
        text-transform: capitalize;
        font-size: 17px;
        font-weight: bold;
        margin: 0px;
    }

    .login-form-flex{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 30px;
        padding-bottom: 30px;
        z-index: 10;
    }

    .login-form{
        width: 80%;
        height: auto;
    }

    .password-forgot-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .password-forgot-container p{
        color: #2962FF;
        font-size: 15px;
        text-align: left;
        cursor: pointer;
    }

    .password-forgot-container .v-btn{
        padding: 0px;
        min-width: 0px;
        height: 50px;
        text-transform: capitalize;
        font-size: 17px;
        font-weight: bold;
        margin: 0px;
    }

    .password-email{
        /* border: 1px solid red; */
    }

    @media only screen and (max-width: 500px){
        .signin-core{
            width: 100%;
            right: 0%;
        }
    }

</style>