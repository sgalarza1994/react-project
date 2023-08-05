import React from 'react';
import {StyleSheet,View,ScrollView,Text,Image} from 'react-native';
import {Button} from 'react-native-elements'

import {useNavigation} from '@react-navigation/native'

export default function UserGuest(){

    const navigation = useNavigation();




    return(
        <ScrollView
        centerContent={true}
        style={styles.viewBody}
        >
            <Image 
            style={styles.image}
            source={require("../../../assets/img/user-guest.jpg")}
            resizeMode='contain'
            />

            <Text style={styles.title}>Consulta tu perfil de 5 tenederoes</Text>
            <Text style={styles.descripcion}>
                 Como describira tu mejor restaurante? Busca y visualiza los mejores 
                 restaurantes de una forma sencilla, vota el que mas te gusta y 
                 comenta como ha sido tu experiencia

            </Text>
            <View style={styles.viewBtn}>
                <Button
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainer}
                title="Ver tu Perfil"
                onPress={() => navigation.navigate('loginStack')}
                ></Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        marginLeft : 30,
        marginRight: 30
    },
    image : {
        height:300,
        width:"100%",
        marginBottom:40
    },
    title:{
        fontSize:19,
        fontWeight:"bold",
        marginBottom: 10,
        textAlign:"center"    

},
descripcion:{
    marginBottom:20,
    textAlign:"center"
},
viewBtn:{
    flex: 1,
    alignItems: "center"
},
btnStyle:{
    backgroundColor:"#00a680"
},
btnContainer:{
    width:"70%",

}

})