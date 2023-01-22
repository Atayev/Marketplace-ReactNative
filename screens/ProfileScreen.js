import React, { useState } from "react";
import SignIn from "../components/SignIn";
const ProfileScreen = () => {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return <SignIn />;
  }
  return (
    <View></View>
  );
};

export default ProfileScreen;
