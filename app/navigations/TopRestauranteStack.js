import react from "react";
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import TopRestaurante from "../screen/TopRestaurante";


const Stack = createNativeStackNavigator();
export default function TopRestauranteStack(){
    return(
         <Stack.Navigator>
             <Stack.Screen name="listadoTopRestaurante" component={TopRestaurante}
             options={{
                title : 'Top Restaurantes'
             }}
            /> 
            

         </Stack.Navigator>
    );
}