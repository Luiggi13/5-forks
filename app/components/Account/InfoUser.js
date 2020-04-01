import React from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function InfoUser(props) {
    const {
        userInfo: { photoURL, uid, displayName, email },
        setReloadData, toastRef, setIsLoading, setTextLoading
    } = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status

        if (resultPermissionCamera === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos.");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                toastRef.current.show("Acción cancelada");
            } else {
                uploadImage(result.uri, uid)
                    .then(() => {
                        updatePhotoUrl(uid);
                    })
            }
        }
    };

    const uploadImage = async (uri, nameImage) => {
        setTextLoading("Actualizando avatar");
        setIsLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
        return ref.put(blob);
    }

    const updatePhotoUrl = uid => {
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL()
            .then(async result => {
                const update = {
                    photoURL: result
                }
                await firebase.auth().currentUser.updateProfile(update);
                setReloadData(true);
                setIsLoading(false);
            })
            .catch(() => {
                toastRef.current.show("Error al recuperar el avatar del seervidor");
            })
    }
    return (
        <View style={styles.viewuserInfo}>
            <ImageBackground source={require("../../../assets/img/bgInfoUser.jpg")} style={styles.imageBg}>
 </ImageBackground>
            {/* <View style={styles.displayName}>
                <Text>{displayName ? displayName : "Anónimo"}</Text>
                <Text>{email ? email : "Social Login"}</Text>
            </View> */}
            <View style={styles.containerModules}>

                <View style={styles.containerAvatar}>
                    <Avatar rounded size="large"
                        showEditButton
                        onEditPress={changeAvatar}
                        containerStyle={styles.userInfoAvatar}
                        source={{ uri: photoURL ? photoURL : "https://api.adorable.io/avatars/eyes5" }}
                    />
                </View>
                <View style={styles.containerUserInfo}>
                    <Text style={styles.displayName}>{displayName ? displayName : "Anónimo"}</Text>
                    <Text style={styles.displayEmail}>{email ? email : "Social Login"}</Text>
                </View>
            </View>
           

        </View>
    )
}


const styles = StyleSheet.create({
    viewuserInfo: {
        position: "relative",
        flexDirection: "row",
        backgroundColor: "#ff5c39",
        paddingTop: 20,
        paddingBottom: 70,
        alignItems: "center",
    },
    containerAvatar: {
        marginLeft: 20
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        color: "white",
        fontWeight: "bold"
    },
    displayEmail: {
        color: "white"
    },
    containerModules: {
        flexDirection: 'row'
    },
    containerUserInfo: {
        justifyContent: "center"
    },
    imageBg: {
        // flex: 1,
        flexDirection:"column",
        marginTop: -20,
        paddingTop: 20,
        paddingBottom: 20,
        resizeMode: "cover",
        position: "absolute",
        top:20,
        width: "100%",
        height: 180
        // justifyContent: "center"
      }
});