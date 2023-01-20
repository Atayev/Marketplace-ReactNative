import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigation } from "./components/navigation/TabNavigation";
import { NativeBaseProvider } from "native-base";
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>

      <TabNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
