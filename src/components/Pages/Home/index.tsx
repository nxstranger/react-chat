import React, {useEffect} from 'react';
import styled from "styled-components";
import LoginForm from "../LoginPage/LoginForm";
import {setToken} from "../../../store/chatSlice";
import { useAppDispatch } from '../../../hooks/storeHooks';
import Card from 'react-bootstrap/Card';

const LoginWrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Home = () => {
    const dispatch = useAppDispatch();
    const cleanToken = () => {
        dispatch(setToken(''));
    };

    useEffect(() => {
        console.log('init Home');
        cleanToken();
    }, []);
    return (
        <LoginWrapper>
        <Card style={{
            maxWidth: '800px',
            minWidth: '320px'
        }}>
            <Card.Header>
                <Card.Title style={{textAlign: 'center'}}>
                    {"Sign in"}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <LoginForm/>
            </Card.Body>
        </Card>
        </LoginWrapper>
    );
};

export default Home;


