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

type Apartment = {
  id: number;
  address: string;
  city: string;
  state: string;
  price: number;
  beds: number;
  baths: number;
  size: number;
};

export default function Apartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [apartmentPop, setApartmentPop] = useState<Apartment | null>();

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
    getApartments();
  }, []);

  async function getApartments() {
    const { data, error } = await supabase.from("apartment").select("*");

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      Alert.alert("Error fetching apartments", error.message);
      return;
    }

    if (data) {
      setApartments(data);
    }
  }
  async function modal(id: number) {
    const { data, error } = await supabase
      .from("apartment")
      .select("*")
      .eq("id", id)
      .single();

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      Alert.alert("Error fetching apartments", error.message);
      return;
    }

    if (data) {
      setApartmentPop(data);
    }
  }
  async function remove(id: number) {
    const { data, error } = await supabase.from("apartment").delete().eq("id", id);

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      Alert.alert("Error", error.message);
    }
    getApartments();
  }
  async function update(id: number) {
    const { data, error } = await supabase
      .from("apartment")
      .update({ other_column: "otherValue" })
      .eq("id", id)
      .select()
      .single();
    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setApartmentPop(data);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {apartments.length === 0 ? (
          <Text>No apartments available</Text>
        ) : (
          apartments.map((apartment) => (
            <View key={apartment.id} style={styles.item}>
              <Text style={styles.text}>
                {apartment.address}, {apartment.city}, {apartment.state}
              </Text>
              <Text style={styles.text}>${apartment.price}</Text>
              <Text style={styles.text}>
                {apartment.beds} beds | {apartment.baths} baths
              </Text>
              <Text style={styles.text}>{apartment.size} sqft</Text>
              {session && (
                <Button
                  title="Edit"
                  onPress={() => {
                    setModalVisible(true);
                    modal(apartment.id);
                    console.log("Apartment Address: ", apartment.id);
                  }}
                />
              )}

              {apartmentPop && (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.text}>
                        {apartmentPop.address}, {apartmentPop.city}, {apartmentPop.state}
                      </Text>
                      <Text style={styles.text}>${apartment.price}</Text>
                      <Text style={styles.text}>
                        {apartmentPop.beds} beds | {apartmentPop.baths} baths
                      </Text>
                      <Text style={styles.text}>{apartmentPop.size} sqft</Text>

                      <Button
                        title="Close"
                        onPress={() => setModalVisible(false)}
                      />
                      <Button
                        title="Remove"
                        onPress={() => remove(apartmentPop.id)}
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
