import react from "react";
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import Favorities from "../screen/Favorities";


const Stack = createNativeStackNavigator();
export default function FavoritoStack(){
    return(
         <Stack.Navigator>
             <Stack.Screen name="listadoFavorito" component={Favorities}
             options={{
                title : 'Favorito'
             }}
            /> 
            

         </Stack.Navigator>
    );
}