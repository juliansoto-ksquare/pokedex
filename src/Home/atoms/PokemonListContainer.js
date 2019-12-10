import styled from 'styled-components';

const PokemonListContainer = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1em;
    list-style: none;
    padding: 0;

    @media (min-width: 360px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 720px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1023px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

export default PokemonListContainer;