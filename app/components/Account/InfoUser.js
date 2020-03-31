import React from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { Button, Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function InfoUser(props) {
    const { 
        userInfo: {photoURL, uid, displayName, email},
        setReloadData
    } = props;
    
    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status

        if (resultPermissionCamera === "denied") {
            console.log("Es necesario aceptar los permisos de la galeria ");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if(result.cancelled) {
                console.log('has cancelado la galería');
            } else {
                uploadImage(result.uri,uid)
                    .then(()=>{
                        console.log('imagen subida correctamente');
                        updatePhotUrl(uid);
                    })
            }   
        }
    };

    const uploadImage = async (uri, nameImage) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref =  firebase.storage().ref().child(`avatar/${nameImage}`);
        return ref.put(blob);
    }

    const updatePhotUrl = uid => {
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL()
        .then(async result =>{
            const update= {
                photoURL: result
            }
            await firebase.auth().currentUser.updateProfile(update);
            setReloadData(true);
        })
        .catch(()=>{
            console.log("Error al recuperar el avatar del seervidor");
            
        })
    }
    return (
        <View style={styles.viewuserInfo}>
            <Avatar rounded size="large"
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={{uri: photoURL ? photoURL : "https://api.adorable.io/avatars/eyes5"}}
            />
            <View style={styles.displayName}>
                <Text>{displayName ? displayName : "Anónimo"}</Text>
                <Text>{email ? email : "Social Login"}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    viewuserInfo: {
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    userInfoAvatar: {
        marginRight:20
    },
    displayName: {
        fontWeight: "bold"

    }
});