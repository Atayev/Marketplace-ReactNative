import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../../screens/ExploreScreen";
import OffersScreen from "../../screens/OffersScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SignUpModal from "../SignUpModal";

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="ExploreStack"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const OffersStack = createNativeStackNavigator();

export const OffersStackScreen = () => {
  return (
    <OffersStack.Navigator>
      <OffersStack.Screen
        name="OffersStack"
        component={OffersScreen}
        options={{ headerShown: false }}
      />
    </OffersStack.Navigator>
  );
};
const ProfileStack = createNativeStackNavigator();

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="SignUp"
        component={SignUpModal}
        options={{ presentation:'formSheet', title:'Sign Up'}}

      />
    </ProfileStack.Navigator>
  );
};
