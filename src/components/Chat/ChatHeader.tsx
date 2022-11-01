import React, {SyntheticEvent} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {unAuthorizeUser} from "../../store/chatSlice";
import {StyledButton} from "../../style/StyledChatComponents";
import {colorScheme} from "../../modules/conf";


const ChatHeaderDiv = styled.div`
  width: 100%;
  max-width: 1000px;
  min-width: 540px;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  justify-content: space-between;
  padding: .25rem 0;
  border-bottom: 1px solid ${colorScheme.A};
`

const LogoutWrapper = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const ChatHeader = () => {
    const {userName, contactName} = useAppSelector(({ chat }) => chat);
    const dispatch = useAppDispatch();
    const logoutAction = ({currentTarget}: SyntheticEvent<HTMLButtonElement>) => {
        currentTarget.disabled = true;
        dispatch(unAuthorizeUser());
        console.log('LogOut');
    }
    return (
        <ChatHeaderDiv>
            <LogoutWrapper>
                <StyledButton type='button' onClick={logoutAction}>
                    {'LogOut'}
                </StyledButton>
            </LogoutWrapper>
            <InfoWrapper>
                <div>{'user: '}{userName}</div>
                <div style={{marginLeft: '4rem'}}>{'contact: '}{contactName}</div>
            </InfoWrapper>
        </ChatHeaderDiv>
    )
}

export default ChatHeader;
