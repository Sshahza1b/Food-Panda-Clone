import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const OrderScreen = () => {
  return (
    <SafeAreaView>
      

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>

      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({});

export default OrderScreen;