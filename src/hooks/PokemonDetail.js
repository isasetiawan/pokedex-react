import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Modal, Image, Placeholder, Header, StatisticGroup, Statistic } from 'semantic-ui-react';
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
                    <Modal.Description>
                    <StatisticGroup size="tiny">
                            <Statistic>
                                <Statistic.Label>HP</Statistic.Label>
                                <Statistic.Value>{pokemon.maxHP}</Statistic.Value>
                            </Statistic>
                            <Statistic>
                                <Statistic.Label>CP</Statistic.Label>
                                <Statistic.Value>{pokemon.maxCP}</Statistic.Value>
                            </Statistic>
                            <Statistic>
                                <Statistic.Label>Flee Rate</Statistic.Label>
                                <Statistic.Value>{pokemon.fleeRate}</Statistic.Value>
                            </Statistic>
                        </StatisticGroup>
                        <Header>Height</Header>
                        <StatisticGroup size="tiny">
                            <Statistic>
                                <Statistic.Label>Maximum</Statistic.Label>
                                <Statistic.Value>{pokemon.height ? pokemon.height.maximum : ''}</Statistic.Value>
                            </Statistic>
                            <Statistic>
                                <Statistic.Label>Minimum</Statistic.Label>
                                <Statistic.Value>{pokemon.height ? pokemon.height.minimum : ''}</Statistic.Value>
                            </Statistic>
                        </StatisticGroup>

                        <Header>Weight</Header>
                        <StatisticGroup size="tiny">
                            <Statistic>
                                <Statistic.Label>Maximum</Statistic.Label>
                                <Statistic.Value>{pokemon.weight ? pokemon.weight.maximum : ''}</Statistic.Value>
                            </Statistic>
                            <Statistic>
                                <Statistic.Label>Minimum</Statistic.Label>
                                <Statistic.Value>{pokemon.weight ? pokemon.weight.minimum : ''}</Statistic.Value>
                            </Statistic>
                        </StatisticGroup>
                        <Header>Type</Header>
                        <p>{pokemon.types ? pokemon.types.join(', ') :''}</p>
                        <Header>Resistant</Header>
                        <p>{pokemon.resistant ? pokemon.resistant.join(', ') :''}</p>
                        <Header>Special Attacks</Header>
                        <p>{pokemon.attacks ? pokemon.attacks.special.map(x=>x.name+', ') : ''}</p>
                        <Header>Fast Attacks</Header>
                        <p>{pokemon.attacks ? pokemon.attacks.fast.map(x=>x.name+', ') : ''}</p>
                        <Header>Weaknesses</Header>
                        <p>{pokemon.weaknesses ? pokemon.weaknesses.join(', ') :''}</p>
                    </Modal.Description>
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