import React from "react";
import {MessageInterface} from "../../interfaces/chatInterfaces";
import {MessageLineDiv} from '../../style/StyledChatComponents';
import Card from "react-bootstrap/Card";
import MessageStatusBox from "./MessageStatus";
import {colorScheme} from "../../modules/conf";

const MessageContainer = (props:MessageInterface) => {
    const {stamp, message, type} = props;
    return (
        <MessageLineDiv style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "0 2% 0.25rem 2%",
        }}>
            <div style={{
                width:"15%",
                textAlign: "center",
                margin: "0 auto"
            }}>
                <img
                    src={type == "MY" ? '/user-logo.png': "/contact-logo.jpeg"}
                    style={{
                        width:"100%",
                        maxWidth: "75px",
                        height: "auto",
                        borderRadius: "50%"
                    }}
                    alt=""
                />
            </div>

            <Card
                className='mb-1'
                style={{
                    width: "80%",
                    background: (type == 'MY') ? colorScheme.B : colorScheme.E,
                    color: (type == "MY") ? colorScheme.A : colorScheme.B,
            }}>
                <Card.Header
                    className='pb-0 bt-0'
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between"
                }}>
                    <Card.Subtitle>{type == "MY" ? "You": "Contact"}</Card.Subtitle>
                    {type == "MY"
                        ? <MessageStatusBox sent={true} read={false}/>
                        : ""
                    }
                    <Card.Subtitle>{new Date(stamp).toLocaleTimeString('ru-RU')}</Card.Subtitle>
                </Card.Header>
                <Card.Footer
                    // className='pb-0 bt-0 mt-0 mb-0'

                >
                    {message}
                </Card.Footer>
            </Card>
        </MessageLineDiv>
    )
}

export default MessageContainer;