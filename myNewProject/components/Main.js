import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { ActivityIndicator } from "react-native";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 500);
    dispatch(authStateChangeUser());
  }, []);

  return !loader ? (
    <ActivityIndicator
      size="large"
      color="#FF6C00"
      style={{
        marginTop: "100%",
      }}
    />
  ) : (
    <NavigationContainer>{routing}</NavigationContainer>
  );
};

export default Main;