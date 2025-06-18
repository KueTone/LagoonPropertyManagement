import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { supabase } from "../../utils/supabase"

type House = {
  id: number
  address: string
  city: string
  state: string
  price: number
  beds: number
  baths: number
  size: number
}

export default function Houses() {
  const [houses, setHouses] = useState<House[]>([])

  useEffect(() => {
    getHouses()
  }, [])

  async function getHouses() {
    const { data, error } = await supabase.from("house").select("*");
  
    console.log("Supabase data:", data);
    console.log("Supabase error:", error);
  
    if (error) {
      Alert.alert("Error fetching houses", error.message);
      return;
    }
  
    if (data) {
      setHouses(data);
    }
  }
  

  return (
    <View style={styles.container}>
      {houses.length === 0 ? (
        <Text>No houses available</Text>
      ) : (
        houses.map((house) => (
          <View key={house.id} style={styles.item}>
            <Text style={styles.text}>{house.address}, {house.city}, {house.state}</Text>
            <Text style={styles.text}>${house.price}</Text>
            <Text style={styles.text}>
              {house.beds} beds | {house.baths} baths
            </Text>
            <Text style={styles.text}>{house.size} sqft</Text>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
})
