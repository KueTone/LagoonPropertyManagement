import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { supabase } from "../../utils/supabase"; // adjust path as needed

type House = {
  id: number;
  created_at: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  size: number;
};

export default function Hosues() {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const { data, error } = await supabase.from("house").select("*");
        if (error) throw error;
        setHouses(data);
      } catch (err: any) {
        console.error("Supabase error:", err.message || err);
        Alert.alert("Error", err.message || "Something went wrong");
      }
    }

    fetchHouses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏠 House List</Text>
      <FlatList
        data={houses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.address}</Text>
            <Text>{item.price}</Text>
            <Text>{item.beds}</Text>
            <Text>{item.baths}</Text>
            <Text>{item.size}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
