import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import {
  Input,
  Image,
  Button,
  Avatar,
  AirbnbRating,
  Icon,
} from "react-native-elements";
import { map, size, filter, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddProduct() {
  const [titulo, settitulo] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [precio, setprecio] = useState(0.0);
  const [imagenes, setimagenes] = useState([]);
  const [categoria, setcategoria] = useState("");
  const [rating, setrating] = useState(5);
  const [errores, seterrores] = useState({});
  const [loading, setloading] = useState(false);
  const btnref = useRef();
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View
        style={{
          borderBottomColor: "#25D366",
          borderBottomWidth: 2,
          width: 100,
          marginTop: 20,
          alignSelf: "center",
        }}
      />
      <Input
        placeholder="Titulo"
        onChangeText={(text) => settitulo(text)}
        inputStyle={styles.input}
        errorMessage={errores.titulo}
      />
      <Input
        placeholder="Descripcion"
        onChangeText={(text) => setdescripcion(text)}
        inputStyle={styles.input}
        errorMessage={errores.descripcion}
      />
      <Input
        placeholder="Precio"
        onChangeText={(text) => setprecio(text)}
        inputStyle={styles.input}
        errorMessage={errores.precio}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    margin: 5,
    padding: 5,
    elevation: 3,
  },
  input: {
    width: "90%",
    borderRadius: 10,
    borderColor: "#707070",
    marginTop: 20,
    paddingHorizontal: 20,
    height: 50,
  },
  textarea: {
    height: 150,
  },
  txtlabel: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#075e54",
  },
  btnaddnew: {
    backgroundColor: "#128c7e",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  viewimagenes: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 150,
    width: 100,
    backgroundColor: "#e3e3e3",
    padding: 10,
  },
  miniatura: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  botonera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btncategoria: {
    justifyContent: "center",
    alignItems: "center",
  },
});
