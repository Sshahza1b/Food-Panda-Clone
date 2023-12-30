import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>FOOD PANDA  </Text>
            <Text style={styles.subHeaderText}>Sign In to your account</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <Pressable
              onPress={login}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Register")} style={styles.signUpText}>
              <Text style={styles.signUpButtonText}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  headerText: {
    fontSize: 50,
    color: "#ff1493",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 300,
    marginVertical: 10,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#ff1493",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  signUpText: {
    marginTop: 20,
  },
  signUpButtonText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
});

export default LoginScreen;
