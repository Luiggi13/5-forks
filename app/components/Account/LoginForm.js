import React, { useState, createRef } from 'react';
import { StyleSheet, View, Animated } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail, minLengthValidation } from "../../utils/Validation";
// import { validateEmail } from "../../utils/Validation";
// import { withNavigation } from "react-navigation";
import Loading from "../Loading";
// import * as firebase from "firebase";


export default function LoginForm(props) {
    const { toastRef } = props;    
    const [hidePassword, setHidePassword] = useState(true);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const myInput = createRef();
    // toastRef.current.show("Todos los campos son obligatorios");
    const login = () => {
        // setIsVisibleLoading(true);
        if (!minLengthValidation(password, 8)) {
            console.log('error');
            
        }
        
        if(!email || !password) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show("Introduce un email válido");
            } else {
                console.log('correcto');
            }
        }
        setIsVisibleLoading(false);
    }
    return (
        <View style={styles.formContainer}>
            <Input
            placeholder="Correo electrónico"
            containerStyle={styles.inputForm}
            ref={myInput}
            value={email}
            onChange={e => setEmail(e.nativeEvent.text)}
            rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                    onPress={e => {
                        let emailTemp = email;
                        emailTemp += "@";
                        setEmail(emailTemp);
                        myInput.current.focus(); 
                    }}
                />
            }
            />
            <Input
            placeholder="Contraseña"
            password={true}
            secureTextEntry={hidePassword}
            containerStyle={styles.inputForm}
            onChange={e => setPassword(e.nativeEvent.text)}
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
            <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
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