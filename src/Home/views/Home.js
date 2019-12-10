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
            <PokemonsList pokemons={pokemons} />
        </HomeContainer>
    )
}

export default Home;
