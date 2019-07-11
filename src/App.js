import React, {useState, useEffect} from 'react';
import './App.css';
import { Grid, Input } from 'semantic-ui-react';
import PokemonCard from './components/PokemonCard';
import PokemonList from './hooks/PokemonList';
import LoadingCard from './components/LoadingCard';
import { NUMBER_OF_ITEM_EACH_PAGE } from './const';
import PokemonDetail from './hooks/PokemonDetail';

function App() {
  let {pokemonList, isLoading} = PokemonList()
  const [search, setSearch] = useState("")
  const [filteredPokemons, setFilteredPokemons] = useState([])

  useEffect(()=>{
    let filtered = pokemonList.filter(pokemon=>pokemon.name.toLocaleLowerCase().includes(search))
    setFilteredPokemons(filtered)
  },[search, pokemonList, filteredPokemons])

  let {setId, view} = PokemonDetail()

  return (
    <>
    <Grid padded centered>
      <Grid.Row>
        <Input focus placeholder="Search..." onChange={(e)=>{setSearch(e.target.value)}}></Input>
      </Grid.Row>
    </Grid>
      <Grid stackable columns={4} padded>
        {filteredPokemons.map(pokemon=>(<PokemonCard key={pokemon.id} {...pokemon} setId={setId} ></PokemonCard>))}
        {isLoading ? new Array(NUMBER_OF_ITEM_EACH_PAGE).fill(0).map((_,i)=><LoadingCard key={i}></LoadingCard>) : ''}
      </Grid>
      {view}
    </>
  );
}

export default App;
