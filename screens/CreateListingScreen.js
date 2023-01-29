import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
} from "native-base";
import { Formik } from "formik";
const CreateListingScreen = () => {
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
  return (
    <Container p="2" w="full" bg="#f2f4f8">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Create a Listing
        </Text>
      </Heading>
      <Formik initialValues={formData}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <Stack>
            <Text fontSize="xl" mt="5" fontWeight="bold">
              Sell / Rent
            </Text>
            <Flex direction="row">
              <Button
                mx="1"
                w="20"
                              variant='unstyled'
                bg={formData.type === "sale" ? "#00cc66" : "white"}
              >
                Sell
              </Button>
              <Button
                w="20"
                p="3"
                bg={formData.type === "rent" ? "#00cc66" : "white"}
              >
                Rent
              </Button>
            </Flex>
          </Stack>
        )}
      </Formik>
    </Container>
  );
};

export default CreateListingScreen;
