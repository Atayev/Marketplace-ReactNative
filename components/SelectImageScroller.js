import React from "react";
import { Image, ScrollView } from "native-base";

const SelectImageScroller = ({ images }) => {
  return (
    <ScrollView horizontal mt="1">
      {images.map((image, index) => (
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
    </ScrollView>
  );
};

export default SelectImageScroller;
