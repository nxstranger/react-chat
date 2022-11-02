import React from "react";
import styled from "styled-components";
import { MessageStatusEnum } from '../../interfaces/chatInterfaces';

interface messageStatusInterface {
    status: MessageStatusEnum,
}

const StyledMessageStatusBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1.5em;
`

const StyledStatusDiv = styled.div`
  width: 0.5em;
  height: 0.5em;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  text-align: center;
  color: white;
  background: ${(p: {status: boolean}) => p.status ? "#42da09" : "#000"};
`



const MessageStatusBox = (props:messageStatusInterface) => {
    const {status} = props;

    return (
        <StyledMessageStatusBox>
            <StyledStatusDiv status={["DELIVERED", "READ"].includes(status)}/>
            <StyledStatusDiv status={status=="READ"}/>
        </StyledMessageStatusBox>
    )
}

export default MessageStatusBox;
