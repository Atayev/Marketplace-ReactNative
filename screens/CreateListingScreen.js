import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  ScrollView,
  Image,
} from "native-base";
import CustomInput from "../components/CustomInput";
import { launchImageLibrary } from "react-native-image-picker";
import { Button, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Loading } from "../components/Loading";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toggler from "../components/Toggler";
import SelectImageButton from "../components/SelectImageButton";
import SelectImageScroller from "../components/SelectImageScroller";
import CustomButton from "../components/CustomButton";
import { listingValidationSchema } from "../utils/validationSchemas";
const CreateListingScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState(true);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    geolocation: { lat: null, lng: null },
  });

  const selectImages = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 6,
      quality: 1,
      mediaType: "photo",
    });
    const resultArr = result.assets.map((image) => image.uri);
    return resultArr;
  };

  const handleUpload = async (values) => {
    setLoading(true);
    let formDataCopy = {};
    if (Number(values.discountedPrice) > Number(values.regularPrice)) {
      alert("discounted price cant be greater than regular");
      return;
    }
    if (values.images.length > 6) {
      setLoading(false);
      alert("Max 6 photos allowed");
      return;
    }

    if (geoLocation && values.address != null) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${values.address}&key=${process.env.GMAPI_KEY}`
        );
        const data = await response.json();
        if (data.status !== "OK") {
          throw new Error(data.status);
        }
        const result = data.results[0];

        formData.geolocation.lat = result.geometry.location.lat;
        formData.geolocation.lng = result.geometry.location.lng;
      } catch (error) {
        console.log("something went wrong geo");
      }
    }
    // Check if user is signed in
    const user = auth().currentUser;
    if (!user) {
      setLoading(false);
      alert("User is not signed in");
      return;
    }

    // Store image in Firebase Storage
    const storeImage = async (image) => {
      const fileName = `${user.uid}-${image}`;
      const storageRef = storage().ref("images/").child(fileName);

      try {
        const upload = storageRef.putFile(image);
        upload.on("state_changed", (taskSnap) => {
          console.log(
            `${taskSnap.bytesTransferred} transferred out of ${taskSnap.totalBytes}`
          );
        });
        await upload;
        const downloadUrl = await storageRef.getDownloadURL();
        return downloadUrl;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    try {
      const imgUrls = await Promise.all(
        values.images.map(async (image) => {
          try {
            return await storeImage(image);
          } catch (error) {
            console.error(error);
          }
        })
      );
      formDataCopy = {
        ...values,
        imgUrls,
        userRef: user.uid,
        geolocation: formData.geolocation,
        timestamp: firestore.Timestamp.now(),
      };

      delete formDataCopy.images;
      !formDataCopy.offer && delete formDataCopy.discountedPrice;
      await firestore().collection("listings").add(formDataCopy);
      const listing = { ...formDataCopy };

      navigation.navigate("HouseDetailsScreen", { listing });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <ScrollView p="2" w="full" h="full" bg="#f2f4f8">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Create a Listing
        </Text>
      </Heading>
      <Formik
        validationSchema={listingValidationSchema}
        initialValues={formData}
        onSubmit={(values) => handleUpload(values)}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <Stack marginX="2">
            <Text fontSize="xl" mt="5" fontWeight="bold">
              Sell / Rent
            </Text>
            <Flex direction="row">
              <TouchableOpacity
                style={{
                  backgroundColor: values.type === "sale" ? "#00cc66" : "white",
                  padding: 20,
                  borderRadius: 15,
                }}
                activeOpacity={values.type}
                onPress={() =>
                  handleChange({
                    target: { name: "type", value: "sale" },
                  })
                }
              >
                <Text
                  fontSize="md"
                  color={values.type === "sale" ? "white" : "black"}
                >
                  Sell
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={values.type}
                onPress={() =>
                  handleChange({
                    target: { name: "type", value: "rent" },
                  })
                }
                style={{
                  backgroundColor: values.type === "rent" ? "#00cc66" : "white",
                  padding: 20,
                  marginLeft: 5,
                  borderRadius: 15,
                }}
              >
                <Text
                  fontSize="md"
                  color={values.type === "rent" ? "white" : "black"}
                >
                  Rent
                </Text>
              </TouchableOpacity>
            </Flex>
            <Text fontSize="xl" mt="5" fontWeight="bold">
              Name
            </Text>
            <CustomInput
              value={values.name}
              onChange={handleChange}
              name="name"
              w="sm"
            />
            {errors.name && (
              <Text fontSize="sm" color="red.500" pl={3}>
                {errors.name}
              </Text>
            )}

            <Text fontSize="xl" mt="5" fontWeight="bold">
              Address
            </Text>
            <CustomInput
              value={values.address}
              onChange={handleChange}
              name="address"
              w="sm"
            />
            {errors.address && (
              <Text fontSize="sm" color="red.500" pl={3}>
                {errors.address}
              </Text>
            )}
            <Flex direction="row" w="full">
              <Box mr="5" w="1/3">
                <Text fontSize="xl" mt="5" fontWeight="bold">
                  Bedrooms
                </Text>
                <CustomInput
                  value={values.bedrooms}
                  onChange={handleChange}
                  name="bedrooms"
                  w="full"
                  type="number-pad"
                />
                {errors.bedrooms && (
                  <Text fontSize="sm" color="red.500" pl={3}>
                    {errors.bedrooms}
                  </Text>
                )}
              </Box>

              <Box w="1/3">
                <Text fontSize="xl" mt="5" fontWeight="bold">
                  Bathrooms
                </Text>
                <CustomInput
                  value={values.bathrooms}
                  onChange={handleChange}
                  name="bathrooms"
                  w="full"
                  type="number-pad"
                />
                {errors.bathrooms && (
                  <Text fontSize="sm" color="red.500" pl={3}>
                    {errors.bathrooms}
                  </Text>
                )}
              </Box>
            </Flex>
            <Box>
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Parking spot
              </Text>
              <Toggler
                value={values.parking}
                name="parking"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Furnished
              </Text>
              <Toggler
                value={values.furnished}
                name="furnished"
                onChange={handleChange}
              />
            </Box>

            <Box>
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Offer
              </Text>
              <Toggler
                value={values.offer}
                name="offer"
                onChange={handleChange}
              />
            </Box>
            <Box
              style={{
                marginBottom: values.offer ? 3 : 15,
              }}
            >
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Regular price
              </Text>
              <Flex direction="row">
                <CustomInput
                  value={values.regularPrice}
                  onChange={handleChange}
                  name="regularPrice"
                  w="20"
                  type="number-pad"
                />
                {errors.regularPrice && (
                  <Text fontSize="sm" color="red.500" pl={3}>
                    {errors.regularPrice}
                  </Text>
                )}

                {values.type === "rent" && (
                  <Text fontSize="lg" mt="2" ml="2" fontWeight="bold">
                    /month
                  </Text>
                )}
              </Flex>
            </Box>
            {values.offer && (
              <Box mb="10">
                <Text fontSize="xl" mt="5" fontWeight="bold">
                  Discounted Price
                </Text>
                <CustomInput
                  value={values.discountedPrice}
                  onChange={handleChange}
                  name="discountedPrice"
                  w="20"
                  type="number-pad"
                />
              </Box>
            )}
            <Box mb="24">
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Upload images
              </Text>
              <Text fontSize="sm" mt="1" fontWeight="bold">
                The first image will be the cover (max 6).
              </Text>
              <SelectImageButton
                selectImage={selectImages}
                value={values.images}
                name="images"
                onChange={handleChange}
              />
              {errors.images && (
                <Text fontSize="sm" color="red.500" pl={3}>
                  {errors.images}
                </Text>
              )}
              {values.images && <SelectImageScroller images={values.images} />}
              <CustomButton
                onPress={handleSubmit}
                name="Create a listing"
                valid={!isValid}
              />
            </Box>
          </Stack>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreateListingScreen;
