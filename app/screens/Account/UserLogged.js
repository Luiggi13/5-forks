import React, { useState, useEffect, useRef } from 'react';
import InfoUser from "../../components/Account/InfoUser"
import { Text, StyleSheet, View } from 'react-native';
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";

import * as firebase from "firebase";

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);   
                     
        })();
        setReloadData(false);
    }, [reloadData])
    
    return (
        <View>
            <InfoUser userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef}/>
            <Button
                title="Cerrar sesión"
                onPress={() => { firebase.auth().signOut()}}
            />
            <Toast ref={toastRef} position="top" opacity={1} style={{backgroundColor:'#ff5c39'}} />
        </View>
    )
}
