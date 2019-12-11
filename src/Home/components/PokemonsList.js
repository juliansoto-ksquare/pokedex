import React, {useState, useCallback, useEffect} from 'react';
import { useInView } from 'react-intersection-observer';
import PokemonListContainer from '../atoms/PokemonListContainer';
import PokemonArticle from '../atoms/PokemonArticle';
import TitleContainer from '../atoms/TitleContainer';
import capitalize from 'capitalize';
import PokemonImg from '../atoms/PokemonImg';
import PokemonImgContainer from '../atoms/PokemonImgContainer';
import IdContainer from '../atoms/IdContainer';
import DefaultPokemonIcon from '../../images/pokeball.png';
import SpinnerContainer from '../atoms/SpinnerContainer';

function PokemonsList({pokemons}) {
    const [offset, setOffset] = useState(0);
    const [loadedPokemons, setloadedPokemons] = useState([]);
    const limit = 10;

    const loadMorePokemons = useCallback(() => {
        const rest = pokemons.slice(offset, offset + limit);
        setloadedPokemons([...loadedPokemons, ...rest]);
        setOffset(offset + rest.length);
    }, [pokemons, offset, loadedPokemons]);

    const [ref, inView] = useInView();

    useEffect(() => {
        setloadedPokemons([]);
        setOffset(0);
    }, [pokemons]);

    useEffect(() => {
        if (inView) {
            loadMorePokemons();
        }
    }, [inView]);

    return (
        <div>
            <PokemonListContainer>
                {
                    loadedPokemons.map(pokemon => {
                        const pokemonUrl = new URL(pokemon.url);
                        const id = pokemonUrl.pathname.split('/')[4];
                        return (
                            <li key={id}>
                                <PokemonArticle to={`/pokemon/${pokemon.name}`}>
                                    <PokemonImgContainer>
                                        <PokemonImg
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                            alt={pokemon.name}
                                            onError = {(e) => {
                                                e.target.src = DefaultPokemonIcon;
                                            }}
                                        />
                                    </PokemonImgContainer>
                                    <TitleContainer>
                                        <IdContainer>{id}</IdContainer>
                                        <h1>{capitalize(pokemon.name)}</h1>
                                    </TitleContainer>
                                </PokemonArticle>
                            </li>
                        )
                    })
                }
            </PokemonListContainer>
            {
                offset < pokemons.length && (
                    <div ref={ref}>
                        <SpinnerContainer />
                    </div>
                )
            }
        </div>
    )
}

export default PokemonsList;