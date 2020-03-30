import React, { useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import * as firebase from "firebase";

function RegisterForm(props) {
    const { toastRef, navigation } = props;
    
    
    const [hidePassword, setHidePassword] = useState(true);
    const [repeatHidePassword, setRepeatHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    // const [data, setdata] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    const register = async () => {
        setIsVisibleLoading(true);
        if (!email || !password || !repeatPassword) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show("El email no es correcto");
            } else {
                if (password !== repeatPassword) {
                    toastRef.current.show("Las contraseñas no son iguales");
                } else {
                    await firebase
                            .auth()
                            .createUserWithEmailAndPassword(email,password)
                            .then(()=>{
                                navigation.navigate("MyAccount");
                            })
                            .catch((err)=> {
                                if (err.code === 'auth/email-already-in-use') {
                                    toastRef.current.show("Ya existe una cuenta con este email");
                                } else {
                                    toastRef.current.show("Error al crear la cuenta");
                                }
                            })
                }
            }
        }
        setIsVisibleLoading(false);
    }


    return (
        <View
            style={styles.formContainer}>
            <Input placeholder="Correo electrónico"
                containerStyle={styles.inputForm}
                onChange={e => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input placeholder="Contraseña"
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
            <Input placeholder="Repetir contraseña"
                password={true}
                secureTextEntry={repeatHidePassword}
                containerStyle={styles.inputForm}
                onChange={e => setRepeatPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={repeatHidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setRepeatHidePassword(!repeatHidePassword)}
                    />
                }
            />
            <Button
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                title="Unirse"
                onPress={register}
            />
            <Loading isVisible={isVisibleLoading} text="Creando tu cuenta" />
        </View>
    )
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
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
        backgroundColor: "#00a680"
    }
});