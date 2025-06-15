import React, { useState } from "react";
import { Text, StyleSheet, View, AppState } from "react-native";
import { supabase } from "../../utils/supabase";
import { Button, Input } from "@rneui/themed";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [SignInemail, SignInsetEmail] = useState("");
  const [SignInpassword, SignInsetPassword] = useState("");
  const [SignUpemail, SignUpsetEmail] = useState("");
  const [SignUppassword,SignUpsetPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [SignInerrorMessage, SignInsetErrorMessage] = useState("");
  const [SignUperrorMessage, SignUpsetErrorMessage] = useState("");

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: SignInemail,
      password: SignInpassword,
    });

    if (error) {
      console.error("Supabase signIn error:", error);
      SignInsetErrorMessage("Username/Password Incorrect");
    } else {
      console.log("SignIn success:", data);
      SignInsetErrorMessage("");
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: SignUpemail,
      password: SignUppassword,
    });
    if (error) {
      console.error("Supabase signUp error:", error);
      console.error(error.message);
      // alert(error.message);
      SignUpsetErrorMessage(error.message);
    } else {
      console.log("Signup success:", data);
      SignUpsetErrorMessage("");
    }

    setLoading(false);
  }

  async function test() {
    const { data, error } = await supabase.auth.signUp({
      email: "testuser@example.com",
      password: "12345678",
    });

    if (error) {
      console.error("Signup error:", error.message);
    } else {
      console.log("User created successfully:", data.user);
    }
  }

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          {/* <Button title="Test" disabled={loading} onPress={() => test()} /> */}
          <Input
            label="SignInEmail"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => SignInsetEmail(text)}
            value={SignInemail}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="SignInPassword"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => SignInsetPassword(text)}
            value={SignInpassword}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
          <Text style={styles.errorText}>{SignInerrorMessage}</Text>
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          {/* <Button title="Test" disabled={loading} onPress={() => test()} /> */}
          <Input
            label="SignUpEmail"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => SignUpsetEmail(text)}
            value={SignUpemail}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="SignUpPassword"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => SignUpsetPassword(text)}
            value={SignUppassword}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
          <Text style={styles.errorText}>{SignUperrorMessage}</Text>
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
});
