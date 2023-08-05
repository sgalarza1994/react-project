import React,{useRef,useState,useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {getAuth,onAuthStateChanged,User,signOut} from 'firebase/auth'
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import UserInfo from '../../components/Account/UserInfo';
import AccountOptions from '../../components/Account/AccountOptions';
export default function UserLogin(){

    const [loading,setLoading] = useState(false);
    const [text,setText] = useState("");
    const [userInfo,setUserInfo] = useState(null)
    const toastRef = useRef();
    const [realodUserInfo,setReloadUserInfo] = useState(false);
    const logout = () => 
    {
        const auth = getAuth();
        signOut(auth);
    }
    useEffect(() => {
        (async()=> {
            const auth = getAuth();
            onAuthStateChanged(auth,(user) => {
                setUserInfo(user);
            })
        })()
        setReloadUserInfo(false)
    },[realodUserInfo])

    return(
        <View style={styles.viewUserInfo}>
            {userInfo && <UserInfo
            userInfo={userInfo}
            toastRef={toastRef}
            setLoading={setLoading}
            setText={setText}
            />}
            
            {
                userInfo && 
                <AccountOptions 
                userInfo={userInfo}
                toastRef={toastRef}
                setLoading={setLoading}
                setText={setText}
                setReloadUserInfo={setReloadUserInfo}
                />
            }
            <Button 
            buttonStyle={styles.btnclosedSesion}
            titleStyle={styles.btnCloseSessionText}
            title='Cerrar Sesion' 
            onPress={() =>logout()} />
            <Toast 
            ref={toastRef}
            opacity={0.9}
            position='center'
            />
            <Loading 
            text={text}
            isVisible={loading}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight:  "100%",
        backgroundColor : "#f2f2f2"
    },
    btnclosedSesion:{
        marginTop:30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor : "#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor : "#e3e3e3",
        paddingTop : 10,
        paddingBottom : 10
    },
    btnCloseSessionText:{
        color : "#00a680"
    }
});