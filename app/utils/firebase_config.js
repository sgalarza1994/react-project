import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCpTVo5O1PtsqFypr6YM1ZXGFCxhO4cr_4",
    authDomain: "tenedores-281c3.firebaseapp.com",
    projectId: "tenedores-281c3",
    storageBucket: "tenedores-281c3.appspot.com",
    messagingSenderId: "330648237342",
    appId: "1:330648237342:web:fe6868f9125189ec2e050f"
  };

  console.log('vamos a cargar la configuracion')
if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}
  let initializaApp = initializeApp(firebaseConfig);
  export   {initializaApp,firebase};
     //export const firebaseApp = initializeApp(firebaseConfig);
