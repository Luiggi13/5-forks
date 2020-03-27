import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
                <Text>
                    Form register...
                </Text>
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