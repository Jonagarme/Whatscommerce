import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { validaremail } from "../utils/Utils";
import { isEmpty, size } from "lodash";
import * as firebase from "firebase";
import Loading from "../components/Loading";

export default function RegisterForm(props) {
  const { toastRef } = props;

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repetirpassword, setrepetirpassword] = useState("");
  const [show, setshow] = useState(true);
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();

  function crearcuenta() {
    if (isEmpty(email) || isEmpty(password) || isEmpty(repetirpassword)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validaremail(email)) {
      toastRef.current.show("Correo no es válido");
    } else if (password !== repetirpassword) {
      toastRef.current.show("Las contraseñas tienen que ser iguales");
    } else if (size(password) < 6) {
      toastRef.current.show(
        "Las contraseñas deben tener al menos 6 carácteres"
      );
    } else {
      setloading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          toastRef.current.show("Se ha creado el usuario correctamente");
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          toastRef.current.show(
            "Ha ocurrido un error o puede que ese usuario este registrado"
          );
        });
    }
  }
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: "#25D366",
          borderBottomWidth: 2,
          width: 100,
        }}
      />
      <Input
        placeholder="Correo"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#128c7e",
        }}
        leftIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#128c7e",
        }}
        onChangeText={(text) => {
          setemail(text);
        }}
        value={email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        leftIcon={{
          type: "material-community",
          name: "security",
          color: "#128c7e",
        }}
        rightIcon={{
          type: "material-community",
          name: show ? "eye-outline" : "eye-off-outline",
          color: "#128c7e",
          onPress: () => setshow(!show),
        }}
        onChangeText={(text) => {
          setpassword(text);
        }}
        secureTextEntry={show}
        value={password}
      />

      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.input}
        leftIcon={{
          type: "material-community",
          name: "security",
          color: "#128c7e",
        }}
        rightIcon={{
          type: "material-community",
          name: show ? "eye-outline" : "eye-off-outline",
          color: "#128c7e",
          onPress: () => setshow(!show),
        }}
        onChangeText={(text) => {
          setrepetirpassword(text);
        }}
        secureTextEntry={show}
        value={repetirpassword}
      />
      <Button
        title="CREAR CUENTA"
        containerStyle={styles.btnentrar}
        buttonStyle={{ backgroundColor: "#25d366" }}
        onPress={() => crearcuenta()}
      />
      <Button
        title="INICIAR SESION"
        containerStyle={styles.btnentrar}
        buttonStyle={{ backgroundColor: "#128C7E" }}
        onPress={() => navigation.goBack()}
      />
      <Loading isVisible={loading} text="Favor Espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6F8",
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingTop: 20,
  },
  input: {
    width: "90%",
    marginTop: 20,
    height: 50,
  },
  btnentrar: {
    width: "90%",
    marginTop: 20,
  },
});
