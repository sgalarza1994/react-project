import React,{useState,useRef} from "react";
import { View,StyleSheet,Text } from "react-native";
import Toast from 'react-native-easy-toast'
import Loading from "../../components/Loading";
import AddRestauranteForm from "../../components/Restaurantes/AddRestauranteForm";
export default function AddRestaurante(props)
{
    const {navigation} = props;
    const toastRef = useRef();
    const [isLoading,setIsLoading] = useState(false);
    return(
        <View>
            <AddRestauranteForm 
            toastRef={toastRef}
            navigation={navigation}
            setIsLoading={setIsLoading}

            />
            <Toast 
            ref={toastRef}
            position="center"
            opacity={0.9}
            
            />

            <Loading 
            isVisible={isLoading}
            text="Creando restaurante"
            
            />
        </View>
    )
}

const styles = StyleSheet.create({

})