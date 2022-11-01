import React, {useEffect} from 'react';
import ChatBody from "../../Chat";
import ProtectedRoute from "../../ProtectedRoute/index";

const Main : React.FC = () => {

    useEffect(() => {
        console.log('Main init');
    }, []);
    return (
        <ProtectedRoute>
            <ChatBody />
        </ProtectedRoute>
    );
};

export default Main;


