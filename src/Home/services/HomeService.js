const HomeService = {
    getAll: async (offset) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset || 0}&limit=1000`);
        const body = await res.json();
        return Promise.resolve(body);
    },

    getTypes: async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/type`);
        const body = await res.json();
        return Promise.resolve(body);
    },

    getAllByType: async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${id}`);
        const body = await res.json();
        
        const formattedResponse = {
            results: body.pokemon.map(pokemon => {
                return pokemon.pokemon
            })
        }

        return Promise.resolve(formattedResponse);
    }
}

export default HomeService;