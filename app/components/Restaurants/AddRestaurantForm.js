import React, {useState, useEffect} from 'react'
import { StyleSheet, View, ScrollView, Alert, Dimensions  } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const WidthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
    const { navigation, setIsLoading, toastRef} = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    
    return (
        <ScrollView>
            <ImageRestaurant imageRestaurant={imagesSelected[0]} />
            <UploadImage toastRef={toastRef} imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} />
        </ScrollView>
    )
}


function ImageRestaurant(props) {
    const { imageRestaurant } = props;
  
    return (
      <View style={styles.viewPhoto}>
        {imageRestaurant ? (
          <Image
            source={{ uri: imageRestaurant }}
            style={{ width: WidthScreen, height: 200 }}
          />
        ) : (
          <Image
            source={require("../../../assets/img/no-image.png")}
            style={{ width: WidthScreen, height: 200 }}
          />
        )}
      </View>
    );
  }

function UploadImage(props) {
    const { imagesSelected, setImagesSelected, toastRef } = props;
  
    const imageSelect = async () => {
      const resultPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      const resultPermissionCamera =
        resultPermission.permissions.cameraRoll.status;
  
      if (resultPermissionCamera === "denied") {
        toastRef.current.show(
          "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir ha ajustes y activarlos manualmente.",
          3000
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3]
        });
  
        if (result.cancelled) {
          toastRef.current.show(
            "Has cerrado la galeria sin seleccionar ninguna imagen",
            2000
          );
        } else {
          setImagesSelected([...imagesSelected, result.uri]);
          
        }
    }
};

    const removeImage = image => {

        const arrayImages = imagesSelected;
        Alert.alert(
            "Eliminar imagen",
            "¿Seguro que quieres eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: ()=> setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image))
                    
                },
            ],
            {cancelable: false}
        )

    }
    return (
        <View style={styles.viewImages}>

            {imagesSelected.length < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            {imagesSelected.map(image => (
                <Avatar key={image} onPress={() => removeImage(image)} style={styles.thumbnail} source={{uri: image}} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 20,
        marginTop: 20
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    thumbnail: {
        width: 70,
        height: 70,
        marginRight: 10    
    }
 });