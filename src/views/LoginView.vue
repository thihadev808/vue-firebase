<template>
  <div class="login">
    <h1 class="u-font_dance">take a memo</h1>
    <form @submit.prevent="login">
      <input
        type="email"
        placeholder="tarou@gmail.com"
        v-model="loginForm.email"
        required
      />
      <input
        type="password"
        placeholder="password"
        v-model="loginForm.password"
        required
      />
      <input type="submit" value="ログイン" />
    </form>
    <router-link to="/register">新規アカウント作成</router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "LoginView",
  setup() {
    const store = useStore();

    const loginForm = ref({});

    const login = () => {
      store.dispatch("login", loginForm.value);
    };

    return {
      loginForm,
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/foundation" as *;

h1 {
  font-size: 52px;
  font-weight: 400;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  form {
    width: 100%;
    margin-top: 20px;
    @include mq(small) {
      max-width: 400px;
      margin: 20px auto 0;
    }
    input {
      display: block;
      width: 100%;
      outline: none;
      color: #fff;
      font-size: 16px;
      font-family: $font-en;
      &:not([type="submit"]) {
        margin-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #fff;
      }
      &[type="submit"] {
        background: $color-primary;
        border-radius: 30px;
        font-size: 18px;
        width: 160px;
        margin: 30px auto 0;
        padding: 6px 0 9px;
        transition: 0.32s $ease-02;
        @include mq(small) {
          &:hover {
            background: #fff;
            color: $color-primary;
          }
        }
      }
    }
  }
  a {
    margin-top: 14px;
    font-size: 16px;
    color: #fff;
    text-decoration: underline;
  }
}
</style>