import { firebaseapp } from "./Firebase";
import * as firebase from "firebase";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import "firebase/firestore";
import uuid from "random-uuid-v4";
import { map } from "lodash";
import { convertirFicheroBlob } from "./Utils";

const db = firebase.firestore(firebaseapp);
//const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const validarsesion = (setvalidarsesion) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setvalidarsesion(true);
    } else {
      setvalidarsesion(false);
    }
  });
};

export const cerrarsesion = () => {
  firebase.auth().signOut();
};

export const validarPhone = (setphoneauth) => {
  /* firebase.auth().onAuthStateChanged((user) => {
    if (user.phoneNumber) {
      setphoneauth(true);
    }
  }); */
  db.collection("Usuarios")
    .doc(ObtenerUsuario().uid)
    .onSnapshot((snapshot) => {
      setphoneauth(snapshot.exists);
    });
};

export const enviarconfirmacionphone = async (numero, recapcha) => {
  let verificationid = "";

  await firebase
    .auth()
    .currentUser.reauthenticateWithPhoneNumber(numero, recapcha.current)
    .then((response) => {
      verificationid = response.verificationId;
    })
    .catch((err) => console.log(err));

  return verificationid;
};

export const confirmarcodigo = async (verificationid, codigo) => {
  let resultado = false;
  const credenciales = firebase.auth.PhoneAuthProvider.credential(
    verificationid,
    codigo
  );

  await firebase
    .auth()
    .currentUser.linkWithCredential(credenciales)
    .then((response) => (resultado = true))
    .catch((err) => {
      console.log(err);
    });

  return resultado;
};

export const obtenerToken = async () => {
  let token = "";
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
};

export const ObtenerUsuario = () => {
  return firebase.auth().currentUser;
};

export const addRegistroEspecifico = async (coleccion, doc, data) => {
  const resultado = { error: "", statusreponse: false, data: null };

  await db
    .collection(coleccion)
    .doc(doc)
    .set(data, { merge: true })
    .then((response) => {
      resultado.statusreponse = true;
    })
    .catch((err) => {
      resultado.error = err;
    });

  return resultado;
};

export const subirImagenesBatch = async (imagenes, ruta) => {
  const imagenesurl = [];

  await Promise.all(
    map(imagenes, async (image) => {
      const blob = await convertirFicheroBlob(image);
      const ref = firebase.storage().ref(ruta).child(uuid());

      await ref.put(blob).then(async (result) => {
        await firebase
          .storage()
          .ref(`${ruta}/${result.metadata.name}`)
          .getDownloadURL()
          .then((imagenurl) => {
            imagenesurl.push(imagenurl);
          });
      });
    })
  );

  return imagenesurl;
};

export const actualilzarPerfil = async (data) => {
  let respuesta = false;
  await firebase
    .auth()
    .currentUser.updateProfile(data)
    .then((response) => {
      respuesta = true;
    });

  return respuesta;
};

export const reautenticar = async (verificationId, code) => {
  let response = { statusresponse: false };

  const credenciales = new firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    code
  );

  await firebase
    .auth()
    .currentUser.reauthenticateWithCredential(credenciales)
    .then((resultado) => (response.statusresponse = true))
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const actualizaremailfirebase = async (email) => {
  let response = { statusresponse: false };
  await firebase
    .auth()
    .currentUser.updateEmail(email)
    .then((respuesta) => {
      response.statusresponse = true;
    })
    .catch((err) => (response.statusresponse = false));
  return response;
};

export const actualizarTelefono = async (verificationId, code) => {
  let response = { statusresponse: false };
  console.log(verificationId);
  console.log(code);

  const credenciales = new firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    code
  );

  await firebase
    .auth()
    .currentUser.updatePhoneNumber(credenciales)
    .then((resultado) => (response.statusresponse = true))
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const addRegistro = async (coleccion, data) => {
  const resultado = { error: "", statusreponse: false };

  await db
    .collection(coleccion)
    .add(data)
    .set(data)
    .then((response) => {
      resultado.statusreponse = true;
    })
    .catch((err) => {
      resultado.error = err;
    });

  return resultado;
};
