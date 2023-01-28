import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../../screens/ExploreScreen";
import OffersScreen from "../../screens/OffersScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SignUpModal from "../SignUpModal";
import SignIn from "../SignIn";
import auth from "@react-native-firebase/auth";
import CreateListing from "../CreateListing";
import RentCategoryScreen from "../../screens/RentCategoryScreen";
import SellCategoryScreen from "../../screens/SellCategoryScreen";
import HouseDetailsScreen from "../../screens/HouseDetailsScreen";
const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="ExploreStack"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="rent"
        component={RentCategoryScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="sale"
        component={SellCategoryScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HouseDetailsScreen"
        component={HouseDetailsScreen}
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
    <ProfileStack.Navigator
      initialRouteName={auth().currentUser ? "Profile" : "SignIn"}
    >
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ presentation: "formSheet", headerShown: false }}
      />
      <ProfileStack.Screen
        name="SignUp"
        component={SignUpModal}
        options={{ presentation: "formSheet", headerShown: false }}
      />
      <ProfileStack.Screen
        name="CreateaListing"
        component={CreateListing}
        options={{ presentation: "formSheet", headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};
