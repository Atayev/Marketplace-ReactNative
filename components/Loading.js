import { ActivityIndicator, View } from "react-native";

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#00cc66" />
    </View>
  );
};
