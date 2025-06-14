import { StatusBar } from "expo-status-bar";
import { Alert, AppState, StyleSheet, Text, View } from "react-native";
import { Home, Auth, Account, Houses, Apartments, Contact } from "./App/index";
import { supabase } from "./utils/supabase";
import { useState, useEffect } from "react";

export default function App() {

  return (
    <View style={styles.container}>
      <Houses />
      {/* <Home /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
