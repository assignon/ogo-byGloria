<template>
    <div>

        <div class="add-more">
            <v-btn id="minus" depressed color="#FFCC80" @click="productQuantity('-'), updateQty()"><v-icon small color="white" class="minus-product">fas fa-minus</v-icon></v-btn>
            <p class="quantity">{{productQty}}</p>
            <v-btn id="plus" depressed small  color="#FFCC80" @click="productQuantity('+'), updateQty()"><v-icon small color="white">fas fa-plus</v-icon></v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props:['productQty'],

    data(){
        return{
            // productQty: 1
        }
    },

    created(){

    },

    methods: {

         productQuantity(qty){
            if(this.productQty >= 1){
                if(qty == '+'){
                    this.productQty += 1
                    this.$store.state.productQtyValue = this.productQty
                }else if(qty == '-'){
                    if(this.productQty > 1){
                        this.productQty -= 1
                        this.$store.state.productQtyValue = this.productQty
                    }
                }
            }else{
                this.productQty = 1
                this.$store.state.productQtyValue = this.productQty
            }
        },

        updateQty(){
             this.$emit('updateProductQty')
        }

    }
}
</script>

<style scoped>

.add-more{
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.add-more #plus, .add-more #minus{
    width: 30px;
    padding: 0px;
    min-width: 0;
    height: 30px;
    border-radius: 0px;
}

.add-more  .quantity{
    width: auto;
    padding: 10px;
    height: 30px;
    text-align: center;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    border: 1px solid #FFCC80;
}

.add-more .v-btn .v-icon{
}
    
</style>