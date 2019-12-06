import React from 'react';
import styled from 'styled-components';
import capitalize from 'capitalize';

const PokemonType = styled.button`
    padding: 0.5em 1em;
    background: ${props => props.selected ? '#51518f' : '#f0f0f0'};
    border: none;
    border-radius: 2em;
    font-size: 1em;
    color: ${props => props.selected ? 'white' : 'black'};
    margin-bottom: 0.5em;
    margin-right: 0.5em;
`;

const TypeButton = ({pokemonType, pokemonTypeIndex, onClick, selected}) => {
    const handleClick = () => {
        const typeId = parseInt(pokemonTypeIndex) + 1;
        onClick(selected ? null : typeId);
    }

    return (
        <PokemonType
            onClick={handleClick}
            selected={selected}
        >
            {capitalize(pokemonType)}
        </PokemonType>
    )
}

export default TypeButton;