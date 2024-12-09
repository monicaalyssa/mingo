import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const CustomActions = ({ name, wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = [
            'Choose From Library', 
            'Take Photo', 
            'Send Location', 
            'Cancel'
        ];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    try {
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
  
      const response = await fetch(imageURI);
      if (!response.ok) throw new Error("Failed to fetch image URI.");
      const blob = await response.blob();
  
      uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        const imageURL = await getDownloadURL(snapshot.ref);
        onSend([
          {
            _id: uuidv4(),
            createdAt: Timestamp.now(),
            user: {
              _id: userID,
              name: name,
            },
            image: imageURL,
          },
        ]);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image. Please try again.");
    }
  };
  

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
    } else Alert.alert("Permissions haven't been granted.");
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
    } else Alert.alert("Permissions haven't been granted.");
  };

  const getLocation = async () => {
    let permission = await Location.requestForegroundPermissionsAsync();
    if (permission?.granted) {
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend([
            {
                createdAt: Timestamp.now(),
                _id: uuidv4(),
                user: {
                    _id: userID,
                    name: name
                },
                location: {
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                }
            }
        ]);
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  return (
    <TouchableOpacity
        style={styles.container} 
        onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    marginLeft: 15,
    marginBottom: 35,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;