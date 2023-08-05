import React from "react";
import {StyleSheet} from 'react-native'
import { Overlay } from "react-native-elements";

export default function Modal(props)
{
    const {isVisible,setIsVisible,children} = props;
    const closeModal = () => 
    {
        setIsVisible(false);
    }
    return (
        <Overlay
         isVisible={isVisible}
         backdropStyle={styles.backdropStyle}
         overlayStyle={styles.overlayStyle}
         onBackdropPress={() => closeModal()}
         
        >
            {
                children
            }
        </Overlay>
    )
}

const styles = StyleSheet.create({
    backdropStyle:{
        backgroundColor :"rgba(0,0,0,0.5)"
    },
    overlayStyle:{
        backgroundColor : "#fff",
        height : "auto",
        width : "90%"
    }
})