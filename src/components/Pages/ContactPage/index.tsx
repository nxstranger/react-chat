import React, {useEffect} from "react";
import {useAppSelector} from "../../../hooks/storeHooks";
import ChangeContactForm from "./ChangeContactForm";
import ProtectedRoute from "../../ProtectedRoute";
import {useNavigate} from "react-router-dom";
import {PagesEnum} from "../../../enums/pagesEnum";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContactPage = () => {
    const contactName = useAppSelector(({chat}) => chat.contactName);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('init ContactSetupWrapper');
        if (contactName) {
            console.log('contactName:', contactName);
            navigate(PagesEnum.ChatPage);
        }
    }, [contactName])

    return (
        <ProtectedRoute>
            <Wrapper>
                <Card style={{
                    maxWidth: '800px',
                    minWidth: '420'
                }}>
                    <Card.Header>
                        {'Setup contact'}
                    </Card.Header>
                    <Card.Body>
                        <ChangeContactForm />
                    </Card.Body>
                </Card>
            </Wrapper>
        </ProtectedRoute>
    )
}

export default ContactPage;
