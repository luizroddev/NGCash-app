import { useAuth } from "../context/auth";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";

export default function Home() {
  const { signed } = useAuth();
  return signed ? <HomeScreen /> : <LoginScreen />;
}
