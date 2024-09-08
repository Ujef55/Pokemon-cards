import { useState, useEffect } from "react";

function Pokemon() {
    const [pokemonData, setPokemonData] = useState([]);

    const pokemonApi = 'https://pokeapi.co/api/v2/pokemon/?offset=10&limit=125';

    async function fetchPokemonApi() {
        try {
            const response = await fetch(pokemonApi);
            if (!response.ok) {
                throw new Error("Failed fetching an api");
            }
            const pokemonApiData = await response.json();

            const pokemonDetailedApiData = pokemonApiData.results.map(async (currPokemonData) => {
                const response = await fetch(currPokemonData.url);
                const pokemonApiData = await response.json();
                return pokemonApiData;
            });

            const detailedResponse = await Promise.all(pokemonDetailedApiData);
            console.log(detailedResponse);

        } catch (error) {
            console.log('Error fetching pokemon data', error);
        }
    }

    useEffect(() => {
        fetchPokemonApi();
    }, [])

    return (
        <div>Hello</div>
    )
}

export default Pokemon;