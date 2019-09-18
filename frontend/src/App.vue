<template>
  <v-app id="app" app>
      
    <v-content>

      <SigninModal/>
      <CartContent v-if="$store.state.cartContent.length != 0"/>
      <Nav/>
      <router-view class="animated fadeIn"></router-view>
      <Footer/>

    </v-content>

  </v-app>
</template>

<script>
import Nav from './components/layouts/Nav';
import Footer from './components/layouts/Footer';
import SigninModal from './components/modals/SigninModal';
import CartContent from './components/modals/CartContent';

export default {

  name: 'App',

  components: {
    Nav,
    Footer,
    SigninModal,
    CartContent,
  },

  data: () => ({
    
  }),

  created (){
   
    if(!this.$session.has('auth')){
      this.$session.set('auth', false)
    }
    this.$store.state.AUTHENTICATED = this.$session.get('auth')
    
  },
  
  methods: {

  }
  
};
</script>

<style scoped>

#app{
  margin: 0px;
  padding: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
