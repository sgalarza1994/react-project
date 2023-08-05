import react from "react";
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import Account from "../screen/Account/Account";
import Login from "../screen/Account/Login";
import Register from "../screen/Account/Register";
const Stack = createNativeStackNavigator();
export default function AccountStack(){
    return(
         <Stack.Navigator>
             <Stack.Screen name="litadoStack" component={Account}
             options={{
                title : 'cuenta'
             }}
            /> 
            <Stack.Screen name="loginStack" component={Login}
             options={{
                title : 'Iniciar Sesion'
             }}
            /> 

<Stack.Screen name="registerStack" component={Register}
             options={{
                title : 'Registrar Usuario'
             }}
            /> 

         </Stack.Navigator>
    );
}