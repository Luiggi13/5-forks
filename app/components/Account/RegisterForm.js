import React, { useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
export default function RegisterForm() {

    const [hidePassword, setHidePassword] = useState(true);
    const [repeatHidePassword, setRepeatHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    // const [data, setdata] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    const register = async () => {
        console.log(email);
        console.log(password);
        console.log(repeatPassword);

        if (!email || !password || !repeatPassword) {
            console.log("Todos los campos son obligatorios");
        } else {
            if (!validateEmail(email)) {
                console.log("El email no es correcto");
            } else {
                if (password !== repeatPassword) {
                    console.log('las pass no son iguales');
                } else {
                    await firebase
                            .auth()
                            .createUserWithEmailAndPassword(email,password)
                            .then(()=>{
                                console.log('usuario creado correctamente')
                            })
                            .catch(()=> {
                                console.log('Error al crear la cuenta');
                                
                            })
                }
            }
        }
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
        </View>
    )
}

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