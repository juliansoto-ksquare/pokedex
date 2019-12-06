import React from 'react';
import styled from 'styled-components';

const PokemonType = styled.button`
    padding: 0.5em 1em;
    background: #51518f;
    border: none;
    border-radius: 2em;
    font-size: 1em;
    color: white;
    margin-bottom: 0.5em;
    margin-right: 0.5em;
`;

const TypeButton = ({pokemonType, pokemonTypeIndex, onClick}) => {
    const handleClick = () => {
        const typeId = parseInt(pokemonTypeIndex) + 1;
        onClick(typeId);
    }

    return (
        <PokemonType onClick={handleClick}>{pokemonType.toUpperCase()}</PokemonType>
    )
}

export default TypeButton;