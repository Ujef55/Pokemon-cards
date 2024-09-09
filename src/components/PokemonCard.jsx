import React from 'react'

function PokemonCard({ pokemonData }) {
    return (
        <li className='pokemon-card'>
            <figure>
                <img src={pokemonData.sprites.other.dream_world.front_default} alt="" className='pokemon-image' />
            </figure>
            <h1 className='pokemon-name'>{pokemonData.name}</h1>
            <div className='pokemon-info pokemon-highlight'>
                <p>
                    {pokemonData.types.map((currType) => currType.type.name).join(', ')}
                </p>
            </div>

            <div className='grid-three-cols'>
                <p className='pokemon-info'>Height: <span>{pokemonData.height}</span></p>
                <p className='pokemon-info'>Weight: <span>{pokemonData.weight}</span></p>
                <p className='pokemon-info'>Speed: <span>{pokemonData.stats[5].base_stat}</span></p>
            </div>

            <div className="grid-three-cols">
                <p className='pokemon-info'>Experience: <span>{pokemonData.base_experience}</span></p>
                <p className='pokemon-info'>Attack: <span>{pokemonData.stats[1].base_stat}</span></p>
                <p className='pokemon-info'>Ability: <span>{pokemonData.abilities.map((currAbility) => currAbility.ability.name).slice(0, 1)}</span>
                </p>
            </div>
        </li>
    )
}

export default PokemonCard;