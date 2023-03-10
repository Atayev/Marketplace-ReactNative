import React from "react";
import { Box, Flex, Image, Pressable, Text } from "native-base";
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
          onPress={() => navigation.navigate("rent")}
        >
          <Image
            source={rentCategoryImage}
            width="full"
            h="20"
            minHeight={115}
            borderRadius="lg"
            m="0"
            alt="rent"
          />
          <Text fontSize="sm" fontWeight="semibold" pt="1">
            Places for rent
          </Text>
        </Pressable>
        <Pressable width="1/2" onPress={() => navigation.navigate("sale")}>
          <Image
            source={sellCategoryImage}
            width="full"
            h="20"
            minHeight={115}
            borderRadius="lg"
            m="0"
            alt="sell"
          />
          <Text fontSize="sm" fontWeight="semibold" pt="1">
            Places for sale
          </Text>
        </Pressable>
      </Flex>
    </Box>
  );
};

export default Categories;
