import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyArO2OITeF4n8H7sddSRPKPRRxE9l17jlQ",
  authDomain: "whatscommerce-7e8c6.firebaseapp.com",
  databaseURL: "https://whatscommerce-7e8c6.firebaseio.com",
  projectId: "whatscommerce-7e8c6",
  storageBucket: "whatscommerce-7e8c6.appspot.com",
  messagingSenderId: "812180926770",
  appId: "1:812180926770:web:b93e964080e31fb959e72b",
};
// Initialize Firebase
export const firebaseapp = firebase.initializeApp(firebaseConfig);
