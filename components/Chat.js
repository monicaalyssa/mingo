import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { chatBackground } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: "Welcome, " + name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: chatBackground }]}>
      <Text style={styles.title}>Lets get started, {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 26,
    fontWeight: "600"
  }
});

export default Chat;
