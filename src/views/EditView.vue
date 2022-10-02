<template>
  <div class="edit">
    <h1 class="u-font_dance">edit</h1>
    <form class="form">
      <div class="form_flex">
        <div class="formItem">
          <label for="title">タイトル</label>
          <input
            name="title"
            type="text"
            placeholder="例 : ねじまき鳥クロニクル"
            v-model="editForm.title"
          />
        </div>
        <div class="formItem">
          <label for="author">作家</label>
          <input
            name="author"
            type="text"
            placeholder="例 : 村上 春樹"
            v-model="editForm.author"
          />
        </div>
      </div>
      <div class="formItem">
        <label for="url">URL</label>
        <input
          name="url"
          type="text"
          placeholder="例 : https://en.wikipedia.org/wiki/The_Wind-Up_Bird_Chronicle"
          v-model="editForm.url"
        />
      </div>
      <div class="formItem">
        <label for="rating">評価</label>
        <select name="rating" v-model="editForm.rating">
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
          v-model="editForm.read_date"
        />
      </div>
      <div class="formItem">
        <label for="comment">コメント</label>
        <textarea
          name="comment"
          type="text"
          placeholder="コメント"
          v-model="editForm.comment"
        />
      </div>
      <div class="buttons">
        <a @click.prevent="deleteBook" class="deleteBtn">削除</a>
        <a @click.prevent="edit" class="saveBtn">保存</a>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { bookCollection } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

export default {
  name: "EditView",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const currentBook = ref({
      bookRef: null,
      id: route.params.bookId,
    });

    const editForm = ref({
      url: "",
      rating: 1,
      active: false,
    });

    const getBook = async () => {
      let bookRef = doc(bookCollection, currentBook.value.id);
      currentBook.value.bookRef = bookRef;
      let book = await getDoc(currentBook.value.bookRef);
      let bookData = book.data();

      editForm.value = {
        ...editForm.value,
        ...bookData,
      };
    };

    const edit = async () => {
      await store.dispatch("editBook", {
        currentBook: currentBook.value.bookRef,
        bookDetails: editForm.value,
      });
      router.push("/");
    };

    const deleteBook = async () => {
      await store.dispatch("deleteBook", {
        currentBook: currentBook.value.bookRef,
        bookId: currentBook.value.id,
      });
      router.push("/");
    };

    getBook();

    return {
      editForm,
      edit,
      deleteBook,
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
      padding: 5px 10px;
      background: rgba(#fff, 0.1);
      option {
        display: block;
        font-size: 16px;
        color: #000;
      }
    }
  }
  .buttons {
    display: flex;
    width: 220px;
    margin: 40px 0 0 auto;
  }
  .saveBtn,
  .deleteBtn {
    @include flex-center();
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    width: 100px;
    padding: 6px 0 9px;
    border-radius: 30px;
    color: #fff;
    transition: 0.4s $ease-01;
  }
  .saveBtn {
    border: 1px solid $color-primary;
    background: $color-primary;
    &:hover {
      background: #fff;
      color: $color-primary;
    }
  }
  .deleteBtn {
    margin-right: 20px;
    border: 1px solid rgb(207, 29, 29);
    background: rgb(207, 29, 29);
    &:hover {
      background: #fff;
      color: rgb(207, 29, 29);
    }
  }
}
</style>