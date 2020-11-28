import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import RutasNoAutenticadas from "./src/navigations/RutasNoAutenticadas";
import SwitchNavigator from "./src/navigations/SwitchNavigator";
import { validarsesion } from "./src/utils/Acciones";
import Loading from "./src/components/Loading";
import { encode, decode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

LogBox.ignoreAllLogs(["Animated", "Setting a timer for a long period of time"]);

export default function App() {
  const [user, setuser] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    validarsesion(setuser);
    setloading(false);
  }, []);

  if (loading) {
    return <Loading isVisible={loading} text="Cargando..." />;
  }

  return user ? <SwitchNavigator /> : <RutasNoAutenticadas />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
