import React from "react";
import './App.css';
import { Provider } from 'react-redux';
import {store} from './store/store';
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter } from "react-router-dom";
import Pages from './components/Pages/Pages'
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            {/*<GlobalStyle />*/}
            <Provider store={store}>
                <BrowserRouter>
                    <Pages />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>

    );
};

export default App;
