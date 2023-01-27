import React from "react";
import { Box, Flex, Image, Pressable, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import rentCategoryImage from "../assets/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/sellCategoryImage.jpg";
import { useNavigation } from "@react-navigation/native";
const Categories = () => {
  const navigation = useNavigation();
  return (
    <Box zIndex={50} my="10">
      <Text fontSize="xl" fontWeight="bold" color="black">
        Categories
      </Text>
      <Flex direction="row" justify="space-between" mt="2">
        <Pressable
          width="1/2"
          mr="2"
          onPress={() => navigation.navigate("RentCategory")}
        >
          <Image
            source={rentCategoryImage}
            width="full"
            h="20"
            minHeight={115}
            borderRadius="lg"
            m="0"
          />
          <Text fontSize="sm" fontWeight="semibold" pt="1">
            Places for a rent
          </Text>
        </Pressable>
        <Pressable
          width="1/2"
          onPress={() => navigation.navigate("SellCategory")}
        >
          <Image
            source={sellCategoryImage}
            width="full"
            h="20"
            minHeight={115}
            borderRadius="lg"
            m="0"
          />
          <Text fontSize="sm" fontWeight="semibold" pt="1">
            Places for a sell
          </Text>
        </Pressable>
      </Flex>
    </Box>
  );
};

export default Categories;
