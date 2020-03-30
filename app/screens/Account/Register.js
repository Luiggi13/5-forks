import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from "../../components/Account/RegisterForm";
export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View
            style={styles.viewForm}
            >
                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 100,
        marginTop: 20
    },
    viewForm: {
        marginLeft: 40,
        marginRight: 40
    }
})