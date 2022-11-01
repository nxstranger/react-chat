import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { PagesEnum } from "../../enums/pagesEnum";
import {setIsInitializing} from '../../store/mainSlice'
import Loader from "../Loader/index";
import Home from './Home';
import ChatPage from './ChatPage';
import ContactPage from "./ContactPage";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import styled from "styled-components";
import {colorScheme} from '../../modules/conf';

const BodyWrapper = styled.div`
  background: ${colorScheme.C};
  width: 100vw;
  height: 100vh;
`


const ActiveZone = styled.div`
  max-width: 1000px;
  min-width: 420px;
  margin: 0 auto;
`

const Pages: React.FC = () => {
    const dispatch = useAppDispatch();
    const isInitializing = useAppSelector(({ main }) => main.isInitializing);
    useEffect(() => {
        dispatch(setIsInitializing(false));
    }, []);
    return (
    <>
        {isInitializing ? (
            <Loader />
        ) : (
            <BodyWrapper>
                <ActiveZone>
                    <Routes>
                        <Route path={PagesEnum.IndexPage} element={<Home />} />
                        <Route path={PagesEnum.ChatPage} element={<ChatPage />} />
                        <Route path={PagesEnum.ContactPage} element={<ContactPage />} />
                        {/*<Route path={PagesEnum.Countdown} element={<Countdown />} />*/}
                    </Routes>
                </ActiveZone>
            </BodyWrapper>
        )}
    </>);
}
export  default Pages;
