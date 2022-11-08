import React, {useEffect} from 'react';
import { ChatBodyDiv, InputFormWrapper } from '../../style/StyledChatComponents';
import ChatBox from './ChatBox';
import MessageForm from './ChatFooter';
import ChatHeader from "./ChatHeader";



const ChatBody = () => {
    useEffect(() => {
        console.log('Chat index init');
    }, [])
    return (
        <ChatBodyDiv>
            <ChatHeader/>
            <ChatBox />
            <InputFormWrapper>
                <MessageForm />
            </InputFormWrapper>
        </ChatBodyDiv>
    )
}

export default ChatBody;
