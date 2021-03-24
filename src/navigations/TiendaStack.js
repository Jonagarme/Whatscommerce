import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Tienda from "../screens/Tienda/Tienda";
//import AddProducto from "../screens/Tienda/AddProduct";
import Contacto from "../screens/Tienda/Contacto";
import MensajesList from "../screens/Tienda/MensajesList";
import Detalle from "../screens/Tienda/Detalle";

const Stack = createStackNavigator();

export default function TiendaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Tienda}
        name="tienda"
        options={{ headerShown: false }}
      />

      {/*  <Stack.Screen
        component={AddProducto}
        name="add-product"
        options={{
          title: "Agregar Nuevo Producto",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#128C7E" },
        }}
      /> */}

      <Stack.Screen
        component={Detalle}
        name="detalle"
        options={{
          headerTransparent: true,
          headerTintColor: "#128C7E",
          title: "",
        }}
      />
      <Stack.Screen
        component={MensajesList}
        name="mensajes"
        options={{
          title: "Mensajes",
          headerStyle: { backgroundColor: "#128C7E" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={Contacto}
        name="contacto"
        options={{
          title: "Contácto",
          headerStyle: { backgroundColor: "#128C7E" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
