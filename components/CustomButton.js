import { Text } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton = ({onPress,name,valid}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={valid}>
                <Text
                  fontSize="xl"
                  textAlign="center"
                  p="2"
                  shadow="5"
                  fontWeight="bold"
                  mt="10"
                  bg="#00cc66"
                  borderRadius="lg"
                  color="white"
                  
                >
                  {name}
                </Text>
              </TouchableOpacity>
  )
}

export default CustomButton