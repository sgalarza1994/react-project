import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from 'expo-permissions';
import * as CameraRoll from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import {getAuth,onAuthStateChanged,User,updateProfile} from 'firebase/auth'
import {firebase} from '../../utils/firebase_config'
export default function UserInfo(props)
{
    const {userInfo: {photoURL,displayName,email,uid},setLoading,setText
        } = props;
    const {toastRef} = props;
    const  changeAvatar = async () => 
    {
        const resultPermision = await CameraRoll.requestCameraPermissionsAsync();
        const resultPemissionCamera = resultPermision.status;
        if(resultPemissionCamera === "denied")
        {
            toastRef.current.show('Es necesario aceptar los permisos de la galeria')
        }
        else 
        {
            const result = await ImagePicker.launchImageLibraryAsync({  
                allowsEditing:true,
                aspect:[4,3]
            });
            if(result.canceled)
            {
                toastRef.current.show('Ha cerrado la seleccion de imagenes');
            }
            else 
            {
                uploadImagen(result.assets[0].uri)
                .then(() => {
                    toastRef.current.show('Imagen subida');
                    updatePhotoUrl();
                }).catch((error) => {
                    console.log('error',error);
                    toastRef.current.show('Error al actualizar el avatar');
                });
            }
        }
    }

    const uploadImagen  = async (uri) =>
    {
        setText("Actualizando Avatar")
        setLoading(true);
       
        const response = await fetch(uri);
        const responseJson = JSON.stringify(response);
        const blod = await response.blob();
        
        const ref = firebase.storage().ref()
                    .child(`avatar/${uid}`);
        return ref.put(blod);

    }

    const updatePhotoUrl = () => 
    {
        const auth = getAuth();
        firebase.storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async (response) => {
            const update = {
                photoURL : response
            }
            updateProfile(auth.currentUser, { 
                photoURL : response
            }).then((responseUpdate) => {
                console.log('perfil actualizado')
            }).catch((error) => {
                console.log('erroractualizar',error);
            });
        }).catch((error) => {
            console.log('error',error);
        }).finally(() => {
            setText("")
            setLoading(false);
        })
    }
    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
            rounded
            size="large"
            showEditButton
            onPress={() => changeAvatar()}
            containerStyle={styles.userInfoAvantar}
            source={photoURL ? {uri:photoURL} : require('../../../assets/img/avatar-default.jpg')}
            />
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName :"Anonimo"}
                    </Text>
                <Text>
                {email ? email :"Social Login"}

                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems :"center",
        justifyContent : "center",
        flexDirection : "row",
        backgroundColor : "#f2f2f2",
        paddingTop : 30,
        paddingBottom : 30
    },
    userInfoAvantar:{
        marginRight: 20
    },
    displayName:{
        fontWeight : "bold",
        paddingBottom : 10
    }
});