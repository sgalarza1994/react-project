import  React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Icon } from "react-native-elements";

import ResturanteStck from "./RestauranteStack";
import FavoritoStack from "./FavoritoStack";
import AccountStack from "./AccountStack";
import TopRestauranteStack from "./TopRestauranteStack";
import SearchStack from "./SearchStack";
const Tab = createBottomTabNavigator();
export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="TopRestauante"
           screenOptions={({ route }) => ({
            tabBarIcon : ({color}) => {
                return screenOptions(route,color)
            },

            tabBarActiveTintColor: '#00a680',
            tabBarInactiveTintColor: '#646464',
             
          })}
            
            >
                <Tab.Screen name="restaurantes" component={ResturanteStck} options={{
                    headerShown:false,
                    }} />
                <Tab.Screen name="Favorito" component={FavoritoStack} options={{
                    title: 'Favoritos',
                    headerShown:false,
                }}/>
                <Tab.Screen name="TopRestauante" component={TopRestauranteStack} options={{
                    title: 'Top Restaurante',
                    headerShown:false,
                }}/>

                <Tab.Screen name="Search" component={SearchStack} options={{
                    title: 'Busqueda',
                    headerShown:false,
                }}/>

                <Tab.Screen name="Cuenta" component={AccountStack} options={{
                    title: 'Cuenta',
                    headerShown:false,
                }}/>


            </Tab.Navigator>
        </NavigationContainer>
    );
}

function screenOptions(route,color)
{
    let iconName; 

    switch(route.name)
    {
        case "restaurantes":
        iconName ="compass-outline"
        break;
        case "Favorito":
        iconName ="heart-outline"
        break;
        case "TopRestauante":
        iconName ="star-outline"
        break;
        case "Search":
            iconName ="magnify"
            break;
            case "Cuenta":
                iconName ="home-outline"
                break;

        default:
            break;
    }


    return (
        <Icon type="material-community" name={iconName} color={color} />
        )
}