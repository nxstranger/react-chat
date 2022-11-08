import React, { useEffect} from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import Message from "./MessageLine";


const ChatBox = () => {
    const messages = useAppSelector(state => state.chat.messages);
    useEffect( () => {
        console.log('init chatbox');
    }, []);
    return (
        <div className="mt-5 mb-5 pb-2">
            {
                (messages.length)
                    ? messages.map((msg, index) => (
                        <Message
                            {...msg}
                            key={"k" + msg.stamp + "-" + msg.type + "-" + index}
                        />))
                    : ""
            }
        </div>
    )
};

export default ChatBox;
