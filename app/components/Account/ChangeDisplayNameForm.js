import React, {useState} from 'react'
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {

  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    
    
    const updateDisplayName = () => {
      setError(null);
      if(!newDisplayName) {
        setError("El nombre del usuario es obligatorio")
      } else {
        setIsLoading(true);
        const update = {
          displayName: newDisplayName
        };
        firebase.auth().currentUser.updateProfile(update)
          .then(()=> {
            setIsLoading(false);
            setReloadData(true);
            toastRef.current.show("Nombre actualizado");
            setIsVisibleModal(false);
          })
          .catch(()=>{
            setError("Error al actualizar el nombre");
            setIsLoading(false);
          })
      }
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
          errorMessage={error}
          onChange={e => setNewDisplayName(e.nativeEvent.text)}
          defaultValue={displayName && displayName}
          />
          <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
        loading={isLoading}
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