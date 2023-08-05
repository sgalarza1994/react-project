import {getAuth,EmailAuthProvider,reauthenticateWithCredential} from 'firebase/auth'
import {firebase} from '../utils/firebase_config'

export function reauthenticate  (password){

    const auth = getAuth();
    const userCurrent = auth.currentUser;
    const credentials = EmailAuthProvider.credential(userCurrent.email,password);
    return reauthenticateWithCredential(userCurrent,credentials);
}