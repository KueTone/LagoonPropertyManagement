import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Button,
  Modal,
} from "react-native";
import { supabase } from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";

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

export default function Houses() {
  const [houses, setHouses] = useState<House[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [housePop, setHousePop] = useState<House | null>();

  useEffect(() => {
    // Get current session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    getHouses();
  }, []);

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
  async function modal(id: number) {
    const { data, error } = await supabase
      .from("house")
      .select("*")
      .eq("id", id)
      .single();

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      Alert.alert("Error fetching houses", error.message);
      return;
    }

    if (data) {
      setHousePop(data);
    }
  }
  async function remove(id: number) {
    const { data, error } = await supabase.from("house").delete().eq("id", id);

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      Alert.alert("Error", error.message);
    }
    getHouses();
  }
  async function update(id: number) {
    const { data, error } = await supabase
      .from("house")
      .update({ other_column: "otherValue" })
      .eq("id", id)
      .select()
      .single();
    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setHousePop(data);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {houses.length === 0 ? (
          <Text>No houses available</Text>
        ) : (
          houses.map((house) => (
            <View key={house.id} style={styles.item}>
              <Text style={styles.text}>
                {house.address}, {house.city}, {house.state}
              </Text>
              <Text style={styles.text}>${house.price}</Text>
              <Text style={styles.text}>
                {house.beds} beds | {house.baths} baths
              </Text>
              <Text style={styles.text}>{house.size} sqft</Text>
              {session && (
                <Button
                  title="Edit"
                  onPress={() => {
                    setModalVisible(true);
                    modal(house.id);
                    console.log("House Address: ", house.id);
                  }}
                />
              )}

              {housePop && (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.text}>
                        {housePop.address}, {housePop.city}, {housePop.state}
                      </Text>
                      <Text style={styles.text}>${house.price}</Text>
                      <Text style={styles.text}>
                        {housePop.beds} beds | {housePop.baths} baths
                      </Text>
                      <Text style={styles.text}>{housePop.size} sqft</Text>

                      <Button
                        title="Close"
                        onPress={() => setModalVisible(false)}
                      />
                      <Button
                        title="Remove"
                        onPress={() => remove(housePop.id)}
                      />
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    minWidth: "100%",
  },
  text: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 8,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
