import React,{useState,useEffect} from "react";
import {StyleSheet, View,Text} from 'react-native'
import { Icon } from "react-native-elements";
import {getAuth,onAuthStateChanged,User,updateProfile} from 'firebase/auth'



export default function Restaurantes(props){
    const [userInfo,setUserInfo] = useState(null);
    const  {navigation} = props;
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth,(userInfo) => {
            setUserInfo(userInfo);
     });
    },[])
    return (
        <View style={styles.viewContainer}>
            <Text>Restaurantes....</Text>
            {userInfo && (
                <Icon 
                type="material-community"
                name="plus"
                color="#00a680"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate('addRestaurante')}
                />
            )}
            
        </View>
    );
}
const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        backgroundColor : '#fff'
    },
    btnContainer:{
        position : 'absolute',
        bottom :10,
        right: 10,
        shadowColor : 'black',
        shadowOffset : {width : 2, height : 2},
        shadowOpacity: 0.5
    }
});