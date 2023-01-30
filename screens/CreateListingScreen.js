import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Input,
  ScrollView,
} from "native-base";
import { launchImageLibrary } from "react-native-image-picker";
import { Button, TouchableOpacity } from "react-native";
import { Formik } from "formik";
const CreateListingScreen = () => {
  const [images, setImages] = useState([]);
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
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const selectImages = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 6,
      quality: 1,
      mediaType: "photo",
    });
    setImages([...images, result.assets.map((image) => image.uri)]);
  };
  return (
    <ScrollView p="2" w="full" h="full" bg="#f2f4f8">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Create a Listing
        </Text>
      </Heading>
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("values: ", values);
            setFormData(values);
            setSubmitting(false);
          }, 400);
        }}
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
              <TouchableOpacity onPress={selectImages}  activeOpacity={values.images}>
                <Text fontSize='sm' textAlign='center' p='2' shadow='5' fontWeight='bold' mt='1' bg='#00cc66' borderRadius='lg' color='white'>Select Images</Text>
              </TouchableOpacity>
            </Box>
          </Stack>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreateListingScreen;
