import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'; 

const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px lightgray;
    padding: 1em;
    color: black;

    :hover {
        background: #f0f0f0;
    }
`;

const PokemonArticle = ({to, children}) => {
    return (
        <Link to={to}>
            <Article>
                { children }
            </Article>
        </Link>
    )
}

export default PokemonArticle;