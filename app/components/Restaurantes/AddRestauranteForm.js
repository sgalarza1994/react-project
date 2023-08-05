import React,{useState} from "react";
import { StyleSheet,View,Text,ScrollView,Alert,Dimensions } from "react-native";

import {Icon,Avatar,Image,Input,Button} from 'react-native-elements'
import * as CameraRoll from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import {map,size,filter} from 'lodash'
import Modal from '../Modal';
const widthScreen = Dimensions.get('window').width;
export default function AddRestauranteForm(props)
{
    const {toastRef,navigation,setIsLoading} = props;
    const [name,setName] = useState('');
    const [direccion,setDireccion] = useState('');
    const [description,setDescription] = useState('');
    const [imageSelected,setImageSelect] = useState([])
    const [isVisibleMap,setIsVisibleMap] = useState(false);
    const addRestaurante = () => 
    {

    }
    return(
       <ScrollView style={styles.scrollView}>
        <ImageRestaurante 
        imagenRestaunt={imageSelected[0]}
        />
        <Fromadd 
        setName={setName}
        setDireccion={setDireccion}
        setDescription={setDescription}
        setIsVisibleMap={setIsVisibleMap}
        />
        <UploadImage 
        toastRef={toastRef}
        setImageSelect={setImageSelect}
        imageSelected={imageSelected}
        
        />
        <Button 
                 title="Crear Restaurante"
                 onPress={() => addRestaurante}
                 buttonStyle={styles.crearRestaurante}
                 />
                 <Map 
                 isVisibleMap={isVisibleMap}
                 setIsVisibleMap={setIsVisibleMap}
                 />
       </ScrollView>
    )
}

function Fromadd(props)
{
    const {setName,setDireccion,setDescription,setIsVisibleMap} = props;
    return( 
        <View style ={styles.viewForm}>
            <Input 
                 placeholder="Nombre del resturante"
                 containerStyle={styles.containerInput}
                 onChange={(e) => setName(e.nativeEvent.text)}
            />
              <Input 
                 placeholder="Direccion"
                 containerStyle={styles.containerInput}
                 onChange={(e) => setDireccion(e.nativeEvent.text)}
                 rightIcon={{
                    type : "material-community",
                    name : 'google-maps',
                    color : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                 }}
            />
             <Input 
                 placeholder="Descripcion del restaurante"
                 containerStyle={styles.containerInput}
                 multiline={true}
                 inputContainerStyle={styles.textArea}
                 onChange={(e) => setDescription(e.nativeEvent.text)}
            />
           
        </View>
    )
}
function UploadImage(props){
    const {toastRef,setImageSelect,imageSelected} = props;
    const imageSelect = async () => 
    {
        const resultPermissions = await CameraRoll.requestCameraPermissionsAsync();
        if(resultPermissions === "denied")
        {
            toastRef.current.show('Es necesaria aceptar los permiso de galeria',3000);
        }
        else 
        {
            const  result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect : [4,3]
            })
            if(result.canceled)
            {
                toastRef.current.show('Has cerrado la galeria sin seleccioanr ninguna imagen',3000);
            }
            else 
            {
                console.log('vamos a agregar la imagen',result.assets[0].uri)
                setImageSelect(...imageSelected,result.assets[0].uri)
                console.log('listadoImagen',imageSelected)
            }
        }
    }
    const removeImage = (image) => 
    {
          const arrayImage = imageSelected;
          Alert.alert(
            "Eliminar Imagen",
            "Esta seguro de eliminar seleccionada",
            [
                {
                    text : "Cancel",
                    style  :"cancel"
                },
                {
                    text : "Eliminar",
                    onPress : () => {
            
                       setImageSelect(filter(imageSelected, (imageUrl) => imageUrl !== image));
                    }
                }
            ],
            {cancelable : false}
          )
    }

    return(
        <View style={styles.viewImage}>
            {size(imageSelected) <4 && (
                <Icon 
            type="material-community"
            name="camera"
            color="#7a7a7a"
            containerStyle={styles.containerIcon}
            onPress={() => imageSelect()}
            />
            )}
            
            {map(imageSelected,(imageRestaurante,index)=> (
                <Avatar 
                  key={index}
                  style={styles.minature}
                  source={{uri: imageRestaurante}}
                  onPress={() => removeImage(imageRestaurante)}
                  /> 
            ))
            }
        </View>
    )
}
function ImageRestaurante(props)
{
    const {imagenRestaunt} = props;
    return(
        <View style={styles.viewPoto}> 
        <Image 
        source={imagenRestaunt ?  {uri : imagenRestaunt} : require('../../../assets/img/no-image.png')}
        style = {{width : widthScreen,height : 200}}
        />
        </View>
    )
}
function Map(props)
{
    const {isVisibleMap,setIsVisibleMap} = props;
    return(
        <Modal
        isVisible={isVisibleMap}
        setIsVisible={setIsVisibleMap}
        >
            <Text>
             Hola
            </Text>
        </Modal>
    )
}
const styles = StyleSheet.create({
     scrollView:{
        height : "100%"
     },
     viewForm:{
        marginLeft : 10,
        marginRight : 10
     },
     containerInput:{
        marginBottom : 10
     },
     textArea:{
        width : "100%",
        height : 100,
        padding : 0,
        margin : 0
     },
     crearRestaurante:{
        backgroundColor : "#00a680",
        margin : 20
     },
     viewImage:{
        flexDirection : 'row',
        marginLeft : 20,
        marginRight: 20,
        marginTop : 20

     },
     containerIcon:{
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 10,
        height : 70,
        width: 70,
        backgroundColor : "#e3e3e3"
     },
     minature:{
        width: 70,
        height : 70,
        marginRight : 30
     },
     viewPoto:{
        alignItems : 'center',
        height : 200,
        marginTop : 20
     }
});