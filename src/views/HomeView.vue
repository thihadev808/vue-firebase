<template>
  <div class="home">
    <h1 class="u-font_dance">
      book list <router-link to="/add">add new book</router-link>
    </h1>
    <div class="bookList" v-if="state.books.length > 0">
      <div class="book" v-for="book in state.books" :key="book.id">
        <div class="book_flex">
          <div class="bookFlex_item">
            <h4 class="book_title-sub">タイトル</h4>
            <p class="book_name">{{ book.title }}</p>
          </div>
          <div class="bookFlex_item">
            <h4 class="book_title-sub">作家</h4>
            <p class="book_text book_author">{{ book.author }}</p>
          </div>
        </div>
        <div class="book_flex">
          <div class="bookFlex_item" v-if="book.url">
            <h4 class="book_title-sub">URL</h4>
            <p class="book_text book_about">{{ book.url }}</p>
          </div>
          <div class="bookFlex_item">
            <h4 class="book_title-sub">評価</h4>
            <p class="book_text book_rating">{{ book.rating }}</p>
          </div>
        </div>
        <h4 class="book_title-sub">読了日</h4>
        <p class="book_text book_date">{{ book.read_date }}</p>
        <h4 class="book_title-sub">コメント</h4>
        <p class="book_text book_date">{{ book.comment }}</p>
        <router-link :to="{ path: `/books/${book.id}` }" class="editBtn"
          >編集する</router-link
        >
      </div>
    </div>
    <div class="addBook" v-else>
      <p class="addBook_text">まだ 最近読んだ本が追加されてません。</p>
      <p>
        <router-link class="addBook_btn" to="/add">本を追加</router-link
        >しましょう。
      </p>
    </div>
  </div>
</template>

<script>
import { bookCollection } from "../firebase";
import { getDocs } from "firebase/firestore";
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  name: "HomeView",
  setup() {
    const store = useStore();

    const state = reactive({
      books: [],
    });

    const fetchBooks = async () => {
      let bookSnapShot = await getDocs(bookCollection);

      bookSnapShot.forEach((book) => {
        let bookData = {
          ...book.data(),
          id: book.id,
        };
        const isCurrentUser = bookData.uid == store.state.user.uid;

        if (isCurrentUser) state.books.push(bookData);
      });

      state.books = sortByDate(JSON.parse(JSON.stringify(state.books)));
    };

    fetchBooks();

    const sortByDate = (array) => {
      return array.sort((a, b) => {
        return b.createdAt.seconds - a.createdAt.seconds;
      });
    };

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/foundation" as *;

h1 {
  font-size: 40px;
  display: flex;
  justify-content: space-between;
  a {
    margin-top: 16px;
    font-size: 20px;
    color: #fff;
    text-decoration: underline;
    transition: 0.4s $ease-01;
    &:hover {
      opacity: 0.7;
    }
  }
}

.bookList {
  .book {
    margin-top: 20px;
    padding: 20px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    &:not(:first-child) {
      border-top: none;
      padding-top: 0;
    }
    .book_flex {
      @include mq(small) {
        display: flex;
        .bookFlex_item {
          &:first-child {
            width: 35%;
          }
          &:last-child {
            width: 65%;
          }
        }
      }
    }
    .book_title {
      padding-bottom: 10px;
      font-size: 20px;
    }
    .book_title-sub {
      margin-top: 10px;
      font-size: 14px;
    }
    .book_text {
      margin-top: 4px;
      display: block;
      font-size: 16px;
    }
    .book_members {
      font-size: 16px;
    }
    .editBtn {
      @include flex-center();
      cursor: pointer;
      font-size: 15px;
      font-weight: 400;
      width: 130px;
      margin: 0 0 0 auto;
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
    }
  }
}

.addBook {
  margin-top: 20px;
  .addBook_text {
    font-size: 16px;
  }
  .addBook_btn {
    font-size: 16px;
    color: $color-primary;
    transition: 0.4s $ease-01;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>