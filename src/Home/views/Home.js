import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import HomeService from '../services/HomeService';

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);

    const fetchPokemons = useCallback(() => {
        (async () => {
            const res = await HomeService.getAll(offset);
            setPokemons([...pokemons, ...res.results]);
            setOffset(offset + res.results.length);
        })();
    }, [offset, pokemons]);

    useEffect(() => {
        fetchPokemons();
        // eslint-disable-next-line
    }, []);

    const handleNextButtonClick = () => {
        fetchPokemons();
    };

    return (
        <div>
            <h1>Home</h1>
            {
                pokemons.map(pokemon => {
                    return (
                        <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>{pokemon.name}</Link>
                    )
                })
            } {
                offset > 0 ? (
                    <button onClick={handleNextButtonClick}>Show more</button>
                ) : null
            }
        </div>
    )
}

export default Home;
