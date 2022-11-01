import styled from 'styled-components';
import {colorScheme} from "../modules/conf";

const ChatBodyDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  min-width: 540px;
  margin: 0 2px;
  height: auto;
  display: flex;
  background: ${colorScheme.B};
  flex-direction: column;
`;

const MessageLineDiv = styled.div`
  margin-top: 1px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputFormWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  min-width: 540px;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  padding: .25rem;
  border-top: 1px solid ${colorScheme.A};
`

const BaseSystemMessageStyle = styled.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 0.8em;
  word-wrap: break-word;
  font-style: italic;
`;

const InfoMessageP = styled(BaseSystemMessageStyle)`
  background: beige;
`;

const ErrorMessageP = styled(BaseSystemMessageStyle)`
  background: lightpink;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: .35rem;
  background: ${colorScheme.B};
  color: ${colorScheme.E};
  padding: 0.35rem 0.75rem;
`

export {
    ChatBodyDiv,
    MessageLineDiv,
    InfoMessageP,
    ErrorMessageP,
    InputFormWrapper,
    StyledButton,
};

