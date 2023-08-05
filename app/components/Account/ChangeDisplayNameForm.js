import React,{useState} from "react";
import { View ,StyleSheet,Text} from "react-native";
import { Input,Button } from "react-native-elements";

import {getAuth,onAuthStateChanged,User,updateProfile} from 'firebase/auth'
import {firebase} from '../../utils/firebase_config'


export default function ChangeDisplayNameForm(props)
{
    const {userInfo,toastRef,setVisible,setReloadUserInfo} = props;
    console.log('userInfo',userInfo);
    const [newDisplayName,setnewDisplayName] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const onSubmit  = () => 
    {
        setError(null);
        if(!newDisplayName)
        {
            setError("El nombre no puede estar vacio");
        }
        else if(newDisplayName === useState.displayName) 
        {
            setError("El nombre no ser igual al actual");
        }
        else 
        {
            setIsLoading(true);
            const auth = getAuth();
            updateProfile(auth.currentUser, { 
                displayName : newDisplayName
            }).then((responseUpdate) => {
                console.log('perfil actualizado')
                toastRef.current.show('Perfil actualizado');
                setReloadUserInfo(true);
                setVisible(false);

            }).catch((error) => {
                console.log('erroractualizar',error);
            }).finally(()=>{
                setIsLoading(false);
            });
        }

    }
    return (
        <View style={styles.view}>
          <Input 
          placeholder="Nombre y Apellidos"
          containerStyle={styles.input}
          rightIcon={{
            type : 'material-community',
            name : 'account-circle-outline',
            color : '#c2c2c2'
          }}
          defaultValue={userInfo.displayName  || ""}
          onChange={e => setnewDisplayName(e.nativeEvent.text)}
          errorMessage={error}
          />
          <Button 
          title="Cambiar nombre"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnStyles}
          onPress={() => onSubmit()}
          loading={isLoading}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems : 'center',
        paddingTop : 10,
        paddingBottom : 10
    },
    input:{
        marginBottom : 20,

    },
    btnContainer:{
        marginTop : 20,
        width : "95%"
    },
    btnStyles:{
        backgroundColor : "#00a680"
    }
});