import { firebaseapp } from "./Firebase";
import * as firebase from "firebase";

export const validarsesion = (setvalidarsesion) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("usuario logeado");
    } else {
      console.log("no ha ingresado");
    }
  });
};

export const cerrarsesion = () => {
  firebase.auth().signOut();
};
