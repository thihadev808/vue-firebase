import { createStore } from "vuex";
import router from "../router";
import { addDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { auth, bookCollection } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { useToast } from "vue-toastification";

const toast = useToast();

export default createStore({
	state: {
		user: null,
		header: false,
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		RESET_USER(state) {
			state.user = null;
		},
		OPEN_HEADER(state) {
			state.header = true;
			document.querySelector("body").classList.add("modalOpened");
		},
		CLOSE_HEADER(state) {
			state.header = false;
			document.querySelector("body").classList.remove("modalOpened");
		},
	},
	actions: {
		async register({ commit }, details) {
			const { email, password } = details;

			try {
				await createUserWithEmailAndPassword(auth, email, password);
				toast.success("アカウントを作成しました。");
			} catch (err) {
				switch (err.code) {
					case "auth/email-already-in-use":
						toast.error("既に利用しているメールです。", {
							timeout: false,
						});
						break;
					case "auth/invalid-email":
						toast.error("利用できないメールになってまいます。", {
							timeout: false,
						});
						break;
					case "auth/weak-password":
						toast.error("強いパスワードにしてください。", {
							timeout: false,
						});
						break;
					default:
						toast.error("何かの問題が起こりました。", {
							timeout: false,
						});
				}

				return;
			}

			commit("SET_USER", auth.currentUser);
			router.push("/");
		},

		async login({ commit }, details) {
			const { email, password } = details;

			try {
				await signInWithEmailAndPassword(auth, email, password);
				toast.success("ログインしました。");
			} catch (err) {
				switch (err.code) {
					case "auth/user-not-found":
						toast.error("ユーザーが存在しません。", {
							timeout: false,
						});
						break;
					case "auth/wrong-password":
						toast.error("パスワードが間違っています。", {
							timeout: false,
						});
						break;
					default:
						toast.error("何かの問題が起こりました。", {
							timeout: false,
						});
				}

				return;
			}

			commit("SET_USER", auth.currentUser);
			router.push("/");
		},

		async logout({ commit }) {
			await signOut(auth);
			toast.success("ログアウトしました。");

			commit("RESET_USER");
			router.push("/login");
		},

		checkUser({ commit }) {
			auth.onAuthStateChanged(async (user) => {
				if (user == null) {
					commit("RESET_USER");
				} else {
					commit("SET_USER", user);

					const isReady =
						router.isReady() && router.currentRoute.value.path == "/login";
					if (isReady) router.push("/");
				}
			});
		},

		async addBook({ state }, bookDetails) {
			const uid = state.user.uid;
			const { title, author, url, rating, read_date, comment } = bookDetails;

			try {
				await addDoc(bookCollection, {
					title,
					author,
					url,
					rating,
					read_date,
					comment,
					createdAt: serverTimestamp(),
					uid,
				});
				toast.success("本を追加しました。");
			} catch (err) {
				toast.error(err);
			}
		},

		async editBook({ state }, { currentBook, bookDetails }) {
			try {
				await setDoc(currentBook, bookDetails);
				toast.success("本を修正しました。");
			} catch (err) {
				toast.error(err);
			}
		},

		async deleteBook({ state }, { currentBook, bookId }) {
			try {
				await deleteDoc(currentBook, bookId);
				toast.success("本を削除しました。");
			} catch (err) {
				toast.error(err);
			}
		},
	},
});
