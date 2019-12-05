import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import HomeService from '../services/HomeService';

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pokemonTypes, setPokemonTypes] = useState(null);

    const fetchPokemons = useCallback(() => {
        (async () => {
            const res = await HomeService.getAll(offset);
            setPokemons([...pokemons, ...res.results]);
            setOffset(offset + res.results.length);
        })();
    }, [offset, pokemons]);

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
            <h1>Home</h1>
            {
                pokemonTypes ? (
                    <section>
                        {
                            pokemonTypes.map(pokemonType => {
                                return (
                                    <button key={pokemonType.name}>
                                        {pokemonType.name}
                                    </button>
                                )
                            })
                        }
                    </section>
                ) : null
            }
            {
                pokemons.map(pokemon => {
                    const pokemonUrl = new URL(pokemon.url);
                    const id = pokemonUrl.pathname.split('/')[4];
                    return (
                        <article key={id}>
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
                        </article>
                    )
                })
            }
        </div>
    )
}

export default Home;
