import React from "react";
import { Box, Flex, Image, Text, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OfferItem = ({ listing }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      flex={1}
      flexDir="row"
      w="96"
      h="full"
      my="4"
      onPress={() => navigation.navigate("HouseDetailsScreen", { listing })}
    >
      <Box width="56" mr="2">
        <Image
          borderRadius="lg"
          shadow="9"
          source={{
            uri:
              listing.imgUrls && listing.imgUrls.length > 0
                ? listing.imgUrls[0]
                : "default_image_url",
          }}
          alt={listing.name}
          height={170}
        />
      </Box>
      <Box width="40">
        <Text fontSize="sm" fontWeight="bold" color="gray.500">
          {listing.location ? listing.location : listing.address}
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {listing.name}
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="#00cc66">
          ${listing.offer ? listing.discountedPrice : listing.regularPrice}
          {listing.type === "rent" ? "/month" : ""}
        </Text>
        <Flex mt="2" direction="row">
          <Ionicons name="bed" size={25} style={{ paddingEnd: 2 }} />
          <Text mt="1">
            {listing.bedrooms > 1
              ? `${listing.bedrooms}  Bedrooms`
              : "1 Bedroom"}
          </Text>
        </Flex>
        <Flex mt="2" direction="row">
          <Ionicons name="water" size={25} style={{ paddingEnd: 2 }} />
          <Text mt="1">
            {listing.bathrooms > 1
              ? `${listing.bathrooms}  Bathrooms`
              : "1 Bathroom"}
          </Text>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default OfferItem;
