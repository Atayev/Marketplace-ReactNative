import { View, Text } from "react-native";
import React from "react";

const RentCategoryScreen = ({ route }) => {
  const { id } = route.params;
  return (
    <View>
      <Text>RentCategoryScreen{ id }</Text>
    </View>
  );
};

export default RentCategoryScreen;
