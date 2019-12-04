const PokemonService = {
    getOneByNameOrId: async (pokemonName) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const {id, sprites, types, name} = await res.json();
        return Promise.resolve({id, sprites, types, name});
    }
};

export default PokemonService;