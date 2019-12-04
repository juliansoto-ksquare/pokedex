const HomeService = {
    getAll: async (offset) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset || 0}`);
        const body = await res.json();
        return Promise.resolve(body);
    }
}

export default HomeService;