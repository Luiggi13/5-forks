import React, { useState, useEffect, useRef } from 'react';
import InfoUser from "../../components/Account/InfoUser"
import { StyleSheet, View } from 'react-native';
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";

import * as firebase from "firebase";

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [textLoading, setTextLoading] = useState("");
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);   
                     
        })();
        setReloadData(false);
    }, [reloadData])
    
    return (
        <View style={styles.viewBackground}>
            <InfoUser style={styles.viewUserInfo}
            userInfo={userInfo}
            setReloadData={setReloadData}
            toastRef={toastRef}
            setIsLoading={setIsLoading}
            setTextLoading={setTextLoading}
            />
            <View style={{ paddingTop: 0, marginLeft: "2.5%", backgroundColor: "#fff", borderRadius: 15, marginTop: -40, width:"95%"}}>
                <AccountOptions userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef}/>
            </View>
            <Button
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionText}
                title="Cerrar sesión"
                onPress={() => { firebase.auth().signOut()}}
            />
            <Toast ref={toastRef} position="top" opacity={1} style={{backgroundColor:'#ff5c39'}} />
            <Loading text={textLoading} isVisible={isLoading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBackground: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
      },
    viewUserInfo: {
        height: "600",
        backgroundColor: "#0f1733"
      },
      btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#df0000",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
      },
      btnCloseSessionText: {
        color: "#fff"
      }
  });