import { showMessage, hideMessage } from "react-native-flash-message";
import { main } from './../utils/colors';

export const messagePopup = (title, message, type) => {
    showMessage({
        message: title,
        type: "info",
        backgroundColor: '#fff',
        color: type !== 'danger'?main.primary:'red',
        animated: true,
        hideStatusBar: false,
        autoHide: true,
        duration: 2500,
        position: 'top',
        floating: true,
        description: message,
        type,
        style:{
            borderColor:'#000',
            borderWidth:2
        },
        
    });
}