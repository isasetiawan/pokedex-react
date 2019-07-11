import React from 'react'
import { Card, Grid, Image, Statistic, Divider, Header } from 'semantic-ui-react'

const PokemonCard = ({id, image, name, classification, height, weight, maxCP, maxHP, types, setId}) => {
    return (
            <Grid.Column>
            <Card fluid onClick={()=>setId(id)}>
                <Image size="medium" centered height="100px" src={image}></Image>
                <Card.Content>
                    <Card.Header>
                        <Header as="h1">{name}</Header>
                    </Card.Header>
                    <Card.Meta>
                        <span className="date">HP/CP : {maxHP}/{maxCP}</span>
                    </Card.Meta>

                    <Divider></Divider>

                    <Statistic.Group widths={1} size="mini">
                        <Statistic>
                            <Statistic.Label>Type</Statistic.Label>
                            <Statistic.Value>{types.join(', ')}</Statistic.Value>
                        </Statistic>
                    </Statistic.Group>

                    <Divider></Divider>

                    <Statistic.Group widths={2} size="mini">
                        <Statistic>
                            <Statistic.Label>height</Statistic.Label>
                            <Statistic.Value>{height.maximum}</Statistic.Value>
                        </Statistic>
                        <Statistic>
                            <Statistic.Label>weight</Statistic.Label>
                            <Statistic.Value>{weight.maximum}</Statistic.Value>
                        </Statistic>
                    </Statistic.Group>

                </Card.Content>
                <Card.Content extra>
                    <b className="bold">Classification: </b>{classification}
                </Card.Content>
            </Card>
            </Grid.Column>
    )
}

export default PokemonCard