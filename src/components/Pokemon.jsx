import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

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
            setPokemonData(detailedResponse);
            console.log(detailedResponse);
        } catch (error) {
            console.log('Error fetching pokemon data', error);
        }
    }

    useEffect(() => {
        fetchPokemonApi();
    }, [])

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