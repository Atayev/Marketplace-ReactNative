import { Container, Flex, Heading, Text } from "native-base";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";

const ExploreScreen = () => {
  return (
    <Container p="2" w="full" bg="#f2f4f8">
      <Heading paddingTop={10}>
        <Text fontSize="4xl" fontWeight="extrabold">
          Explore
        </Text>
      </Heading>
      <Flex py="5" px="1" w="96">
        <Carousel />
        <Categories />
      </Flex>
    </Container>
  );
};

export default ExploreScreen;
