import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from "../firebase";
import store from "../store";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/add",
		name: "add",
		component: () => import("../views/AddView.vue"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/books/:bookId",
		name: "edit",
		component: () => import("../views/EditView.vue"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/LoginView.vue"),
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/RegisterView.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	store.commit("CLOSE_HEADER");

	// ログインしてたらトップに進む
	if (to.path == "login" && auth.currentUser) {
		next("/");
		return;
	}

	// ログインしてなかったらログインページに戻す
	if (to.matched.some((path) => path.meta.requiresAuth) && !auth.currentUser) {
		next("/login");
		return;
	}

	next();
});

export default router;
