import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackScreen,
  OffersStackScreen,
  ProfileStackScreen,
} from "./StackNavigation";

import { Ionicons } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Explore") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "Offers") {
            iconName = focused ? "pricetags" : "pricetags-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={32} />;
        },
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 12 },
        tabBarStyle: { height: 70, padding: 10 },
        tabBarActiveTintColor: "#2c2c2c",
      })}
    >
      <BottomTab.Screen
        name="Explore"
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Offers"
        component={OffersStackScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};
