import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import OfferItem from "../components/OfferItem";
import { Box, FlatList, Heading, Text } from "native-base";
import { Loading } from "../components/Loading";
const SellCategoryScreen = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      firestore()
        .collection("listings")
        .where("type", "==", "sale")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnap) => {
          const listingsArr = [];

          querySnap.forEach((docSnap) => {
            listingsArr.push({
              ...docSnap.data(),
              key: docSnap.id,
            });
          });
          setIsLoading(false);
          setListings(listingsArr);
        });
    };
    fetchListings();
  }, []);
  console.log(listings);
  if (isLoading) return <Loading />;
  return (
    <Box p="2" w="full" bg="#f2f4f8">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Places for sell
        </Text>
      </Heading>
      <FlatList
        data={listings}
        renderItem={(listing) => <OfferItem listing={listing.item} />}
        keyExtractor={(listing) => listing.key}
      />
    </Box>
  );
};

export default SellCategoryScreen;
