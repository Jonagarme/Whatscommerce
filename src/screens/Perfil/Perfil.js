import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { Icon, Avatar, Input } from "react-native-elements";
import { cargarImagenesxAspecto } from "../../utils/Utils";
import {
  subirImagenesBatch,
  addRegistroEspecifico,
  ObtenerUsuario,
  actualilzarPerfil,
} from "../../utils/Acciones";
import Loading from "../../components/Loading";
import InputEditable from "../../components/InputEditable";
import Modal from "../../components/Modal";

export default function Perfil() {
  const [imagenperfil, setimagenperfil] = useState("");
  const [loading, setloading] = useState(false);
  const usuario = ObtenerUsuario();
  const [displayName, setdisplayName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");

  const [editablename, seteditablename] = useState(false);
  const [editableemail, seteditableemail] = useState(false);
  const [editablephone, seteditablephone] = useState(false);

  useEffect(() => {
    setimagenperfil(usuario.photoURL);
    const { displayName, phoneNumber, email } = usuario;
    setdisplayName(displayName);
    setphoneNumber(phoneNumber);
    setemail(email);
  }, []);
  console.log(usuario);

  const onChangeInput = (input, valor) => {
    switch (input) {
      case "displayName":
        setdisplayName(valor);
        break;
      case "email":
        setemail(valor);
        break;
      case "phoneNumber":
        setphoneNumber(valor);
        break;
    }
  };

  const obtenerValor = (input) => {
    switch (input) {
      case "displayName":
        return displayName;
        break;
      case "email":
        return email;
        break;
      case "phoneNumber":
        return phoneNumber;
        break;
    }
  };

  const actualizarValor = async (input, valor) => {
    switch (input) {
      case "displayName":
        actualilzarPerfil({ displayName: valor });
        addRegistroEspecifico("Usuarios", usuario.uid, { displayName: valor });
        console.log(usuario);
        break;
      case "email":
        break;
      case "phoneNumber":
        break;
    }
  };

  return (
    <View>
      <StatusBar backgroundColor="#128C7E" />
      <CabeceraBG />
      <HeaderAvatar
        usuario={usuario}
        imagenperfil={imagenperfil}
        setimagenperfil={setimagenperfil}
        setloading={setloading}
      />
      <FormDatos
        onChangeInput={onChangeInput}
        obtenerValor={obtenerValor}
        editableemail={editableemail}
        editablename={editablename}
        editablephone={editablephone}
        seteditableemail={seteditableemail}
        seteditablename={seteditablename}
        seteditablephone={seteditablephone}
        actualizarValor={actualizarValor}
      />
      <Loading isVisible={loading} text="Espere por favor" />
    </View>
  );
}

function CabeceraBG() {
  return (
    <View>
      <View style={styles.bg}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Nombre
        </Text>
      </View>
    </View>
  );
}

function HeaderAvatar(props) {
  const { usuario, setimagenperfil, imagenperfil, setloading } = props;
  const { uid } = usuario;

  const cambiarfoto = async () => {
    const resultado = await cargarImagenesxAspecto([1, 1]);

    if (resultado.status) {
      setloading(true);
      const url = await subirImagenesBatch([resultado.imagen], "Perfil");
      const update = await actualilzarPerfil({ photo: url[0] });
      const response = await addRegistroEspecifico("Usuarios", uid, {
        photoURL: url[0],
      });

      if (response.statusreponse) {
        setimagenperfil(url[0]);
        //console.log("ok");
        setloading(false);
      } else {
        console.log("algo salio mal");
        setloading(false);
        alert("Ha ocurrido un error al actualziar la foto de perfil");
      }
    }
  };

  return (
    <View style={styles.avatarinline}>
      <Avatar
        source={
          imagenperfil
            ? { uri: imagenperfil }
            : require("../../../assets/avatar.jpg")
        }
        style={styles.avatar}
        size="large"
        rounded
        showAccessory={true}
        onAccessoryPress={cambiarfoto}
      />
    </View>
  );
}

function FormDatos(props) {
  const {
    onChangeInput,
    obtenerValor,
    editableemail,
    editablename,
    editablephone,
    seteditableemail,
    seteditablename,
    seteditablephone,
    actualizarValor,
  } = props;
  return (
    <View>
      <InputEditable
        id="displayName"
        label="Nombre"
        obtenerValor={obtenerValor}
        placeholder="Nombre"
        onChangeInput={onChangeInput}
        editable={editablename}
        seteditable={seteditablename}
        actualizarValor={actualizarValor}
      />
      <InputEditable
        id="email"
        label="Correo"
        obtenerValor={obtenerValor}
        placeholder="ejmplo@ejemplo.com"
        onChangeInput={onChangeInput}
        editable={editableemail}
        seteditable={seteditableemail}
        actualizarValor={actualizarValor}
      />
      <InputEditable
        id="phoneNumber"
        label="Telefono"
        obtenerValor={obtenerValor}
        placeholder="+00000000"
        onChangeInput={onChangeInput}
        editable={editablephone}
        seteditable={seteditablephone}
        actualizarValor={actualizarValor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    backgroundColor: "#128C7E",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarinline: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -70,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  confirmacion: {
    height: 200,
    width: "100%",
    alignItems: "center",
  },
  titulomodal: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  detalle: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },
});
