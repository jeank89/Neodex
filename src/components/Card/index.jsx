import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const typeIcons = {
  bug: '/assets/types/bug.png',
  dark: '/assets/types/dark.png',
  dragon: '/assets/types/dragon.png',
  electric: '/assets/types/electric.png',
  fairy: '/assets/types/fairy.png',
  fighting: '/assets/types/fighting.png',
  fire: '/assets/types/fire.png',
  flying: '/assets/types/flying.png',
  ghost: '/assets/types/ghost.png',
  grass: '/assets/types/grass.png',
  ground: '/assets/types/ground.png',
  ice: '/assets/types/ice.png',
  normal: '/assets/types/normal.png',
  poison: '/assets/types/poison.png',
  psychic: '/assets/types/psychic.png',
  rock: '/assets/types/rock.png',
  steel: '/assets/types/steel.png',
  water: '/assets/types/water.png'
};

export const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate(); 

  if (!pokemon) {
    return null;
  }

  const { name, image, types } = pokemon;

  const handleClick = () => {
    navigate(`/profile/${name}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "200px",
        height: "300px",
        backgroundColor: "#8a8888",
        borderRadius: 2,
        margin: "0 auto",
      }}
    >
      {/* o clique tem que ser no CardActionArea */}
      <CardActionArea sx={{ height: "100%" }} onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="center" sx={{ textTransform: 'capitalize' }}>
            {name}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" align="center">
            {types && types.map((typeObj) => (
              <img
                key={typeObj.type.name}
                src={typeIcons[typeObj.type.name]}
                alt={typeObj.type.name}
                style={{ width: '50px', height: '30px', margin: '0 2px' }}
              />
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
