import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import RutasAutenticadas from "./RutasAutenticadas";
import CuentaStack from "./CuentaStack";
import { validarPhone } from "../utils/Acciones";

export default function SwitchNavigator() {
  const [phoneauth, setphoneauth] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    validarPhone(setphoneauth);
    setTimeout(() => {
      setloading(false);
    }, 5000);
  }, []);

  if (loading) {
    return <Loading isVisible={loading} text="Cargando Configuración" />;
  } else {
    return phoneauth ? <RutasAutenticadas /> : <CuentaStack />;
  }
}
