import React,{useRef} from 'react'
import {StyleSheet,View,ScrollView, Text,Image} from 'react-native'
import {Divider} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import LoginForm from '../../components/Account/LoginForm'
import Toast from 'react-native-easy-toast'
export default function  Login()
{
    const navigation = useNavigation();
    const toastRef = useRef();
    return(
        <ScrollView>
            <Image 
            source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
            resizeMode='contain'
            style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef}/>
                <CreateAccount />
            </View>
            <Divider  style={styles.dividir}/>
            <Text>
                Social Media
            </Text>
            <Toast 
            ref={toastRef}
            position='center'
            opacity={0.9}
            />
        </ScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation();
 return (
    <Text style={styles.textRegister}>
        Aun no tienes una cuenta ?  {" "}
        <Text
        style={styles.textBtn}
        onPress={() => navigation.navigate('registerStack')}
        >
            Registrate
        </Text>
    </Text>
 )
}


const styles = StyleSheet.create({
logo:{
    width:"100%",
    height:100,
    marginTop:20
},
viewContainer:{
    marginRight:40,
    marginLeft: 40
},
textRegister:{
    marginTop:15,
    marginLeft:10,
    marginRight:10
},
textBtn:{
    color : "#00a680",
    fontWeight :"bold"
},
dividir:{
    backgroundColor: "#00a680",
    margin:40
}


});