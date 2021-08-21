import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { ListarMisProductos } from "../../utils/Acciones";

export default function MiTienda() {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      console.log(await ListarMisProductos());
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Mi Tienda</Text>
      <Icon
        name="plus"
        type="material-community"
        color="#128c7e"
        containerStyle={styles.btncontainer}
        onPress={() => {
          navigation.navigate("add-product");
        }}
        reverse
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btncontainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 10,
    borderBottomColor: 0.5,
    borderBottomColor: "#128C7E",
    shadowColor: "#128C7E",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.9,
  },
  viewmedio: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#075e54",
  },
  descripcion: {
    fontSize: 16,
    color: "#757575",
  },
  precio: {
    fontSize: 16,
    color: "#128c7e",
  },
  iconbar: {
    marginTop: 20,
    flexDirection: "row",
  },
  icon: {
    borderWidth: 1,
    borderColor: "#25D366",
    padding: 5,
    borderRadius: 60,
    marginLeft: 20,
  },
  iconedit: {
    borderWidth: 1,
    borderColor: "#FFA000",
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },

  icondelete: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },
});
