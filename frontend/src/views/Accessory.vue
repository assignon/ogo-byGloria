<template>
  <div class="accessory-core">
    <v-layout row wrap class="product-container">
      <v-flex
        xs6
        sm6
        md3
        lg3
        class="product-flex animated zoomIn"
        v-for="(accessory, i) in accessoryArr"
        :key="i"
        :style="{ animationDelay: i / 10 + 's' }"
      >
        <Product
          :productImage="accessory.fields.product_image"
          :productName="accessory.fields.product_name"
          :productPrice="accessory.fields.product_price"
          :productId="accessory.pk"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Product from "../components/layouts/Product";
export default {
  name: "bag",

  components: {
    Product: Product
  },

  data() {
    return {
      accessoryArr: []
    };
  },

  created() {
    this.getAccessories();
    console.log(this.accessoryArr);
  },

  mounted() {
    this.$store.commit("showMenus");
  },

  methods: {
    getAccessories() {
      let self = this;
      this.$axios
        .get(`${this.$store.state.HOST}/api/product/accessories/`, {})
        .then(response => {
          if (self.accessoryArr.length === 0) {
            response.data.forEach(bag => {
              self.accessoryArr.push(bag);
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style
  scoped
  rel="stylesheet"
  type="text/css"
  src="../styles/productLayout.css"
></style>
<style scoped>
.accessory-core {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 62vh;
  margin-bottom: 40px;
  margin-top: -40px;
}

.product-container {
  margin: auto;
  /*margin-top: 10px;*/
}

.product-flex {
  /*flex-direction: row;*/
  /*padding-left: 0px;*/
  /*margin-left: 10px;*/
  /*margin-right: 10px;*/
  /*margin-top: 20px;*/
  /*align-items: flex-start;*/
}

@media only screen and (max-width: 800px) {
  .accessory-core {
    margin-top: 100px;
  }

  .product-container{
    margin-top: 30px;
  }
}
</style>
