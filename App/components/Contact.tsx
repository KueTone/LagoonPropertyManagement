import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Button } from "@rneui/themed";
import { InlineWidget } from "react-calendly";


export default function Contact() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Contact Us</Text>
        <Input placeholder="Your Email" />
        <Input placeholder="Property Interested" />
        <Input placeholder="Subject" />
        <Input placeholder="Inquiry" multiline />
        <Button title="Submit" />
      </View>

      <View style={styles.webviewContainer}>
        <InlineWidget
          url= "https://calendly.com/lujohnathon" 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  webviewContainer: {
    height: 700,
    width: "100%",
    overflow: "hidden",
  },
});
