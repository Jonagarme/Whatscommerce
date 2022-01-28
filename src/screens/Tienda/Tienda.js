import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon, Avatar, Image, Ratinng, Badge } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { size } from "lodash";
import { ListarMisProductos } from "../../utils/Acciones";

export default function Tienda() {
  const navigation = useNavigation();
  const [productlist, setproductlist] = useState([]);
  const [search, setsearch] = useState("");
  const [mensajes, setmensajes] = useState("Cargando...");
  const [notificaciones, setnotificaciones] = useState(0);
  //const { photoURL } = ObtenerUsuario();
  const [categoria, setcategoria] = useState("");

  useEffect(() => {
    (async () => {
      console.log(await ListarMisProductos());
      //setnotificaciones(0);
      //setproductlist(await ListarProductos());

      /*  const consulta = await ListarNotificaciones();
      if (consulta.statusresponse) {
        setnotificaciones(size(consulta.data));
        console.log(consulta);
      } */
    })();
  }, []);

  return (
    <View>
      <Text>Tienda</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
