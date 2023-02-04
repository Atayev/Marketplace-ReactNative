import { ActivityIndicator, View } from "react-native";
import { Text } from "native-base";
export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080",
      }}
    >
      <Text fontSize="xl" fontWeight="bold" mr="1">
        Please wait...
      </Text>
      <ActivityIndicator size="large" color="#00cc66" />
    </View>
  );
};
