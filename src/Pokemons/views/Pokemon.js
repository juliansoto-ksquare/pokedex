import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PokemonService from '../services/PokemonService';

function Pokemon(props) {
    const [pokemonInfo, setPokemonInfo] = useState({});

    useEffect(() => {
        (async () => {
            const res = await PokemonService.getOneByNameOrId(props.match.params.nameOrId);
            setPokemonInfo(res);
        })();
    }, [props.match.params.nameOrId]);

    return (
        <div>
            <Link to="/">Home</Link>
            {
                pokemonInfo.id ? (
                    <div>
                        <Link to={`/pokemon/${pokemonInfo.id - 1}`}>Previous</Link>
                        <Link to={`/pokemon/${pokemonInfo.id + 1}`}>Next</Link>
                    </div>
                ) : null
            }
            <h1>{pokemonInfo.name}</h1>
            <span>ID: {pokemonInfo.id}</span>
            {
                pokemonInfo.sprites ? (
                    <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
                ) : null
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
