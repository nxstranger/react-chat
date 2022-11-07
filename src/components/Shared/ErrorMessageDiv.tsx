import React from "react";
import styled from "styled-components";

interface Error {
    errorInfo?: any;
}

const StyledErrorMessageDiv = styled.div`
  font-size: .75em;
  margin: 0;
  padding: 0;
  border: 0;
`

const StyledEmptyHolder = styled(StyledErrorMessageDiv)`
  padding-top: .75rem;
`


const EmptyHolder = () => {
    return <StyledEmptyHolder></StyledEmptyHolder>
}

const ErrorMessageDiv: React.FC<Error>= ({errorInfo}) => {

    return (
        (errorInfo)
            ? <StyledErrorMessageDiv>{errorInfo}</StyledErrorMessageDiv>
            : <EmptyHolder />
    )
}

export default ErrorMessageDiv;
