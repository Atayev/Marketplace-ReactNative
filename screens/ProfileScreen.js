import React, { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import auth from "@react-native-firebase/auth";
const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (isLoading) setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) return null;

  if (!user) {
    return <SignIn />;
  }
  return <View>{user.email}</View>;
};

export default ProfileScreen;
