import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export const validaremail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

export const cargarImagenesxAspecto = async (array) => {
  let imgResponse = { status: false, imagen: "" };
  const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const cameraPermissions = resultPermissions.permissions.cameraRoll.status;

  if (cameraPermissions === "denied") {
    alert("Usted debe permitir el accesos para cargar las imagenes");
  } else {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: array,
    });

    if (!result.cancelled) {
      imgResponse = { status: true, imagen: result.uri };
    }
  }
  return imgResponse;
};

/* export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
} */
