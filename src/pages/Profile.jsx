import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

export const Profile = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    };

    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <Typography align="center" mt={5}>Carregando...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <div
        style={{
          backgroundColor: '#8a8888',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
        }}
      >
        <Typography variant="h4" mb={2} sx={{ textTransform: 'capitalize', color: '#fff' }}>
          {pokemon.name} (#{pokemon.id})
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <img src={pokemon.sprites.front_default} alt="Normal" style={{ width: '120px' }} />
          <img src={pokemon.sprites.front_shiny} alt="Shiny" style={{ width: '120px' }} />
        </div>

        <TableContainer component={Paper} sx={{ backgroundColor: '#d3d3d3' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Tipos</TableCell>
                <TableCell>
                  {pokemon.types.map((type) => type.type.name).join(', ')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Peso</TableCell>
                <TableCell>{pokemon.weight / 10} kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Altura</TableCell>
                <TableCell>{pokemon.height / 10} m</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Experiência base</TableCell>
                <TableCell>{pokemon.base_experience}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Habilidades</TableCell>
                <TableCell>
                  {pokemon.abilities.map((ab) => ab.ability.name).join(', ')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Movimentos</TableCell>
                <TableCell>
                {pokemon.moves.slice(0, 20).map((mv) => mv.move.name).join(', ')} 
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};
