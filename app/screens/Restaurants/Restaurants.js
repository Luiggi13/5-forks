import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import * as firebase from "firebase";

export default function Restaurants(props) {
    const { navigation } = props;
    const [user, setUser] = useState(null);
    const [isReloadRestaurants, setIsReloadRestaurants] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
          setUser(userInfo);
        });
      }, []);

    return (
        <View style={styles.viewBody}>
            <Text>Estamos en restaurantesd</Text>
            {user && <AddRestaurantButton navigation={navigation} setIsReloadRestaurants={setIsReloadRestaurants}/>}
        </View>
    )
}

function AddRestaurantButton(props) {
    const { navigation,setIsReloadRestaurants } = props;
    return (
        <ActionButton 
        buttonColor="#ff5c39"
        onPress={()=>navigation.navigate("AddRestaurant",{setIsReloadRestaurants})}
        renderIcon={active => active ? (<Icon type="material-community" name="food-off" size={22}  color="#fff" /> ) : (<Icon type="material-community" name="food-fork-drink" size={22}  color="#fff" />)}
        />
    )
}

const styles = StyleSheet.create({
   viewBody: {
       flex:1
   },
   fab: {

   }
});