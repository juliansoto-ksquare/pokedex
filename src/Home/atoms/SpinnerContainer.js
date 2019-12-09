import React from 'react';
import styled from 'styled-components';
import spinner from '../../images/rolling.gif';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

function SpinnerContainer({forwardRef}) {
    return (
        <Container ref={forwardRef}>
            <img src={spinner} alt="Loading" />
        </Container>
    )
}

export default SpinnerContainer;