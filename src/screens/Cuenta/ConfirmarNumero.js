import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import CodeInput from "react-native-code-input";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import {
  confirmarcodigo,
  obtenerToken,
  ObtenerUsuario,
  addRegistroEspecifico,
} from "../../utils/Acciones";

export default function ConfirmarNumero(props) {
  const { route } = props;
  const { verificationid } = route.params;

  const [loading, setloading] = useState(false);

  //Va a extraer la informacion del usuario
  //va a obtener el token - push notification
  //va haer las validaciones y confirmar autenticacion
  const confirmarCodigoSMS = async (code) => {
    setloading(true);
    const resultado = await confirmarcodigo(verificationid, code);

    if (resultado) {
      const token = await obtenerToken();
      const {
        uid,
        displayName,
        photoURL,
        email,
        phoneNumber,
      } = ObtenerUsuario();

      const registro = await addRegistroEspecifico("Usuarios", uid, {
        token,
        displayName,
        photoURL,
        email,
        phoneNumber,
        fechacreacion: new Date(),
      });
      setloading(false);
    } else {
      Alert.alert("Error", "Favor válidar el código introducido", [
        {
          style: "default",
          text: "Entendido",
        },
      ]);
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.imglogo}
      />
      <Text style={styles.titulo}>
        Favor revise su sms e introduzca los códigos de confirmación
      </Text>

      <CodeInput
        activeColor="#fff"
        inactiveColor="#fff"
        autoFocus={true}
        inputPosition="center"
        size={50}
        codeLength={6}
        containerStyle={{ marginTop: 30 }}
        codeInputStyle={{ borderWidth: 1.5 }}
        onFulfill={(code) => {
          //console.log(code);
          confirmarCodigoSMS(code);
        }}
        secureTextEntry
      />

      <Loading isVisible={loading} text="Favor espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#128C7E",
    paddingHorizontal: 20,
  },
  imglogo: {
    width: 106,
    height: 106,
    alignSelf: "center",
    marginTop: 20,
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginVertical: 20,
  },
});
