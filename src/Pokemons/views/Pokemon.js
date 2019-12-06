import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PokemonService from '../services/PokemonService';
import NavigationBar from '../atoms/NavigationBar';
import NavigationButton from '../atoms/NavigationButton';
import TypeSpan from '../atoms/TypeSpan';
import Id from '../atoms/Id';

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
                    <NavigationBar>
                        <NavigationButton to={`/pokemon/${pokemonInfo.id - 1}`}>❮ Previous</NavigationButton>
                        <NavigationButton to={`/pokemon/${pokemonInfo.id + 1}`}>Next ❯</NavigationButton>
                    </NavigationBar>
                ) : null
            }
            <h1>{pokemonInfo.name}</h1>
            <Id>ID: {pokemonInfo.id}</Id>
            {
                pokemonInfo.sprites ? (
                    <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
                ) : null
            }
            {
                pokemonInfo.types ? pokemonInfo.types.map((typesItem, index) => {
                    return <TypeSpan key={index}>{typesItem.type.name}</TypeSpan>
                }) : null
            }
        </div>
    );
}

export default Pokemon;
