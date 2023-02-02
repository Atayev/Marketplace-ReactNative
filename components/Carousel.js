import { TouchableOpacity, FlatList } from "react-native";
import { Box, Text, Image, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import firestore from "@react-native-firebase/firestore";
const Carousel = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);

  const fetchData = async () => {
    firestore()
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
  };
  console.log(listings)
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <Loading />;
  return (
    <ScrollView>
      <Text fontSize="xl" fontWeight="bold">
        Recomended
      </Text>
      <ScrollView horizontal mt="3" showsHorizontalScrollIndicator={false}>
        {listings.map((listing, id) => (
          <TouchableOpacity
            key={id}
            onPress={() =>
              navigation.navigate("HouseDetailsScreen", { listing })
            }
          >
            <Box borderRadius="3xl" overflow="hidden" position="relative">
              <Image
                source={{
                  uri: listing.imgUrls[0],
                }}
                alt={listing?.name}
                width="full"
                height="80"
                mx="2"
                style={{
                  aspectRatio: 1,
                }}
              />
              <Box position="absolute" top="7" left="5" zIndex="50">
                <Text
                  fontSize="xl"
                  bg="#000000b7"
                  color="white"
                  p="3"
                  borderRadius="lg"
                >
                  {listing?.name}
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
                  ${listing?.discountedPrice ?? listing?.regularPrice}{" "}
                  {listing?.type === "rent" && "/ month"}
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
