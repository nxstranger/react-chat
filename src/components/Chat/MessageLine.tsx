import React from "react";
import {
    InfoMessageP,
    MessageLineDiv,
    ErrorMessageP,
} from "../../style/StyledChatComponents";
import {MessageInterface} from "../../interfaces/chatInterfaces";
// import MyMessage from './MyMessage';
// import PartnerMessage from './PartnerMessage';
import MessageContainer from "./MessageContainer";

const Message = (props: MessageInterface) => {
    const { type, message, stamp } = props;
    return (
        <MessageLineDiv key={stamp}>
            {(
                () => {
                switch(type) {
                    case 'MY':
                    case 'PT':
                        return <MessageContainer {...props} key={stamp} />
                    case 'INFO':
                        return <InfoMessageP>{message}</InfoMessageP>
                    default:
                        return <ErrorMessageP>{message}</ErrorMessageP>;
                }}
            )()}
        </MessageLineDiv>
    )
}

export default Message;
