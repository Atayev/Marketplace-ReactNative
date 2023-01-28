import { ActivityIndicator, View } from "react-native";

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
      <ActivityIndicator size="large" color="#00cc66" />
    </View>
  );
};
