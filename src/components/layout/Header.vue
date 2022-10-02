<template>
  <header class="header" :class="{ active: $store.state.header }">
    <div class="header_hamburger" @click="toggleHamburger">
      <span class="hamburger_line -line01"></span>
      <span class="hamburger_line -line02"></span>
      <span class="hamburger_line -line03"></span>
    </div>
    <transition name="modal">
      <div class="header_modal" v-show="$store.state.header">
        <div class="header_bg"></div>
        <div class="header_inner">
          <router-link to="/">トップ</router-link>
          <router-link to="/add">本を追加する</router-link>
          <a class="logout" @click="logout">ログアウト</a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Header",
  setup() {
    const store = useStore();

    const toggleHamburger = () => {
      if (!store.state.header) store.commit("OPEN_HEADER");
      else store.commit("CLOSE_HEADER");
    };

    const logout = () => {
      store.dispatch("logout");
    };

    return {
      toggleHamburger,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../../styles/foundation" as *;

.header {
  @include mq(small) {
    height: 100vh;
    .header_modal {
      display: block !important;
      pointer-events: all !important;
    }
  }
  &.active {
    height: 100vh;
    .header_hamburger {
      width: 30px;
      .hamburger_line {
        height: 2px;
        top: 50% !important;
        &.-line01 {
          transform: rotate(45deg);
        }
        &.-line02 {
          opacity: 0;
        }
        &.-line03 {
          transform: rotate(-45deg);
        }
      }
    }
    .header_modal {
      pointer-events: all;
    }
  }
  .header_hamburger {
    margin: 0 auto;
    width: 24px;
    height: 17px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999;
    @include mq(small) {
      display: none;
    }
    .hamburger_line {
      display: block;
      width: 100%;
      height: 1px;
      background: #fff;
      position: absolute;
      &.-line01 {
        top: 0;
      }
      &.-line02 {
        top: 50%;
      }
      &.-line03 {
        top: 100%;
      }
    }
  }
  .header_modal {
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    @include mq(small) {
      position: static;
    }
    .header_inner {
      a {
        font-size: 20px;
      }
    }
  }
  a {
    cursor: pointer;
    display: block;
    text-align: center;
    font-weight: bold;
    color: #fff;
    transition: 0.4s $ease-01;
    &:hover {
      opacity: 0.8;
    }
    &:not(:first-child) {
      margin-top: 30px;
    }
    &.router-link-exact-active {
      color: $color-primary;
    }
    &.logout {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>