import React, { useState, createRef } from 'react';
import { StyleSheet, View, Animated } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import * as firebase from "firebase";


function LoginForm(props) {
    const { toastRef, navigation } = props;    
    const [hidePassword, setHidePassword] = useState(true);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const myInput = createRef();
    const secondInput = createRef();
    const buttonReference = createRef();

    const login = async () => {
        setIsVisibleLoading(true);
        if(!email || !password) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show("Introduce un email válido");
            } else {
                await firebase
                            .auth()
                            .signInWithEmailAndPassword(email,password)
                            .then((response)=>{
                                navigation.navigate("MyAccount");
                            })
                            .catch((err)=> {
                                if (err.code === 'auth/wrong-password') {
                                    toastRef.current.show("Credenciales incorrectas");
                                } else {
                                    if (err.code === 'auth/user-not-found') {
                                        toastRef.current.show("No existe una cuenta con este email");
                                    } else {
                                            toastRef.current.show("Error de servidor");
                                    }
                                }
                            });
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
            onSubmitEditing={() => { secondInput.current.focus(); }}
            returnKeyType = { "next" }
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
            ref={secondInput}
            returnKeyType = { "send" }
            password={true}
            secureTextEntry={hidePassword}
            containerStyle={styles.inputForm}
            onSubmitEditing={login}
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
                ref={buttonReference}
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                title="iniciar sesión"
                onPress={login}
            />
            <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
        </View>
    )
}
export default withNavigation(LoginForm);

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