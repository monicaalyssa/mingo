import { useState } from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import background from "../assets/background2.png";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [chatBackground, setChatBackground] = useState("");
  const [selectedBackground, setSelectedBackground] = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "flex-end" }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.containerScroll} style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
              <View style={styles.titleFlex}>
                <Text style={styles.title}>Mingo</Text>
              </View>
              <View style={[styles.inputFlex]}>
                <Text style={styles.subtitle}>Messaging & Chat</Text>
                <Text style={styles.desc}>Provide a display name</Text>

                <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder="Your Name" />
                <Text style={styles.desc}>Choose a background color</Text>

                <View style={styles.buttonFlex}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBackground(1), setChatBackground("#f5edff");
                    }}
                    style={[styles.circle, styles.circle1, selectedBackground === 1 && styles.selectedBackground]}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBackground(2), setChatBackground("#feeef8");
                    }}
                    style={[styles.circle, styles.circle2, selectedBackground === 2 && styles.selectedBackground]}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBackground(3), setChatBackground("#e9f9ee");
                    }}
                    style={[styles.circle, styles.circle3, selectedBackground === 3 && styles.selectedBackground]}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBackground(4), setChatBackground("#edf6ff");
                    }}
                    style={[styles.circle, styles.circle4, selectedBackground === 4 && styles.selectedBackground]}
                  ></TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Chat", { name: name, chatBackground: chatBackground })}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Lets Chat</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleFlex: {
    flex: 1,
    paddingTop: 65
  },
  inputFlex: {
    justifyContent: "flex-end",
    paddingBottom: 60,
    backgroundColor: "#fff",
    paddingVertical: 22,
    borderRadius: 30
  },
  subtitle: {
    fontWeight: "600",
    color: "#A254B6",
    fontSize: 26,
    letterSpacing: 0.2,
    textAlign: "center"
  },
  selectedBackground: {
    shadowColor: "rgb(90, 200, 250)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  containerScroll: {
    flexGrow: 1
  },
  textInput: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "#D9D9D9",
    fontSize: 16,
    color: "#B3B3B3"
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    color: "#fff",
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#A254B6",
    width: "30%",
    alignSelf: "center",
    borderRadius: 8
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 15
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#fff",
    padding: 4
  },
  circle1: {
    backgroundColor: "#f5edff"
  },
  circle2: {
    backgroundColor: "#feeef8"
  },
  circle3: {
    backgroundColor: "#e9f9ee"
  },
  circle4: {
    backgroundColor: "#edf6ff"
  },
  buttonFlex: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginBottom: 35,
    marginTop: 15
  },
  desc: {
    textAlign: "center",
    fontSize: 17,
    color: "#555555",
    marginTop: 7
  }
});

export default Start;
