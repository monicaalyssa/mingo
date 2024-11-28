import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCJFRk6UgbsVG7jwXqQ8yEFKZ8T8U0ZPgk",
    authDomain: "meet-63330.firebaseapp.com",
    projectId: "meet-63330",
    storageBucket: "meet-63330.firebasestorage.app",
    messagingSenderId: "191277134995",
    appId: "1:191277134995:web:73fbb8f083ab45a3aa8966"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Get Started" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
