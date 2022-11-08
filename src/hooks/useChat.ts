import {useEffect, useRef, useCallback} from "react";
import {addMessage, unAuthorizeUser} from "../store/chatSlice";
import {SendMessageType} from "../interfaces/chatInterfaces";
import env from "../modules/conf";
import useScroll from "./useScroll";
import { useAppDispatch, useAppSelector } from "./storeHooks";



const useChat = () => {
    const socket = useRef<null | WebSocket>(null);
    const dispatch = useAppDispatch();
    const token = useAppSelector(({chat}) => chat.token);
    const {scrollBodyToBottom} = useScroll();

    const sockOnOpen = async () => {
        console.log('connected');
        console.log('socket.current ', socket.current);
        if (socket.current && socket.current?.readyState == 1){
            dispatch(addMessage({
                type: 'INFO',
                message: 'You are connected',
                stamp: +(new Date()).getTime(),
            }));
            // const keys = await cryptoUtils.generateKeysPair();
            // console.log('pairs', keys);
        }
    }

    const sockOnClose = ({code, type}: CloseEvent) => {
        console.log(`disconnected code:${code}, ${type}`);
        dispatch(addMessage({
            type: 'INFO',
            message: 'You are disconnected',
            stamp: +(new Date()).getTime(),
        }));
        socket.current = null;
        dispatch(unAuthorizeUser());
    };

    const sockOnMessage = (msg: MessageEvent) => {
        console.log('json parse', JSON.parse(msg.data));
        const {stamp, message, type} = JSON.parse(msg.data);
        console.log('onmessage type:', type);
        switch (type) {
            case 'MSG':
                dispatch(addMessage({type:'PT', stamp, message}));
                break;
            case 'INFO':
                dispatch(addMessage({type:'INFO', stamp, message}));
                break;
            default:
                dispatch(addMessage({type:'ERR', stamp, message}));
        }
        scrollBodyToBottom(100);
    };

    const connectToSocket = () => {
        if (socket.current || !token) {
            console.log('connectToSocket: socket already exist or token false');
            return;
        }
        const path = `${env.wsHost}/?token=${token}`;
        const ws = new WebSocket(path);
        socket.current = ws;
        // if ([0,1].includes(ws.readyState)) {
        // if ([0,1].includes(ws.readyState)) {
        ws.onopen = sockOnOpen;
        ws.onclose = sockOnClose;
        ws.onmessage = sockOnMessage;
        // }
        console.log('Connected');
    }

    useEffect(() => {
        console.log('Init useChat', socket.current);
        connectToSocket();
        return () => {
            console.log('close UseChat');
            if (socket.current && socket.current?.readyState > 0) {
                socket.current.close(1000);
                socket.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!token && socket.current) {
            socket.current?.close(1000);
            socket.current = null;
        }
    }, [token])

    const sendMessage = useCallback((text:string, messageType:SendMessageType='MSG') => {
        if (socket.current) {
            console.log('sendMessage', text);
            console.log(socket.current.readyState);
            const message = {
                message: text,
                stamp: +(new Date()),
                type: messageType,
            };
            try {
                socket.current.send(JSON.stringify(message));
                dispatch(addMessage({type: "MY", message: message.message, stamp: message.stamp, status: "SENT"}))
            } catch (err) {
                console.log(err);
            }
        }
    }, [token]);
    return { sendMessage }
};

export default useChat;
