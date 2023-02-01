import React from "react";
import { Container, Box, Text, ScrollView, Image, Flex } from "native-base";
import Map from "../components/Map";
const HouseDetailsScreen = ({ route }) => {
  const { listing } = route.params;
  const {
    bedrooms,
    bathrooms,
    discountedPrice,
    regularPrice,
    furnished,
    geolocation: { lat, lng },
    imgUrls,
    key,
    latitude,
    longtitude,
    location,
    name,
    offer,
    parking,
    type,
    userRef,
    } = listing;
  return (
    <Box p="2" w="full" height='full' bg="#f2f4f8">
      <ScrollView horizontal mt="1" showsHorizontalScrollIndicator={false}>
        {listing.imgUrls.map((item) => (
          <Box key={item}>
            <Image
              source={{
                uri: item,
              }}
              alt={item}
              width="full"
              mx="1"
              style={{
                aspectRatio: 1,
                  borderRadius: 20,
                height:320
              }}
            />
          </Box>
        ))}
      </ScrollView>
      <Flex mt="1">
        <Text fontSize="3xl" fontWeight="extrabold">
          {name} - {offer ? discountedPrice + "$/month" : regularPrice}$
        </Text>
        <Text fontSize="xl" fontWeight="semibold">
          {location}
        </Text>
        <Flex direction="row" pt='1'>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            borderRadius="2xl"
            bg="#00cc66"
            color="white"
            px="2"
            py="1"
            width="20"
            shadow="9"
            mx="2"
            textAlign="center"
          >
            For {type}
          </Text>
          {offer && (
            <Text
              fontSize="lg"
              fontWeight="semibold"
              borderRadius="2xl"
              bg="black"
              color="white"
              px="2"
              py="1"
              width="20"
              shadow="9"
              mx="2"
              textAlign="center"
            >
              {regularPrice - discountedPrice}$
            </Text>
          )}
        </Flex>
        <Box >
          <Text color="gray.500">
            {bedrooms > 1 ? `${bedrooms} Bedrooms` : "1 Bedroom"}
          </Text>
          <Text color="gray.500">
            {bathrooms > 1 ? `${bathrooms} Bathrooms` : "1 Bathroom"}
          </Text>
          <Text color="gray.500">{parking && "Parking Spot"}</Text>
          <Text color="gray.500">{furnished && "Furnished"}</Text>
        </Box>
        {/* map  */}
      </Flex>
          <Box width='full' height='1/4'>
          {/* <Map longitude={listing?.geolocation.lng} latitude={listing?.geolocation.lat} /> */}
          </Box>
    </Box>
  );
};

export default HouseDetailsScreen;
