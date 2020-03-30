import React, { useState } from 'react';
import { StyleSheet, View, Text} from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function RegisterForm() {

    const [hidePassword, setHidePassword] = useState(true);
    const [repeatHidePassword, setRepeatHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    // const [data, setdata] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    // async function getMoviesFromApiAsync() {
    //     try {
    //       let response = await fetch('http://jsonplaceholder.typicode.com/users/1');
    //       let json = await response.json();
    //       setdata(...data,json.name);
    //       return json.name;
    //     } catch (error) {
    //       console.error(error);
    //     }
    // }

    const register = () => {
        // console.log(`Email: ${email}`);
        // console.log(`password: ${password}`);
        // console.log(`repeatPassword: ${repeatPassword}`);
        // getMoviesFromApiAsync();
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
                    title="Get from MockApi.io"
                    onPress={register}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer:{
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