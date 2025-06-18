import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Input, Button } from "@rneui/themed";

type House = {
  id: number;
  address: string;
  city: string;
  state: string;
  price: number;
  beds: number;
  baths: number;
  size: number;
};

export default function AddItem() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [size, setSize] = useState(0);

  async function addHouses() {
    setLoading(true);

    const { data: existing, error: fetchError } = await supabase
      .from("house")
      .select("*")
      .eq("address", address)
      .maybeSingle(); // only one match or null

    if (fetchError) {
      console.error("Error checking for duplicate:", fetchError.message);
      setErrorMessage(fetchError.message);
      setLoading(false);
      return;
    }

    if (existing) {
      setErrorMessage("A house with this address already exists.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("house").insert({
      address: address,
      city: city,
      state: state,
      price: price,
      beds: beds,
      baths: baths,
      size: size,
    });

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      //       Alert.alert("Error fetching houses", error.message);
      console.error(error.message);
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setErrorMessage("");
    if (data) {
      setHouses(data);
      setErrorMessage("Success");
    }
    setLoading(false);
  }

  return (
    <View>
      <Text>Address</Text>
      <TextInput
        // placeholder="Address"
        // leftIcon={{ type: "font-awesome", name: "lock" }}
        onChangeText={(text) => setAddress(text)}
        value={address}
        autoCapitalize={"none"}
      />
      <Text>City</Text>
      <TextInput
        // placeholder="City"
        onChangeText={(text) => setCity(text)}
        value={city}
        autoCapitalize={"none"}
      />
      <Text>State</Text>
      <TextInput
        // placeholder="State"
        onChangeText={(text) => setState(text)}
        value={state}
        autoCapitalize={"none"}
      />
      <Text>Price</Text>
      <TextInput
        // placeholder="Price"
        value={price === 0 ? "" : price.toString()}
        onChangeText={(text) => {
          const numericValue = parseInt(text) || 0;
          setPrice(numericValue);
        }}
        keyboardType="numeric"
      />
      <Text>Beds</Text>
      <TextInput
        // placeholder="beds"
        value={beds === 0 ? "" : beds.toString()}
        onChangeText={(text) => {
          const numericValue = parseInt(text) || 0;
          setBeds(numericValue);
        }}
        keyboardType="numeric"
      />
      <Text>Baths</Text>
      <TextInput
        // placeholder="baths"
        value={baths === 0 ? "" : baths.toString()}
        onChangeText={(text) => {
          const numericValue = parseInt(text) || 0;
          setBaths(numericValue);
        }}
        keyboardType="numeric"
      />
      <Text>Size</Text>
      <TextInput
        // placeholder="size"
        value={size === 0 ? "" : size.toString()}
        onChangeText={(text) => {
          const numericValue = parseInt(text) || 0;
          setSize(numericValue);
        }}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={addHouses} loading={loading} />

      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 8,
  },
});
