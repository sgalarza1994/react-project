import React,{useState} from "react";
import { View ,StyleSheet,Text} from "react-native";
import { Input,Button } from "react-native-elements";
import {getAuth,onAuthStateChanged,User,updateProfile,updateEmail} from 'firebase/auth'
import {firebase} from '../../utils/firebase_config'
import { validateEmail } from "../../utils/validate";
import {reauthenticate} from '../../utils/api'
export default function ChangeEmailForm(props)
{
    const {userInfo,toastRef,setVisible,setReloadUserInfo} = props;
    const [newDisplayName,setnewDisplayName] = useState(null);
    const [password,setPassword] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    const onSubmit  = () => 
    {
        setError(null);
        if(!newDisplayName)
        {
            setError("El email no puede estar vacio");
        }
        else if(newDisplayName === useState.displayName) 
        {
            setError("El email no ser igual al actual");
        }
        else if (!validateEmail(newDisplayName))
        {
            setError("El email no es valido");
        }
        else if(!password)
        {
            setError("El password no puede estar vacio");
        }
        else 
        {
            setIsLoading(true);
            reauthenticate(password).then((response) => {
                const auth = getAuth();
                updateEmail(auth.currentUser,newDisplayName).then((responseUpdate) => {
                    console.log('perfil actualizado');
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show('Email actualizado corretamente');
                    setVisible(false);
                }).catch((error) => {
                    console.log('erroractualizar',error);
                    toastRef.current.show(error);
                });
            }).catch((error) => {
                setError("El password no es correcto");
                toastRef.current.show('El password no es correcto');
                setIsLoading(false);
            });
        }

    }

    return (
        <View style={styles.view}>
          <Input 
          placeholder="Email"
          containerStyle={styles.input}
          rightIcon={{
            type : 'material-community',
            name : 'at',
            color : '#c2c2c2'
          }}
          defaultValue={userInfo.email  || ""}
          onChange={e => setnewDisplayName(e.nativeEvent.text)}
          errorMessage={error}
          />
            <Input 
          placeholder="Password"
          containerStyle={styles.input}
          rightIcon={{
            type : 'material-community',
            name : showPassword ? "eye-off-outline" : "eye-outline",
            color : '#c2c2c2',
            onPress : () => setShowPassword(!showPassword)
          }}
          onChange={e => setPassword(e.nativeEvent.text)}
          errorMessage={error}
          password={true}
          secureTextEntry={showPassword ? false : true}
          />


          <Button 
          title="Cambiar Password"
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