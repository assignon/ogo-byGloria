<template>
  <div id="notificationModal"class="animated">
    <v-layout row justify-around align-center class="notification-layout">
      <v-flex xs10 sm10 md10 lg10 xlg10 class="close-flex"
        ><v-icon
          class="pa-3 close"
          @click="
            $store.commit('hideModal', { modalId: 'notificationModal', top: '-400px' })
          "
          >fas fa-times</v-icon
        ></v-flex
      >
      <v-flex xs11 sm11 md9 lg9 class="content-flex">
        <p>comming soon</p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: [],

  data() {
    return {};
  },

  created() {},

  methods() {}
};
</script>

<style scoped>
#notificationModal {
  width: 40%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  margin: auto;
  right: 5%;
  top: -400px;
  z-index: 6;
}

.notification-layout {
  width: 100%;
  height: auto;
}

.close-flex {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.close-flex .close {
  cursor: pointer;
  font-size: 20px;
}

.close-flex .close:hover {
  transform: scale(1.1, 1.1);
  color: red;
}

.content-flex {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-flex p {
  text-align: center;
  font-weight: bold;
  font-size: 17px;
}
</style>
