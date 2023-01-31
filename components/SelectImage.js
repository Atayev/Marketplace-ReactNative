import { TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { Box, Text } from "native-base";

const SelectImage = ({ handleChange, images }) => {
  const [imagesc, setImagesc] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectImages = async () => {
    setLoading(true);
    const result = await launchImageLibrary({
      selectionLimit: 6,
      quality: 1,
      mediaType: "photo",
    });
    setImagesc(result.assets.map((image) => image.uri));
    setLoading(false);
  };
  const handlePress = () => {
    selectImages(),
      handleChange({
        target: { name: "images", value: imagesc },
      });
    };
  return (
    <Box mb="24">
      <Text fontSize="xl" mt="5" fontWeight="bold">
        Upload images
      </Text>
      <Text fontSize="sm" mt="1" fontWeight="bold">
        The first image will be the cover (max 6).
      </Text>
      <TouchableOpacity onPress={()=>handlePress()} activeOpacity={images}>
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
      {images != null && (
        <TouchableOpacity onPress={() => (images = null)}>
          <Text>Delete Images</Text>
        </TouchableOpacity>
      )}
      {images &&
        images.map((image) => (
          <Image
            source={{
              uri: image,
            }}
            w="50"
            h="50"
            alt="ff"
          />
        ))}
    </Box>
  );
};

export default SelectImage;
