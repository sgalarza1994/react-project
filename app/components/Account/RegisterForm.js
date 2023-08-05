import React,{useState} from "react";
import { StyleSheet,View } from "react-native";
import {Input,Icon,Button} from 'react-native-elements'
import { validateEmail } from "../../utils/validate";
import { size,isEmpty } from "lodash";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigation} from '@react-navigation/native'
import Loading from "../Loading";
export default function RegisterForm(props)
{
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();
    const { toastRef} = props;
    const [showPassword,setShowPassword] = useState(false);
    const [showPasswordRepet,setShowPasswordRepeat] = useState(false);
    const [formData,setformData] = useState(defaultFormValue());
    const onSubmit =() => 
    {
        if(isEmpty(formData.email) || 
        isEmpty(formData.password) || 
        isEmpty(formData.repeatPassword)
        )
        {
            toastRef.current.show('todos los campos son obligatorios');
        }
        else if(!validateEmail(formData.email))
        {
            toastRef.current.show('email no es correcto');
        }
        else if(formData.password !== formData.repeatPassword)
        {
            toastRef.current.show('Las password tienen que ser iguales');
        }
        else if(size(formData.password)<6)
        {
            toastRef.current.show('no tiene la longitud minima');
        }
        else 
        {
            setLoading(true);
            const auth = getAuth();
            createUserWithEmailAndPassword(auth,formData.email,formData.password)
             .then((userCredential) => {
                navigation.navigate('litadoStack')
             })
             .catch((error) => {
          
                const errorCode = error.code;
                const errorMessage = error.message;
                toastRef.current.show(errorMessage);
             }).finally(() => {
                setLoading(false);
             });
        }
    }
    const onChange = (e,type) => 
    {
        //let values = e.nativeEvent.text;
       // setformData({[type]:e.nativeEvent.text})
        setformData({...formData,[type]:e.nativeEvent.text})
    }
    return(
        <View styles={styles.formContainer}>
           <Input 
            placeholder="Correo Electronico"
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e,"email")}
            rightIcon={
                <Icon 
                type="material-community"
                name="at"
                iconStyle={styles.iconStyle}
                />
            }
           />
           <Input 
            placeholder="Password"
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e,"password")}
            password={true}
            secureTextEntry={showPassword ? false : true}
            rightIcon={
                <Icon 
                type="material-community"
                name={showPassword ? 'eye-off-outline':'eye-outline'}
                iconStyle={styles.iconStyle}
                onPress={()=> setShowPassword(!showPassword)}
                />
            }
           />
           <Input 
            placeholder="Confirmacion Password"
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e,"repeatPassword")}
            password={true}
            secureTextEntry={showPasswordRepet ? false : true}
            rightIcon={
                <Icon 
                type="material-community"
                name={showPasswordRepet ? 'eye-off-outline':'eye-outline'}
                iconStyle={styles.iconStyle}
                onPress={()=> setShowPasswordRepeat(!showPasswordRepet)}
                />
            }
           />
           <Button 
           title="Unirse"
           containerStyle={styles.btnContainerRegister}
           buttonStyle={styles.btnRegister}
           onPress={() => onSubmit()}
           />
           <Loading isVisible={loading} text="Creando Cuenta"  />
        </View>
    )
}

function defaultFormValue(){
    return {
        email : "",
        password:"",
        repeatPassword:""
    }
}
const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems : "center",
        justifyContent : "center",
        marginTop : 30
    },
    inputForm:{
        width : "100%",
        marginTop: 20
    },
    btnContainerRegister:{
        marginTop:20,
        width :"95%"
    },
    btnRegister:{
        backgroundColor : "#00a680"
    },
    iconStyle:{
        color : '#c1c1c1'
    }
});