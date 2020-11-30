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

export default function Perfil() {
  const [imagenperfil, setimagenperfil] = useState("");
  const [loading, setloading] = useState(false);
  const usuario = ObtenerUsuario();

  useEffect(() => {
    setimagenperfil(usuario.photoURL);
  }, []);
  console.log(usuario);

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
