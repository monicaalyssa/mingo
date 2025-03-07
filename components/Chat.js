import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Bubble, Composer, GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { Platform, KeyboardAvoidingView } from "react-native";
import { onSnapshot, orderBy, query, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name } = route.params;
  const { chatBackground } = route.params;
  const [messages, setMessages] = useState([]);
  const { userID } = route.params
  let unsubMessages;

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
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate() || new Date(), })
        })
        cacheMessages(newMessages)
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages;
    }
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try { await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message)
    }
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setLists(JSON.parse(cachedMessages));
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions name={name} onSend={onSend} userID={userID} storage={storage} {...props}/>;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: chatBackground }]}>
    
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderInputToolbar={renderInputToolbar}
      renderUsernameOnMessage
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
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
