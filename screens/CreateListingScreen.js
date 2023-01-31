import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Input,
  ScrollView,
  Image,
} from "native-base";
import { launchImageLibrary } from "react-native-image-picker";
import { Button, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Loading } from "../components/Loading";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const CreateListingScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
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
    latitude: 0,
    longitude: 0,
  });

  const selectImages = async () => {
    setLoading(true);
    const result = await launchImageLibrary({
      selectionLimit: 6,
      quality: 1,
      mediaType: "photo",
    });
    setLoading(false);
    return result.assets.map((image) => image.uri);
  };

  const handleUpload = async (values) => {
    if (values.discountedPrice > values.regularPrice) {
      setLoading(false);
      alert("discounted price cant be greater than regular");
    }
    if (values.images.length > 6) {
      setLoading(false);
      alert("Max 6 photos allowed");
    }

    //storage image upload

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const fileName = `${auth().currentUser.uid}-${image.name}`;
        const storageRef = storage().ref("images/", fileName);

        const upload = storageRef.putFile(image);
        upload.on("state_changed", (taskSnap) => {
          console.log(
            `${taskSnap.bytesTransferred} transferred out of ${taskSnap.totalBytes}`
          );
        });
        upload.then(() => {
          console.log("image Uploaded");
        }),
          (error) => {
            reject(error);
          },
          () => {
            storage()
              .ref(upload.snapshot.ref)
              .getDownloadURL()
              .then((downloadUrl) => {
                console.log(downloadUrl);
                resolve(downloadUrl);
              });
          };
      });
    };
    const imgUrls = await Promise.all(
      values.images.map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      alert("something went wrong");
      return;
    });

    const formDataCopy = {
      ...values,
      imgUrls,
      timestamp: firestore.Timestamp.now(),
    };

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = await firestore()
      .collection("listings")
      .doc(auth().currentUser.uid)
      .set(formDataCopy);
    console.log(formDataCopy);

    navigation.navigate("HomeDetailsScreen", { id: docRef.id, ...docRef });
  };

  if (loading) <Loading />;
  // console.log("this is formdata", formData);
  return (
    <ScrollView p="2" w="full" h="full" bg="#f2f4f8">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Create a Listing
        </Text>
      </Heading>
      <Formik
        initialValues={formData}
        onSubmit={(values) => handleUpload(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
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
            <Input
              value={values.name}
              onChangeText={handleChange("name")}
              bg="white"
              borderRadius={15}
              width="sm"
            />
            <Flex direction="row">
              <Box mr="5">
                <Text fontSize="xl" mt="5" fontWeight="bold">
                  Bedrooms
                </Text>
                <Input
                  value={values.bedrooms}
                  onChangeText={handleChange("bedrooms")}
                  bg="white"
                  borderRadius={15}
                />
              </Box>
              <Box>
                <Text fontSize="xl" mt="5" fontWeight="bold">
                  Bathrooms
                </Text>
                <Input
                  value={values.bathrooms}
                  onChangeText={handleChange("bathrooms")}
                  bg="white"
                  borderRadius={15}
                />
              </Box>
            </Flex>
            <Box>
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Parking spot
              </Text>
              <Flex direction="row">
                <TouchableOpacity
                  style={{
                    backgroundColor: values.parking ? "#00cc66" : "white",
                    padding: 20,
                    borderRadius: 15,
                  }}
                  activeOpacity={values.parking}
                  onPress={() =>
                    handleChange({
                      target: { name: "parking", value: true },
                    })
                  }
                >
                  <Text
                    fontSize="md"
                    color={values.parking ? "white" : "black"}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={values.parking}
                  onPress={() =>
                    handleChange({
                      target: { name: "parking", value: false },
                    })
                  }
                  style={{
                    backgroundColor: values.parking ? "white" : "#00cc66",
                    padding: 20,
                    marginLeft: 5,
                    borderRadius: 15,
                  }}
                >
                  <Text
                    fontSize="md"
                    color={values.parking ? "black" : "white"}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </Flex>
            </Box>
            <Box>
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Furnished
              </Text>
              <Flex direction="row">
                <TouchableOpacity
                  style={{
                    backgroundColor: values.furnished ? "#00cc66" : "white",
                    padding: 20,
                    borderRadius: 15,
                  }}
                  activeOpacity={values.furnished}
                  onPress={() =>
                    handleChange({
                      target: { name: "furnished", value: true },
                    })
                  }
                >
                  <Text
                    fontSize="md"
                    color={values.furnished ? "white" : "black"}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={values.furnished}
                  onPress={() =>
                    handleChange({
                      target: { name: "furnished", value: false },
                    })
                  }
                  style={{
                    backgroundColor: values.furnished ? "white" : "#00cc66",
                    padding: 20,
                    marginLeft: 5,
                    borderRadius: 15,
                  }}
                >
                  <Text
                    fontSize="md"
                    color={values.furnished ? "black" : "white"}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </Flex>
            </Box>
            <Text fontSize="xl" mt="5" fontWeight="bold">
              Address
            </Text>
            <Input
              value={values.address}
              onChangeText={handleChange("address")}
              bg="white"
              borderRadius={15}
              width="sm"
            />
            <Box>
              <Text fontSize="xl" mt="5" fontWeight="bold">
                Offer
              </Text>
              <Flex direction="row">
                <TouchableOpacity
                  style={{
                    backgroundColor: values.offer ? "#00cc66" : "white",
                    padding: 20,
                    borderRadius: 15,
                  }}
                  activeOpacity={values.offer}
                  onPress={() =>
                    handleChange({
                      target: { name: "offer", value: true },
                    })
                  }
                >
                  <Text fontSize="md" color={values.offer ? "white" : "black"}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={values.offer}
                  onPress={() =>
                    handleChange({
                      target: { name: "offer", value: false },
                    })
                  }
                  style={{
                    backgroundColor: values.offer ? "white" : "#00cc66",
                    padding: 20,
                    marginLeft: 5,
                    borderRadius: 15,
                  }}
                >
                  <Text
                    fontSize="md"
                    color={values.furnished ? "black" : "white"}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </Flex>
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
                <Input
                  value={values.regularPrice}
                  onChangeText={handleChange("regularPrice")}
                  bg="white"
                  borderRadius={15}
                  width="20"
                  keyboardType="number-pad"
                />
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
                <Input
                  value={values.discountedPrice}
                  onChangeText={handleChange("discountedPrice")}
                  bg="white"
                  borderRadius={15}
                  width="20"
                  keyboardType="number-pad"
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
              <TouchableOpacity
                onPress={async () => {
                  const updatedimages = await selectImages();
                  handleChange({
                    target: {
                      name: "images",
                      value: updatedimages,
                    },
                  });
                }}
                activeOpacity={values.images}
              >
                <Text
                  fontSize="sm"
                  textAlign="center"
                  p="2"
                  shadow="5"
                  fontWeight="bold"
                  mt="1"
                  bg="#00cc66"
                  borderRadius="lg"
                  color="white"
                >
                  Select Images
                </Text>
              </TouchableOpacity>

              {values.images && (
                <Flex direction="row" mt="1">
                  {values.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{
                        uri: image,
                      }}
                      w="70"
                      h="70"
                      alt="ff"
                      mx="2"
                      borderRadius="3xl"
                      shadow="9"
                    />
                  ))}
                </Flex>
              )}
              <TouchableOpacity onPress={handleSubmit}>
                <Text
                  fontSize="xl"
                  textAlign="center"
                  p="2"
                  shadow="5"
                  fontWeight="bold"
                  mt="10"
                  bg="#00cc66"
                  borderRadius="lg"
                  color="white"
                >
                  Create a listing
                </Text>
              </TouchableOpacity>
            </Box>
          </Stack>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreateListingScreen;
