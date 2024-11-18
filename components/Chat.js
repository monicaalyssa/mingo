import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Bubble, Composer, GiftedChat, Send } from "react-native-gifted-chat";
import { Platform, KeyboardAvoidingView } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { chatBackground } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        padding: 5,
      },
      left: {
        padding:5,
      }
    }}
    />
  }

  const renderSend = (props) => {
    return <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      alignItems: 'center',
      display: "flex",
      justifyContent: 'center',
      paddingRight: 11,
      marginBottom: 18,
    }}
    >
    </Send>
  }

   const renderComposer = props => (
    <Composer
      {...props}
      textInputStyle={{
        borderColor: '#f1f3f5',
        backgroundColor: '#f1f3f5',
        borderWidth: 1,
        borderRadius: 30,
        paddingBottom: 13,
        paddingTop: 13,
        marginTop: 10,
        marginBottom: 22,
        marginleft: 10,
        marginRight: 10,
        paddingHorizontal: 18,
      }}
    />
  )


  useEffect(() => {
    navigation.setOptions({ title: "Messages" });
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello :-)",
        createdAt: new Date(),
        name: "Tester",
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
      _id: 2,
      text: 'Welcome, this is your first chat!',
      createdAt: new Date(),
      system: true,
      }
    ]);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: chatBackground }]}>
    
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      renderComposer={renderComposer}
      renderSend={renderSend}
      user={{
        _id: 1
      }} />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "600"
  }
});

export default Chat;
