import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import HomeService from '../services/HomeService';
import TypeButton from '../atoms/TypeButton';
import PokemonsList from '../components/PokemonsList';
import Header from '../atoms/Header';
import HeaderTitle from '../atoms/HeaderTitle';

const HomeContainer = styled.div`
    padding-top: 8em;
`;

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
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
        setFilteredPokemons(pokemons);
    }, [pokemons]);

    useEffect(() => {
        fetchPokemons();
        // eslint-disable-next-line
    }, []);

    const handleSearchBarChange = useCallback(e => {
        const value = e.target.value;
        const filtered = pokemons.filter(pokemon => {
            return pokemon.name.match(new RegExp(value, 'i')) ? true : false
        });

        setFilteredPokemons(filtered);
    }, [pokemons]);

    return (
        <HomeContainer>
            <Header>
                <HeaderTitle>Pokedex</HeaderTitle>
            </Header>
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
            <input onChange={handleSearchBarChange} />
            <PokemonsList pokemons={filteredPokemons} />
        </HomeContainer>
    )
}

export default Home;
