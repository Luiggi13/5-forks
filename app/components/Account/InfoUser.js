import React from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { Button, Avatar } from "react-native-elements";

export default function InfoUser(props) {
console.log(props);

    const { 
        userInfo: {photoURL, uid, displayName, email}
    } = props;
    
    const changeAvatar = () => {
        console.log('cambiando avatar');
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