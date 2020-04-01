import React, {useState, useEffect} from 'react'
import { StyleSheet, View, ScrollView, Alert, Dimensions  } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";

export default function AddRestaurantForm(props) {
    const { navigation,setIsLoading, toastRef} = props;
const [imagesSelected, setImagesSelected] = useState([]);
    
    return (
        <ScrollView>
            <UploadImage imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} />
        </ScrollView>
    )
}

function UploadImage(props) {
    const { imageSelected, setImagesSelected } = props;

    return (
        <View style={styles.viewImages}>
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={()=> console.log('asd')}
            />
            <Avatar
                onPress={()=>console.log('eliminar')}
                style={styles.thumbnail}
                // source={{rul thumbnail rest}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
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