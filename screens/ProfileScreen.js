import React, { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import auth from "@react-native-firebase/auth";
import {
  Button,
  Container,
  Heading,
  Text,
  Flex,
  Input,
  Stack,
} from "native-base";
import { Loading } from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import firestore from "@react-native-firebase/firestore";
const ProfileScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    setIsLoading(true);
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return subscriber;
  }, []);

  //logout functions
  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log("user signed out");
    } catch (error) {
      console.log("something went wrong");
    }
  };

  // personal data changing func
  const handleChange = async (values) => {
    try {
      const { currentUser } = auth();
      if (currentUser.displayName !== values.name)
        await currentUser.updateProfile({ displayName: values.name });
      await firestore().collection("users").doc(currentUser.uid).update({
        name: values.name,
      });
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) return <Loading />;
  if (!user) return <SignIn />;
  return (
    <Container padding={4} w="full" bg='#f2f4f8'>
      <Heading paddingTop={10}>
        <Flex justify="space-between" direction="row" w="96">
          <Text fontSize="4xl" fontWeight="extrabold">
            My Profile
          </Text>
          <Button
            bg="#00cc66"
            fontSize="md"
            px="3"
            py={0}
            borderRadius="3xl"
            onPress={handleLogout}
            shadow="5"
          >
            Logout
          </Button>
        </Flex>
      </Heading>

      <Formik
        initialValues={{ name: user?.displayName, email: user?.email }}
        onSubmit={(values) => handleChange(values)}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <>
            <Flex justify="space-between" direction="row" w="96" py="5">
              <Text fontSize="xl" fontWeight="bold">
                Personal Details
              </Text>

              <Text
                color="#00cc66"
                fontSize="md"
                fontWeight="bold"
                pt="0.5"
                onPress={() => {
                  changeDetails && handleSubmit();
                  setChangeDetails(!changeDetails);
                }}
              >
                {changeDetails ? "Done" : "Change personal Details"}
              </Text>
            </Flex>
            <Stack
              bg="white"
              w="96"
              borderColor="black"
              p={8}
              borderRadius="xl"
              shadow="5"
            >
              <Input
                value={values.name}
                onChangeText={handleChange("name")}
                isDisabled={!changeDetails}
                fontWeight="bold"
                fontSize="lg"
                borderColor="white"
                p="0"
              />
              <Input
                value={values.email}
                onChangeText={handleChange("email")}
                isDisabled
                fontWeight="bold"
                fontSize="md"
                borderColor="white"
                p="0"
              />
            </Stack>
          </>
        )}
      </Formik>
      <Button
        leftIcon={<Ionicons name="home" size={30} style={{ paddingEnd: 5 }} />}
        bg="white"
        w="96"
        borderRadius="2xl"
        mt="10"
        p="3"
      >
        <Text
          color="black"
          fontWeight="bold"
          fontSize="md"
          pt="1"
          onPress={() => navigation.navigate("CreateaListing")}
        >
          Sell or Rent your Home/Apart/House
        </Text>
      </Button>
    </Container>
  );
};

export default ProfileScreen;
