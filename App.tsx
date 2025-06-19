import { StatusBar } from "expo-status-bar";
import {
  Alert,
  AppState,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  Navigation,
} from "./App/index";
import { supabase } from "./utils/supabase";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
            <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
          <AddItem /> 
        </GestureHandlerRootView>
    // <ScrollView>
    //   <View style={styles.container}>

    //     {/* <Houses //> */}
    //     {/* <Auth /> */}
    //     {/* <Home /> */}

    //     {/* <OwnerHome/> */}
    //   </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // navBar: {
  //   flexDirection: "row",
  // },
});
