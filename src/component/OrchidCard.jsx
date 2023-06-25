import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Button, IconButton, MD3Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const OrchidCard = ({ orchid, favourites, setFavourites, navigation }) => {
  const flower = {
    id: "3bd8255b-d581-4cea-bfc8-bcb2caf572e0",
    price: "$13.89",
    name: "Dancing Lady FB0154-OR",
    path: "https://www.silkflora.com.au/assets/thumbL/fb0154-or.png?20221107191110",
    type: "catteleya",
  };

  const handleLike = async (selectedOrchid) => {
    const existing = favourites.find((item) => item.id === selectedOrchid.id);
    if (existing) {
      handleDislike(selectedOrchid);
    } else {
      setFavourites((prev) => [...prev, selectedOrchid]);
      await AsyncStorage.setItem(
        "favourites",
        JSON.stringify([...favourites, selectedOrchid])
      );
    }
  };

  const handleDislike = async (selectedOrchid) => {
    setFavourites((prev) =>
      prev.filter((item) => item.id !== selectedOrchid.id)
    );
    await AsyncStorage.setItem(
      "favourites",
      JSON.stringify(favourites.filter((item) => item.id !== selectedOrchid.id))
    );
  };

  const handleShowDetail = (selctedOrchid) => {
    navigation.navigate("DetailOrchid", {
      orchid: selctedOrchid,
      favourites: favourites,
    });
  };

  const showAllertDislike = (selectedOrchid) => {
    Alert.alert("Remove from favourites", "Would you want to remove it? ", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => handleDislike(selectedOrchid),
        style: "default",
      },
    ]);
  };

  return (
    <LinearGradient
      colors={["#00FFFF", "#FFFFFF"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        borderRadius: 10,
      }}
    >
      <View style={[styles.container, styles.shadowProp]}>
        <Pressable
          style={{
            width: "auto",
            maxWidth: 100,
            height: 100,
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            marginTop: 3,
            // marginRight
          }}
          onPress={handleShowDetail.bind(null, orchid)}
        >
          <Image
            style={{
              flex: 1,
              height: undefined,
              width: 100,
              // paddingTop: 20
            }}
            resizeMode="contain"
            source={{
              uri: orchid.path,
            }}
          />
        </Pressable>
        <IconButton
          icon={
            favourites?.find((item) => item?.id === orchid.id)
              ? "cards-heart"
              : "cards-heart-outline"
          }
          mode="contained"
          iconColor={"red"}
          size={16}
          onPress={
            favourites?.find((item) => item?.id === orchid.id)
              ? showAllertDislike.bind(null, orchid)
              : handleLike.bind(null, orchid)
          }
          style={{
            position: "absolute",
            right: 0,
            alignItems: "center",
            marginTop: 50,
          }}
          animated={true}
        />
        <Pressable onPress={handleShowDetail.bind(null, orchid)}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              {orchid.name}
            </Text>

            <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
              Type: {orchid.type}
            </Text>
            <Text style={{ fontSize: 14, color: "red", fontWeight: "500" }}>
              Price: {orchid.price}
            </Text>
          </View>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default OrchidCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    minHeight: 100,
    width: "auto",
    borderRadius: 5,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    // justifyContent: "space-between",
    gap: 10,
    padding: 10,
  },
  shadowProp: {
    elevation: 3,
    shadowColor: "#1e1d1d",
    shadowOffset: {
      width: -4,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  orchid__button: {
    borderRadius: 4,
    position: "absolute",
    backgroundColor: "#1E2F97",
  },
});
