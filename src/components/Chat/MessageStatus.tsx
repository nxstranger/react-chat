import React from "react";
import styled from "styled-components";


interface messageStatusInterface {
    sent: boolean;
    read: boolean;
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
    const {sent, read} = props;

    return (
        <StyledMessageStatusBox>
            <StyledStatusDiv status={sent}/>
            <StyledStatusDiv status={read}/>
        </StyledMessageStatusBox>
    )
}

export default MessageStatusBox;
