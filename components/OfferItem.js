import React from "react";
import { Box, Flex, Image, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const OfferItem = ({ listing }) => {
  return (
    <Box flex={1} flexDir="row" w="96" h="full" my="4">
      <Box width="56" mr="2">
        <Image
          borderRadius="lg"
          shadow="9"
          source={{
            uri: listing.item.imgUrls[0],
          }}
          alt={listing.item.name}
          height={170}
        />
      </Box>
      <Box width="40">
        <Text fontSize="sm" fontWeight="bold">
          {listing.item.location}
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {listing.item.name}
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="#00cc66">
          $
          {listing.item.offer
            ? listing.item.discountedPrice
            : listing.item.regularPrice}
          {listing.item.type === "rent" ? "/month" : ""}
        </Text>
        <Flex mt="2" direction="row">
          <Ionicons name="bed" size={25} style={{ paddingEnd: 2 }} />
          <Text mt="1">
            {listing.item.bedrooms > 1
              ? `${listing.item.bedrooms}  Bedrooms`
              : "1 Bedroom"}
          </Text>
        </Flex>
        <Flex mt="2" direction="row">
          <Ionicons name="water" size={25} style={{ paddingEnd: 2 }} />
          <Text mt="1">
            {listing.item.bathrooms > 1
              ? `${listing.item.bathrooms}  Bathrooms`
              : "1 Bathroom"}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default OfferItem;
