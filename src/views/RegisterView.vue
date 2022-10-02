<template>
  <div class="register">
    <router-link to="/login">&lt; 戻る</router-link>
    <form @submit.prevent="register">
      <input
        type="email"
        placeholder="tarou@gmail.com"
        v-model="registerForm.email"
      />
      <input
        type="password"
        placeholder="password"
        v-model="registerForm.password"
      />
      <input type="submit" value="登録" />
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "RegisterView",
  setup() {
    const registerForm = ref({});
    const store = useStore();

    const register = () => {
      store.dispatch("register", registerForm.value);
    };

    return {
      registerForm,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/foundation" as *;

h1 {
  font-size: 26px;
  font-weight: 400;
}

.register {
  position: relative;
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
        border: 1px solid $color-primary;
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
    position: absolute;
    left: 30px;
    top: 30px;
    font-size: 16px;
    color: #fff;
  }
}
</style>