import React from "react";
import { Input } from "native-base";
const CustomInput = ({ value, onChange, name, w, type }) => {
  return (
    <Input
      value={value}
      onChangeText={onChange(name)}
      bg="white"
      borderRadius={15}
      width={w}
      keyboardType={type}
    />
  );
};

export default CustomInput;
