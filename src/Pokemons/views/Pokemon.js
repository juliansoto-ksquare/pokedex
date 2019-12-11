import React, {useState, useEffect} from 'react';
import PokemonService from '../services/PokemonService';
import NavigationBar from '../atoms/NavigationBar';
import NavigationButton from '../atoms/NavigationButton';
import TypeSpan from '../atoms/TypeSpan';
import PokemonName from '../atoms/PokemonName';
import Id from '../atoms/Id';
import Header from '../../Home/atoms/Header';
import HeaderTitle from '../../Home/atoms/HeaderTitle';
import capitalize from 'capitalize';
import PokemonViewContainer from '../atoms/PokemonViewContainer';
import PokemonSprite from '../atoms/PokemonSprite';

function Pokemon(props) {
    const [pokemonInfo, setPokemonInfo] = useState({});

    useEffect(() => {
        (async () => {
            const res = await PokemonService.getOneByNameOrId(props.match.params.nameOrId);
            setPokemonInfo(res);
        })();
    }, [props.match.params.nameOrId]);

    return (
        <PokemonViewContainer>
            <Header>
                <HeaderTitle to="/">
                    Pokedex
                </HeaderTitle>
            </Header>
            {
                pokemonInfo.id ? (
                    <>
                        <NavigationBar>
                            <NavigationButton to={`/pokemon/${pokemonInfo.id - 1}`}>❮ Previous</NavigationButton>
                            <NavigationButton to={`/pokemon/${pokemonInfo.id + 1}`}>Next ❯</NavigationButton>
                        </NavigationBar>
                        <div>
                            <PokemonName>{capitalize(pokemonInfo.name)}</PokemonName>
                            <Id>#{pokemonInfo.id}</Id>
                        </div>
                    </>
                ) : null
            }
            {
                pokemonInfo.sprites ? (
                    <PokemonSprite src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
                ) : null
            }

            {
                pokemonInfo.types && (
                    <div>
                        Types
                        {
                            pokemonInfo.types.map((typesItem, index) => {
                                return <TypeSpan key={index}>{capitalize(typesItem.type.name)}</TypeSpan>
                            })
                        }
                    </div>
                )
            }
        </PokemonViewContainer>
    );
}

export default Pokemon;
