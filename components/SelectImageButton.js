import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "native-base";

const SelectImageButton = ({ selectImage, value, name, onChange }) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        const updatedimages = await selectImage();
        onChange({
          target: {
            name: name,
            value: updatedimages,
          },
        });
      }}
      activeOpacity={value}
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
  );
};

export default SelectImageButton;
