import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Bubble, Composer, GiftedChat, Send } from "react-native-gifted-chat";
import { Platform, KeyboardAvoidingView } from "react-native";
import { onSnapshot, orderBy, query, collection, addDoc } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name } = route.params;
  const { chatBackground } = route.params;
  const [messages, setMessages] = useState([]);
  const { userID } = route.params

  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        padding: 5,
      },
      left: {
        backgroundColor: "#E6E6E6",
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

  const onSend = async (newMessages) => {
    const newMessagesRef = await addDoc(collection(db, "messages"), newMessages[0]);
  }

  useEffect(() => {
    navigation.setOptions({ title: "Messages" });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({ id: doc.id, ...doc.data() })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages;
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: chatBackground }]}>
    
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderUsernameOnMessage
      user={{
        _id: userID,
        name: name
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
