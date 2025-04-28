import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { PokemonCard } from '../components/Card';
import { Container } from '@mui/material';
import axios from 'axios';
import { Skeletons } from '../components/Skeletons';

export const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const results = response.data.results;

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.front_default,
            types: res.data.types, // <-- agora pegamos os tipos do jeito certo
          };
        })
      );

      setAllPokemons(pokemonData);
      setPokemons(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };

  const pokemonFilter = (name) => {
    if (name === '') {
      setPokemons(allPokemons);
      return;
    }

    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase()) // <- CORRIGIDO
    );
    setPokemons(filtered);
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, max-content))',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon} // <-- agora enviamos o objeto inteiro
              />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};
