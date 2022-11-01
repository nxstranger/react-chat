import { useEffect, useRef, useState, useCallback } from "react";
import env from "../modules/conf";
import {addMessage, unAuthorizeUser} from "../store/chatSlice";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import {SendMessageType} from "../interfaces/chatInterfaces";
import {useNavigate} from "react-router-dom";
import { PagesEnum } from "../enums/pagesEnum";

const useChat = () => {
    const [isConnected, setIsConnected] = useState(false)
    const socket = useRef<null | WebSocket>(null);
    const reconnectTimeout = useRef<null | any>(null)
    const dispatch = useAppDispatch();
    const token = useAppSelector(({chat}) => chat.token);
    const contactName = useAppSelector(({chat}) => chat.contactName);
    const navigate = useNavigate();

    const sockOnOpen = () => {
        console.log('connected');
        setIsConnected(true);
        console.log('sockOnOpen / isConnected', isConnected);
        dispatch(addMessage({
            type: 'INFO',
            message: 'You are connected',
            stamp: +(new Date()).getTime(),
        }));
        console.log('reconnectTimeout', reconnectTimeout.current);
        if (reconnectTimeout.current) {
            console.log('Clear timeout');
            clearTimeout(reconnectTimeout.current);
        }
    };

    const sockOnClose = (userToken: string) => ({code, type}: CloseEvent) => {
        console.log('sockOnClose / isConnected', isConnected);
        console.log(`disconnected code:${code}, ${type}`);
        if (isConnected) {
            dispatch(addMessage({
                type: 'INFO',
                message: 'You are disconnected',
                stamp: +(new Date()).getTime(),
            }));
            setIsConnected(false);
        }
        if ([1000, 3008, 3009, 3500].includes(code)) {
            clearTimeout(reconnectTimeout.current);
            console.log('Deauthorize user');
            dispatch(unAuthorizeUser());
            navigate(PagesEnum.IndexPage);
            return;
        }
        reconnectTimeout.current = setTimeout(() => {
            if (!isConnected) connectToSocket(userToken);
        }, 3000);
        socket.current = null;
    };

    const connectToSocket = (userToken: string) => {
        console.log('\n\n');
        console.log('connection props, token - ', userToken);
        const path = `${env.wsHost}/?user=${userToken}`;
        const ws = new WebSocket(path);
        ws.onopen = sockOnOpen;
        ws.onclose = sockOnClose(userToken);
        ws.onmessage = (msg) => {
            console.log('onmessage', msg);
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
        }
        socket.current = ws;
    }

    useEffect(() => {
        console.log('useChat', socket.current);
        if (!socket.current && token) {
            console.log('useEffect call connectToSocket');
            connectToSocket(token);
        }
        return () => {
            if (socket.current && socket.current.readyState === 1) { socket.current.close(); }
        };
    }, [token, contactName]);

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
            } catch (err) {
                console.log(err);
            }
            dispatch(addMessage({type: "MY", message: message.message, stamp: message.stamp}))
        }
    }, [token, contactName]);
    return { sendMessage }
};

export default useChat;
