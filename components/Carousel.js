import { TouchableOpacity } from "react-native";
import React from "react";
import { Box, Text, Image, ScrollView } from "native-base";
const Carousel = ({ data }) => {
  return (
    <ScrollView>
      <Text fontSize="xl" fontWeight="bold">
        Recomended
      </Text>
      <ScrollView horizontal mt="3" showsHorizontalScrollIndicator={false}>
        {data.map((slider) => (
          <TouchableOpacity key={slider.title}>
            <Box borderRadius="3xl" overflow="hidden" position="relative">
              <Image
                source={slider.imageUrl}
                alt={slider.title}
                width="full"
                height="80"
                mx="2"
                style={{
                  aspectRatio: 1,
                }}
              />
              <Box position="absolute" top="7" left="5" zIndex="50">
                <Text
                  fontSize="2xl"
                  bg="#000000b7"
                  color="white"
                  p="3"
                  borderRadius="lg"
                >
                  House Name
                </Text>
                <Text
                  fontSize="md"
                  borderRadius="3xl"
                  bg="#ffffffe1"
                  color="black"
                  p="1"
                  mt="2"
                  textAlign="center"
                >
                  House Price
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Carousel;
