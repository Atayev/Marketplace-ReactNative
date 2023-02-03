import React from "react";
import { Input } from "native-base";
const InputDefault = ({ value, onChange, name,w }) => {
  return (
    <Input
      value={value}
      onChangeText={() => onChange(name)}
      bg="white"
      borderRadius={15}
      width={w}
    />
  );
};

export default InputDefault;
