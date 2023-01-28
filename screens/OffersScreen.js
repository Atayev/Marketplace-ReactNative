import React, { useEffect, useState } from "react";
import { Box, Text, Heading, FlatList } from "native-base";
import { Loading } from "../components/Loading";
import firestore from "@react-native-firebase/firestore";
import OfferItem from "../components/OfferItem";

const OffersScreen = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      const listings = firestore()
        .collection("listings")
        .onSnapshot((querySnapshot) => {
          const listingsArr = [];

          querySnapshot.forEach((docSnap) => {
            listingsArr.push({
              ...docSnap.data(),
              key: docSnap.id,
            });
          });
          setListings(listingsArr);
          setIsLoading(false);
        });
      return () => listings();
    };
    fetchListings();
  }, []);
  console.log(listings);
  if (isLoading) return <Loading />;
  return (
    <Box p="2" w="full" bg="#f2f4f8">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Offers
        </Text>
      </Heading>
      <FlatList
        data={listings}
        renderItem={(listing) => (
          <OfferItem listing={listing}/>
        )}
      />
    </Box>
  );
};

export default OffersScreen;
