import React,{useState} from "react";
import { StyleSheet,View } from "react-native";
import { Input,Icon,Button } from "react-native-elements";
import Loading from "../Loading";
import { size,isEmpty } from "lodash";
import { validateEmail } from "../../utils/validate";
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigation} from '@react-navigation/native'
export default function LoginForm(props)
{
    const { toastRef} = props;
    const [showPassword,setShowPassword] = useState(false);
    const [loading,setLoading] = useState(false);
    const [formData,setformData] = useState(defaultFormValue());
    const navigation = useNavigation();
    const onSubmit = () => 
    {
        if(isEmpty(formData.email)
            || isEmpty(formData.password)
        )
        {
            toastRef.current.show('todos los campos son obligatorios');
        }
        else if(size(formData.password)<6)
        {
            toastRef.current.show('no tiene la longitud minima');
        }
        else if(!validateEmail(formData.email))
        {
            toastRef.current.show('email no es correcto');
        }
        else 
        {
            setLoading(true);
            const auth = getAuth();
            signInWithEmailAndPassword(auth,formData.email,formData.password)
            .then(() => {
                navigation.navigate('litadoStack')
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toastRef.current.show(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            })
        }
    }

    const onChange = (e,type) => 
    {
        setformData({...formData,[type]:e.nativeEvent.text})
    }


    return(
        <View style={styles.formContainer}>
            <Input 
            placeholder="Correo Electronico"
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e,"email")}
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
             <Button 
           title="Iniciar Sesion"
           containerStyle={styles.btnContainerRegister}
           buttonStyle={styles.btnRegister}
           onPress={() => onSubmit()}
           />
           <Loading isVisible={loading} text="Logeando"  />
        </View>
    )
}

function defaultFormValue(){
    return {
        email : "",
        password:"",
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