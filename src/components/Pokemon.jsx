import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

function Pokemon() {
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const pokemonApi = 'https://pokeapi.co/api/v2/pokemon/?offset=10&limit=125';

    async function fetchPokemonApi() {
        try {
            const response = await fetch(pokemonApi);
            const pokemonApiData = await response.json();

            const pokemonDetailedApiData = pokemonApiData.results.map(async (currPokemonData) => {
                const response = await fetch(currPokemonData.url);
                const pokemonApiData = await response.json();
                return pokemonApiData;
            });

            const detailedResponse = await Promise.all(pokemonDetailedApiData);
            setPokemonData(detailedResponse);
            setIsLoading(false);
            console.log(detailedResponse);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchPokemonApi();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <section className="container">
            <header>
                <h1>Pokémon Cards</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" />
            </div>
            <ul className="cards">
                {pokemonData.map((currPokemon) => {
                    return <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />
                })}
            </ul>
        </section>
    )
}

export default Pokemon;