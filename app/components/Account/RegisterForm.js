import React from 'react';
import { StyleSheet, View} from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function RegisterForm() {

    const register = () => {
        console.log('button');
        
    }
    return (
        <View
        style={styles.formContainer}>
            <Input placeholder="Correo electrónico"
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
            <Input placeholder="Contraseña"
            password={true}
            secureTextEntry={true}
            containerStyle={styles.inputForm}
            onChange={() => console.log('actualizado password')}
            rightIcon={
                <Icon 
                type="material-community"
                name="eye-outline"
                iconStyle={styles.iconRight}
                />
            }
            />
            <Input placeholder="Repetir contraseña"
            password={true}
            secureTextEntry={true}
            containerStyle={styles.inputForm}
            onChange={() => console.log('repetir actualizado password')}
            rightIcon={
                <Icon 
                type="material-community"
                name="eye-outline"
                iconStyle={styles.iconRight}
                />
            }
            />
            <Button
                    containerStyle={styles.btnContainerRegister}
                    buttonStyle={styles.btnRegister}
                    title="Ver tu perfil"
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