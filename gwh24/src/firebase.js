// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app"; 
// TODO: Add SDKs for Firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#available-libraries 
// Your web app's Firebase configuration 
const firebaseConfig = { 
	apiKey: "AIzaSyAvnP57ZdpyN9Cs9Ega9rw0aUmbuK5X9B4", 
	authDomain: "fire-d0eeb.firebaseapp.com", 
	projectId: "fire-d0eeb", 
	storageBucket: "fire-d0eeb.appspot.com", 
	messagingSenderId: "295636834424", 
	appId: "1:295636834424:web:acd5d45383793d0f98358d" 
}; 
// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
//include this line if you want to use Firestore in your app 
export const firestore = getFirestore(app); 