import React, {useState, useEffect, useCallback} from 'react';
import HomeService from '../services/HomeService';
import TypeButton from '../atoms/TypeButton';
import PokemonsList from '../components/PokemonsList';

import pokedexLogo from '../../images/Pokedex_logo.png';

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    const fetchPokemons = useCallback(() => {
        (async () => {
            const res = await HomeService.getAll();
            setPokemons([...pokemons, ...res.results]);
        })();
    }, [pokemons]);

    const fetchPokemonsByType = useCallback(pokemonTypeIndex => {
        setPokemons([]);
        (async () => {
            let res;
            if (pokemonTypeIndex === null) {
                res = await HomeService.getAll();
            } else {
                res = await HomeService.getAllByType(pokemonTypeIndex);
            }
            setPokemons(res.results);
            setSelectedType(pokemonTypeIndex);
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
                                        selected={selectedType === index + 1}
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
