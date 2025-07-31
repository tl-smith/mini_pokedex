import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const PokemonDetails = () => {
  const {pokemonName} = useParams();

const fetchPokemon = async (name) => {
    const response = await
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
};

const {data, isLoading, isError} = useQuery({

    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon (pokemonName),
    
});

if (isLoading) return <p>Loading...</p>;
if (isError) return <p>Something went wrong!</p>;

return (
    <div className="text-center shadow-lg rounded-lg p-20 bg-white">
        <h1 className="text-black">{data.name}</h1>
        <div className="flex justify-center mb-4">
            <img src={data.sprites.front_default} alt={data.name} />
        </div>
        <p className="text-black">Height: {data.height}</p>
        <p className="text-black">Weight: {data.weight}</p>
    </div>
)

}

export default PokemonDetails
