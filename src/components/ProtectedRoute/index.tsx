import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { PagesEnum } from "../../enums/pagesEnum";
import { useAppSelector } from "../../hooks/storeHooks";

const ProtectedRoute: React.FC<PropsWithChildren>= ({ children }) => {
    const isAuthorized = useAppSelector(({ chat }) => chat.token);
    const location = useLocation();

    return (
        <>
            {!isAuthorized ? (
                <Navigate to={PagesEnum.IndexPage} state={{ from: location }} replace />
            ) : (
                children
            )}
        </>
    );
};

export default ProtectedRoute;
