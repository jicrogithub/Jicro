import { io } from "socket.io-client";
import IP from "../../../constants/IP";

class SocketIO {
    init = async () => {
        this.socket = io(IP.socket, {
            transports: ['websocket']
        })
        this.socket.on('connect',()=>{
            
        })
        this.socket.on('error',(e)=>{
            
        })
    }

    emit = (event, data = {}) => {
        this.socket.emit(event, data)
    }

    on = (event, cb) => {
        this.socket.on(event, cb)
    }

    off = (event, cb) => {
        this.socket.off(event)
    }
}

const socket = new SocketIO();

export default socket;