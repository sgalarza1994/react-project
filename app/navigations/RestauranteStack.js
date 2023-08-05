import react from "react";
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import Restaurantes from "../screen/Restaurants/Restaurante";
import AddRestaurante from "../screen/Restaurants/AddRestaurante";

const Stack = createNativeStackNavigator();
export default function ResturanteStck(){
    return(
         <Stack.Navigator>
             <Stack.Screen name="add-restaurante" component={Restaurantes}
             options={{
                title : 'Crear Restaurante'
             }}
            /> 
            <Stack.Screen name="restaurante" component={Restaurantes}
            options={{
                title : 'Listado Restaurante'
             }}
            /> 
            <Stack.Screen name="addRestaurante" component={AddRestaurante}
            options={{
                title : 'add Restaurante'
             }}
            /> 
            

         </Stack.Navigator>
    );
}