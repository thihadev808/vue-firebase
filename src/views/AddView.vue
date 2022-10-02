<template>
  <div class="add">
    <h1 class="u-font_dance">add new book</h1>
    <form class="form" @submit.prevent="add">
      <div class="form_flex">
        <div class="formItem">
          <label for="title">タイトル</label>
          <input
            name="title"
            type="text"
            placeholder="例 : ねじまき鳥クロニクル"
            v-model="addForm.title"
          />
        </div>
        <div class="formItem">
          <label for="author">作家</label>
          <input
            name="author"
            type="text"
            placeholder="例 : 村上 春樹"
            v-model="addForm.author"
          />
        </div>
      </div>
      <div class="formItem">
        <label for="url">URL</label>
        <input
          name="url"
          type="text"
          placeholder="例 : https://en.wikipedia.org/wiki/The_Wind-Up_Bird_Chronicle"
          v-model="addForm.url"
        />
      </div>
      <div class="formItem">
        <label for="rating">評価</label>
        <select name="rating" v-model="addForm.rating">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div class="formItem">
        <label for="read_date">読了日</label>
        <input
          name="read_date"
          type="date"
          placeholder="2022/10/02"
          v-model="addForm.read_date"
        />
      </div>
      <div class="formItem">
        <label for="comment">コメント</label>
        <textarea
          name="comment"
          type="text"
          placeholder="コメント"
          v-model="addForm.comment"
        />
      </div>
      <a
        @click.prevent="add"
        class="addBtn"
        :class="{ inactive: !addForm.active }"
        >追加</a
      >
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AddView",
  setup() {
    // 日付入れてない場合は今日にする
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    const addForm = ref({
      url: "",
      read_date: yyyy + "-" + mm + "-" + dd,
      rating: 1,
      active: false,
    });

    const store = useStore();
    const router = useRouter();

    const add = async () => {
      await store.dispatch("addBook", addForm.value);
      router.push("/");
    };

    watch(addForm.value, (val) => {
      if (val.title && val.author && val.comment) {
        val.active = true;
      } else {
        val.active = false;
      }
    });

    return {
      addForm,
      add,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/foundation" as *;

h1 {
  font-size: 40px;
}

.form {
  @include mq(small) {
    .form_flex {
      display: flex;
      justify-content: space-between;
      .formItem {
        width: calc(50% - 20px);
      }
    }
  }
  .formItem {
    margin-top: 30px;
    label {
      font-size: 16px;
    }
    input,
    textarea {
      color: #fff;
      margin-top: 10px;
      display: block;
      width: 100%;
      font-size: 16px;
      outline: none;
      padding: 5px 10px;
      background: rgba(#fff, 0.1);
      &::placeholder {
        color: rgba(#fff, 0.4);
      }
    }
    input {
      border-bottom: 1px solid #fff;
    }
    textarea {
      width: 100%;
      min-height: 200px;
      max-height: 420px;
      position: relative;
      z-index: 10;
    }
    select {
      color: #fff;
      margin-top: 6px;
      display: block;
      width: 50px;
      outline: none;
      padding: 5px 10px;
      background: rgba(#fff, 0.1);
      option {
        display: block;
        font-size: 16px;
        color: #000;
      }
    }
  }
  .addBtn {
    @include flex-center();
    cursor: pointer;
    font-size: 20px;
    margin: 40px 30px 0 auto;
    width: 100px;
    padding: 6px 0 9px;
    border-radius: 30px;
    border: 1px solid $color-primary;
    background: $color-primary;
    color: #fff;
    transition: 0.4s $ease-01;
    &:hover {
      background: #fff;
      color: $color-primary;
    }
    &.inactive {
      pointer-events: none;
      background: #fff;
      color: #000;
      opacity: 0.2;
    }
  }
}
</style>