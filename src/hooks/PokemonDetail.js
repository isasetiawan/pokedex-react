import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Modal, Image, Placeholder } from 'semantic-ui-react';
import { URL_FETCH } from '../const';

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState({})
    const [id, setId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setPokemon({})
    },[isOpen])

    useEffect(()=>{
        setIsOpen(id !== "")
        const query = `
        query {
            pokemon(id: "${id}"){
              name
              weight {
                minimum
                maximum
              }
              height {
                minimum
                maximum
              }
              classification
              types
              resistant
              attacks{
                fast {
                  name
                  type
                  damage
                }
                special {
                  name
                  type
                  damage
                }
              }
              weaknesses
              fleeRate
              maxCP
                maxHP
              evolutionRequirements {
                amount
                name
              }
              image
            }
          }
        `
        if (!id) return
        setIsLoading(true)
        axios.post(URL_FETCH,{query}).then(({data})=>{
            console.log(data)
            setPokemon(data.data.pokemon)
            setIsLoading(false)
        })
    },[id])

    let view = (
        <Modal open={isOpen} onClose={()=>{setIsOpen(false)}}>
            {!isLoading ? 
                <>
                <Modal.Header>{pokemon.name}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size="medium" src={pokemon.image}></Image>
                </Modal.Content>
                </>
            :
                <Placeholder>
                    <Placeholder.Image square ></Placeholder.Image>
                </Placeholder>
            }
        </Modal> 
    )
        

    return {setId, view}

}

export default PokemonDetail