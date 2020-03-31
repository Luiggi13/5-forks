import React from 'react'
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
export default function ChangeDisplayNameForm() {


    
    const updateDisplayName = () => {
        console.log("Nombre actualizado");
    }

    return (
      <View style={styles.view}>
          <Input 
          placeholder="Nombre"
          containerStyle={styles.input}
          rightIcon= {{
              type: "material-community",
              name: "account-circle-outline",
              color: "#c2c2c2"
          }}
        //   errorMessage={}
        //   onChange={}
        //   defaultValue=""
          />
          <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
        // loading={isLoading}
      />
      </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
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