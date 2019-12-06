import React, {useState, useEffect, useCallback} from 'react';
import HomeService from '../services/HomeService';
import TypeButton from '../atoms/TypeButton';
import PokemonsList from '../components/PokemonsList';

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
            <PokemonsList pokemons={pokemons} />
        </div>
    )
}

export default Home;
