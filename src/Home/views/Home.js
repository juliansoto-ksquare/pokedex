import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import HomeService from '../services/HomeService';
import PokemonArticle from '../atoms/PokemonArticle';
import TypeButton from '../atoms/TypeButton';
import PokemonListContainer from '../atoms/PokemonListContainer';

import pokedexLogo from '../../images/Pokedex_logo.png';

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pokemonTypes, setPokemonTypes] = useState([]);

    const fetchPokemons = useCallback(() => {
        (async () => {
            const res = await HomeService.getAll(offset);
            setPokemons([...pokemons, ...res.results]);
            setOffset(offset + res.results.length);
        })();
    }, [offset, pokemons]);

    const fetchPokemonsByType = useCallback(pokemonTypeIndex => {
        (async () => {
            
            const res = await HomeService.getAllByType(pokemonTypeIndex);
            setPokemons(res.results);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await HomeService.getTypes();
            setPokemonTypes(res.results);
        })();
    }, []);

    useEffect(() => {
        fetchPokemons();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <img src={pokedexLogo} alt="" />
            {
                pokemonTypes ? (
                    <section>
                        {
                            pokemonTypes.map((pokemonType, index) => {
                                return (
                                    <TypeButton
                                        key={pokemonType.name}
                                        onClick={fetchPokemonsByType}
                                        pokemonType={pokemonType.name}
                                        pokemonTypeIndex={index}
                                    ></TypeButton>
                                )
                            })
                        }
                    </section>
                ) : null
            }
            <PokemonListContainer>
                {
                    pokemons.map(pokemon => {
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
                                            {pokemon.name}
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
        </div>
    )
}

export default Home;
