import React, {useState, useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PokemonListContainer from '../atoms/PokemonListContainer';
import PokemonArticle from '../atoms/PokemonArticle';
import capitalize from 'capitalize';


function PokemonsList({pokemons}) {
    const [offset, setOffset] = useState(0);
    const [loadedPokemons, setloadedPokemons] = useState([]);
    const limit = 10;

    const loadMorePokemons = useCallback(() => {
        setloadedPokemons([...loadedPokemons, ...pokemons.slice(offset, offset + limit)]);
        setOffset(offset + limit);
    }, [pokemons, offset, loadedPokemons]);

    useEffect(() => {
        setloadedPokemons([]);
        setOffset(0);
    }, [pokemons]);

    return (
        <div>
            <PokemonListContainer>
                {
                    loadedPokemons.map(pokemon => {
                        const pokemonUrl = new URL(pokemon.url);
                        const id = pokemonUrl.pathname.split('/')[4];
                        return (
                            <li key={id}>
                                <PokemonArticle>
                                    <h1>
                                        <Link
                                            to={`/pokemon/${pokemon.name}`}
                                            key={pokemon.name}
                                        >
                                            {capitalize(pokemon.name)}
                                        </Link>
                                    </h1>
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                        alt={pokemon.name}
                                    />
                                </PokemonArticle>
                            </li>
                        )
                    })
                }
            </PokemonListContainer>
            {
                pokemons.length ? (
                    <button onClick={loadMorePokemons}>Show more</button>
                ) : null
            }
        </div>
    )
}

export default PokemonsList;