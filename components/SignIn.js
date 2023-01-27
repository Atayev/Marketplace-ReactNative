import React, { useState } from "react";
import {
  Container,
  Heading,
  Text,
  Input,
  Stack,
  Pressable,
  IconButton,
  Flex,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { loginValidationSchema } from "../utils/validationSchemas";
import auth from "@react-native-firebase/auth";
const SignIn = () => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  //Google authetification
  const handleGLogin = () => {};
  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Explore");
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <Container padding={4} w="full">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Welcome Back!
        </Text>
      </Heading>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <Stack space={5} marginTop={5}>
            <Input
              type="email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              variant="outline"
              p={2}
              placeholder="Email"
              size="lg"
              outlineColor="black"
              focusOutlineColor="gray.500"
              borderRadius="3xl"
              bg="white"
              InputLeftElement={
                <Ionicons name="person" size={25} style={{ marginLeft: 10 }} />
              }
              w="96"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text fontSize="sm" color="red.500" pl={3}>
                {errors.email}
              </Text>
            )}
            <Input
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              variant="outline"
              type={show ? "text" : "password"}
              p={2}
              placeholder="Password"
              size="lg"
              outlineColor="black"
              focusOutlineColor="gray.500"
              borderRadius="3xl"
              bg="white"
              InputLeftElement={
                <Ionicons
                  name="lock-closed"
                  size={25}
                  style={{ marginLeft: 10 }}
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Ionicons
                    name={show ? "eye" : "eye-off"}
                    size={25}
                    color="muted.400"
                    style={{ right: 10 }}
                  />
                </Pressable>
              }
              w="96"
              secureTextEntry={show ? false : true}
            />
            {errors.password && (
              <Text fontSize="sm" color="red.500" pl={3}>
                {errors.password}
              </Text>
            )}
            <Pressable
              onPress={() => navigation.navigate("ForgotPassword")}
              mt={2}
            >
              <Text color="#00cc66" ml={2}>
                Forgot Password
              </Text>
            </Pressable>
            <Flex
              mt={10}
              ml={2}
              justify="flex-end"
              direction="row"
              align="center"
              w="96"
            >
              <Text fontSize="2xl" fontWeight="bold" m={2}>
                Sign in
              </Text>
              <IconButton
                mr={2}
                bg={!isValid ? "gray.400" : "#00cc66"}
                borderRadius={50}
                onPress={handleSubmit}
                icon={<Ionicons name="chevron-forward" size={23} />}
                disabled={!isValid}
              />
            </Flex>
          </Stack>
        )}
      </Formik>

      <Flex justify="center" align="center" w="96" mt={10}>
        <Text fontSize="md">Sign In With</Text>
        <IconButton
          onPress={handleGLogin}
          icon={<Ionicons name="logo-google" size={30} color="#00cc66" />}
        />
        <Text fontSize="md">
          Do not have an account?{" "}
          <Text color="#00cc66" onPress={() => navigation.navigate("SignUp")}>
            Sign up
          </Text>
        </Text>
      </Flex>
    </Container>
  );
};

export default SignIn;
