import React from "react";

import LoaderLayout from "./Loader.layout";

interface Props {
    containerBox?: number;
}

const Index: React.FC<Props> = ({ containerBox }) => {
    return (
        <LoaderLayout containerBox={containerBox}>
            <div className="loader" />
        </LoaderLayout>
    );
};

export default Index;
