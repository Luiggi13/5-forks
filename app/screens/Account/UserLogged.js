import React, { useState, useEffect } from 'react';
import InfoUser from "../../components/Account/InfoUser"
import { Text, StyleSheet, View } from 'react-native';
import { Button } from "react-native-elements";

import * as firebase from "firebase";

export default function UserLogged() {

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);   
                     
        })();
    }, [])
    
    return (
        <View>
            <InfoUser userInfo={userInfo}/>
            <Button
                title="Cerrar sesión"
                onPress={() => { firebase.auth().signOut()}}
            />
        </View>
    )
}
