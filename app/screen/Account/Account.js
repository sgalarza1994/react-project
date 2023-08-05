import React,{useState,useEffect} from "react";
import {View,Text} from 'react-native'
import {getAuth,onAuthStateChanged,User} from 'firebase/auth'
import UserGuest from "./UserGuest";
import UserLogin from "./UserLogin";

import Loading from "../../components/Loading";
export default function Accounts(){

   const [] = useState(null);
    const [login,setLogin] = useState(null);

    useEffect(() => {
      const auth = getAuth();
       const userAuth = onAuthStateChanged(auth,(user) => {
        !user ? setLogin(false) : setLogin(true); 
       });
    },[]);
     if(login === null)
     {
        return <Loading 
               isVisible={true}
               text="Cargando..."
        />
     }
   return login ? <UserLogin />  : <UserGuest />
  
}