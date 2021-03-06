import React, { useState, createRef } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";

export default function ChangeEmailForm(props) {
  const { email, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const myInput = createRef();
  const secondInput = createRef();
  const buttonReference = createRef();

  const updateEmail = () => {
    setError({});
    if (!newEmail || email === newEmail) {
      setError({ email: "El email no puede ser igual o estar vacio." });
    } else {
      setIsLoading(true);
      reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show("Email actualizado correctamente");
              setIsVisibleModal(false);
            })
            .catch(() => {
              setError({ email: "Error al actualizar el email." });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setError({ password: "La contraseña no es correcta." });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        defaultValue={email && email}
        onChange={e => setNewEmail(e.nativeEvent.text)}
        rightIcon={
            <Icon
                type="material-community"
                name="at"
                iconStyle={{color: "#c2c2c2"}}
                onPress={e => {
                    let emailTemp = newEmail;
                    console.log(emailTemp);
                    
                    emailTemp += "@";
                    setNewEmail(emailTemp);
                    myInput.current.focus(); 
                }}
            />
        }
        errorMessage={error.email}
        ref={myInput}
        onSubmitEditing={() => { secondInput.current.focus(); }}
        returnKeyType = { "next" }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword}
        onSubmitEditing={updateEmail}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={error.password}
        ref={secondInput}
        returnKeyType = { "send" }
      />
      <Button
        ref={buttonReference}
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateEmail}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#ff5c39"
  }
});