import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import {
  Home,
  Auth,
  Account,
  Houses,
  Apartments,
  Contact,
  AddItem,
  OwnerHome,
  About,
} from "../index";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
              tabBarIndicatorStyle: { backgroundColor: "#333" },
              tabBarStyle: { backgroundColor: "#f5f5f5" },
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#888",
          }}
        >
          <Tab.Screen name="Lagoon Property Management" component={Home} />
          <Tab.Screen name="Houses" component={Houses} />
          <Tab.Screen name="Apartments" component={Apartments} />
          <Tab.Screen name="About Us" component={About} />
          <Tab.Screen name="Login" component={Auth} />
          <Tab.Screen name="Schedule an Appointment" component={Contact} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //     backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
