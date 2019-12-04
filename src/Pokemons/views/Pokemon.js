import React, {useState, useEffect} from 'react';
import PokemonService from '../services/PokemonService';

function Pokemon(props) {
    const [pokemonInfo, setPokemonInfo] = useState({});

    useEffect(() => {
        (async () => {
            const res = await PokemonService.getOneByName('pikachu');
            setPokemonInfo(res);
        })();
    }, [props.match.params.name]);

    return (
        <div>
            <h1>{pokemonInfo.name}</h1>
            <span>ID: {pokemonInfo.id}</span>
            {
                pokemonInfo.sprites ? Object.entries(pokemonInfo.sprites).map(entry => {
                    return <img src={entry[1]} key={entry[0]} alt={entry[0]} />
                }) : null
            }
            {
                pokemonInfo.types ? pokemonInfo.types.map((typesItem, index) => {
                    return <span key={index}>{typesItem.type.name}</span>
                }) : null
            }
        </div>
    );
}

export default Pokemon;
