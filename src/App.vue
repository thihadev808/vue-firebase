<template>
  <Header v-if="$store.state.user" class="side" />
  <router-view class="main" :class="{ beforeLogin: !$store.state.user }" />
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

import Header from "./components/layout/Header.vue";

export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("checkUser");
    });
  },
};
</script>

<style lang="scss">
@use "./styles/foundation" as *;

#app {
  background: rgb(22, 20, 20);
  color: #fff;
  min-height: 100vh;
  @include mq(small) {
    display: flex;
  }
}

h1 {
  position: relative;
  font-size: 26px;
  span {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    text-decoration: underline;
  }
}

.side,
.main {
  position: relative;
  height: 100%;
  @include mq(small) {
    min-height: 100vh;
  }
}

.side {
  border-right: 1px solid #fff;
  @include mq(small) {
    padding-top: 40px;
    width: 15vw;
  }
}

div.main {
  padding: 60px 30px 40px 30px;
  @include mq(small) {
    padding-top: 30px;
    width: 85vw;
    &.beforeLogin {
      width: 100%;
    }
  }
}

.modal-leave-active,
.modal-enter-active {
  transition: opacity 0.32s $ease-01;
  transition-property: opacity, visibility;
  visibility: visible;
  position: fixed;
  z-index: 9999;
  @include mq(medium) {
    transition: none;
  }
}
.modal-leave-to,
.modal-enter-from {
  opacity: 0;
  visibility: hidden;
}
</style>
