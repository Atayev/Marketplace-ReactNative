import { View, Text, Image } from "react-native";
import React from "react";

const SellCategoryScreen = ({ route }) => {
  const { id, name, image } = route.params;
  console.log(image);
  return (
    <View>
      <Text>
        SellCategoryScreen{id}, {name}
      </Text>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

export default SellCategoryScreen;
