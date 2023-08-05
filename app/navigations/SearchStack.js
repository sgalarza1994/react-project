import react from "react";
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from "../screen/Search";


const Stack = createNativeStackNavigator();
export default function SearchStack(){
    return(
         <Stack.Navigator>
             <Stack.Screen name="buscador" component={Search}
             options={{
                title : 'Buscar'
             }}
            /> 
            

         </Stack.Navigator>
    );
}