import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px lightgray;
    color: black;

    :hover {
        background: #f0f0f0;
    }
`;

const PokemonArticle = ({to, children}) => {
    return (
        <StyledLink to={to}>
            <Article>
                { children }
            </Article>
        </StyledLink>
    )
}

export default PokemonArticle;