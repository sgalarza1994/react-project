import React,{useState} from "react";
import {StyleSheet,View,Text} from "react-native"
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
export default function AccountOptions(props)
{
    const {userInfo, setLoading,setText,setReloadUserInfo} = props;
    const {toastRef} = props;
    const [isVisble,setVisible] = useState(false)
    const [renderComponenent,setRenderComponent] = useState(null);
    const selectComponent = (key) => 
    {
        switch(key){
            case "displayName":
                setRenderComponent(<ChangeDisplayNameForm
                    userInfo={userInfo}
                    toastRef={toastRef}
                    setVisible={setVisible}
                    setReloadUserInfo={setReloadUserInfo}
                />)
                setVisible(true);
                break;
                case "email":
                    setRenderComponent(<ChangeEmailForm
                        userInfo={userInfo}
                        toastRef={toastRef}
                        setVisible={setVisible}
                        setReloadUserInfo={setReloadUserInfo}
                    />)
                    setVisible(true);
                    break;
                    case "changePassword":
                        setRenderComponent(<ChangePasswordForm
                            userInfo={userInfo}
                            toastRef={toastRef}
                            setVisible={setVisible}
                            setReloadUserInfo={setReloadUserInfo} />)
                        setVisible(true);
                        break;

            default:
                setRenderComponent(null);
                setVisible(false);
                break;
            
        }
    }
    const menuOptions = generateOptions(selectComponent);
    return (
        <View>
            {map(menuOptions,(menu,index) => (
                <ListItem 
                key={index}
                title={menu.title}
                containerStyle={styles.menuItem}
                onPress={() => menu.onPress() }
                >
                <Icon name={menu.iconNameLeft} type={menu.iconType} color={menu.iconColorLeft} />
                <ListItem.Content>
                    <ListItem.Title>{menu.title}</ListItem.Title>
                </ListItem.Content>
                <Icon name={menu.iconNameRight} type={menu.iconType} color={menu.iconColorRight} />
                </ListItem>
            ))}
            {
                renderComponenent && (
                    <Modal 
                    isVisible={isVisble}
                    setIsVisible={setVisible}
                    >
                       {renderComponenent}
                    </Modal>
                )
            }
           
        </View>
    )
}

function generateOptions(selectComponent)
{
     return [
        {
            title : "Cambiar Nombre y Apellido",
            iconType : "material-community",
            iconNameLeft : "account-circle",
            iconColorLeft : "#ccc",
            iconNameRight : "chevron-right",
            iconColorRight : "#ccc",
            onPress : () => selectComponent("displayName")

        },
        {
            title : "Cambiar Email",
            iconType : "material-community",
            iconNameLeft : "at",
            iconColorLeft : "#ccc",
            iconNameRight : "chevron-right",
            iconColorRight : "#ccc",
            onPress : () => selectComponent("email")
        },
        {
            title : "Cambiar Password",
            iconType : "material-community",
            iconNameLeft : "lock-reset",
            iconColorLeft : "#ccc",
            iconNameRight : "chevron-right",
            iconColorRight : "#ccc",
            onPress : () => selectComponent("changePassword")
        }
     ]
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth : 1,
        borderBottomColor : "#e3e3e3"
    }
});