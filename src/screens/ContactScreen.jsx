import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ContactScreen = () => {
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "red",
        }}
      >
        Thuận Nè
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "red",
        }}
      >
        gì vậy ba
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
