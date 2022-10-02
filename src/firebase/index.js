import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBdIbNhfmknAXLD2My9p2EGrg1Uk_ft63E",
	authDomain: "vue-firebase-5dffc.firebaseapp.com",
	projectId: "vue-firebase-5dffc",
	storageBucket: "vue-firebase-5dffc.appspot.com",
	messagingSenderId: "744926446434",
	appId: "1:744926446434:web:a057706d59696f8a9f223b",
	measurementId: "G-8707JRK22B",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const bookCollection = collection(db, "books");

export { auth, bookCollection };
