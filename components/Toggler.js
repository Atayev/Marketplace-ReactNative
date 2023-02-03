import {  TouchableOpacity } from 'react-native'
import React from 'react'
import { Flex, Text } from 'native-base'

const Toggler = ({ value, name, onChange }) => {
  return (
    <Flex direction="row">
                <TouchableOpacity
                  style={{
                    backgroundColor: value ? "#00cc66" : "white",
                    padding: 20,
                    borderRadius: 15,
                  }}
                  activeOpacity={value}
                  onPress={() =>
                    onChange({
                      target: { name: name, value: true },
                    })
                  }
                >
                  <Text
                    fontSize="md"
                    color={value ? "white" : "black"}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={value}
                  onPress={() =>
                    onChange({
                      target: { name: name, value: false },
                    })
                  }
                  style={{
                    backgroundColor: value ? "white" : "#00cc66",
                    padding: 20,
                    marginLeft: 5,
                    borderRadius: 15,
                  }}
                >
                  <Text
                    fontSize="md"
                    color={value ? "black" : "white"}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </Flex>
  )
}

export default Toggler