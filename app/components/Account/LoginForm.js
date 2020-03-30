import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
// import { validateEmail } from "../../utils/Validation";
// import { withNavigation } from "react-navigation";
// import Loading from "../Loading";
// import * as firebase from "firebase";


export default function LoginForm() {
    const [hidePassword, setHidePassword] = useState(true);

    const login = () => {
        console.log('logueando');
        
    }
    return (
        <View style={styles.formContainer}>
            <Input
            placeholder="Correo electrónico"
            containerStyle={styles.inputForm}
            onChange={e => console.log(e.nativeEvent.text)}
            rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                />
            }
            />
            <Input
            placeholder="Contraseña"
            password={true}
            secureTextEntry={hidePassword}
            containerStyle={styles.inputForm}
            onChange={e => console.log(e.nativeEvent.text)}
            rightIcon={
                <Icon
                    type="material-community"
                    name={hidePassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setHidePassword(!hidePassword)}
                />
            }
            />
            <Button
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                title="iniciar sesión"
                onPress={login}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    iconRight: {
        color: "#c1c1c1",
        marginRight: 10
    },

    btnContainerRegister: {
        marginTop: 20,
        width: "95%"
    },
    btnRegister: {
        backgroundColor: "#ff5c39"    }
});