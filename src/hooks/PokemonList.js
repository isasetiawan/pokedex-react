import {useState, useEffect} from 'react'
import axios from 'axios';
import { NUMBER_OF_ITEM_EACH_PAGE, URL_FETCH } from '../const';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const handleScroll = () => {
            if ( !((window.innerHeight + window.scrollY) >= document.body.offsetHeight) || isLoading) {
                return
            };
            setPage(page+1);
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    },[isLoading, page])

    useEffect(()=>{
        setIsLoading(true)
        const query = `
            query {
                pokemons(first:${page * NUMBER_OF_ITEM_EACH_PAGE}){
                    id
                    name
                    image
                    height {
                        maximum
                        minimum
                    }
                    weight {
                        maximum
                        minimum
                    }
                    maxHP
                    maxCP
                    classification
                    types
                }
            }
        `
        axios.post(URL_FETCH,{query}).then(({data})=>{
            setPokemonList(data.data.pokemons)
            setIsLoading(false)
        })
    },[page])

    return {pokemonList, setPage, page, isLoading}

}

export default PokemonList